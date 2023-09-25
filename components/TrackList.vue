<script lang="ts" setup>
import { Track } from '~/types/tracks';
import { usePlayerStore } from '~/store/player';
import { useFavoriteStore } from '~/store/favorites';
const { toast, showToast } = useToast()

const favoriteStore = useFavoriteStore()
const { favorites } = toRefs(favoriteStore)
const { addToFavorites, deleteFavorite } = favoriteStore

const { tracks, includeArtist= true } = defineProps<{
    tracks:Track[],
    includeArtist?: boolean
}>()

const emit = defineEmits(['play-clicked'])

const playerStore = usePlayerStore()
const { currentSongUrl, isPaused, songQueue } = toRefs(playerStore)
const { addToQueue } = playerStore

let selectedTrack = ref('')

function handleClick (track: Track){
    emit('play-clicked', track);
    selectedTrack.value = track.name;
}

//Favorite Logic
async function addSongToFavorite (song: Track){
    const isFavorite = favorites.value.some((fav) => fav.id === song.id);
    if (isFavorite){
        const fav = favorites.value.find((el)=> el.id === song.id )
        try{
            const deleted = await deleteFavorite(fav?.docId!);
            if (deleted){
                showToast('Song Removed From Favorites', 'success')
            }
        }
        catch(error){
            showToast('Failed To Delete From Favorites', 'error')
       }
    }
    else {
        try{
            const added = await addToFavorites(song);
            if (added){
                showToast('Song Added To Favorites', 'success')
            }
        }
        catch(error){
            showToast('Failed To Add To Favorites', 'error')
        }
    }
}

//Playlists Logic
const playlistVisible = ref(false)
function showPlaylists (){
    playlistVisible.value = !playlistVisible.value
}
</script>

<template>
    <div>
        <table v-if="tracks.length > 0" class="text-white w-full text-left overflow-scroll">
            <thead>
                <th class="w-16 h-12">#</th>
                <th class="w-[60%]">Title</th>
                <th v-if="includeArtist">Artist</th>
                <th>Time</th>
                <th class="w-28"></th>
            </thead>
            <tbody>
                <tr v-for="(track, index) in tracks" class="h-12 hover:bg-e-grey/20 hover:cursor-pointer text-sm">
                    <td @click="handleClick(track)">
                        <div class="play-icon hidden" :class="currentSongUrl == track.audio && !isPaused? 'playing':'not-playing'">
                            <Icon name="heroicons:play-20-solid" size="1.5em"/>
                        </div>
                        <div :class="currentSongUrl == track.audio && !isPaused? 'playing-index':'not-playing-index'">
                            <div v-if="track.audio && currentSongUrl == track.audio && !isPaused">
                                <Icon name="svg-spinners:bars-scale-middle" class="text-e-orange" size="1.8em"/>
                            </div>
                            <span v-else>{{ index + 1 }}</span>
                        </div>
                    </td>
                    <td class="flex justify-between items-center h-12 pr-4 track">
                        <p v-html="track.name"></p>
                        <div @click="addSongToFavorite(track)">
                            <Icon name="ri:heart-fill" size="1.15em" class=" like-btn" :class="favorites.some(fav => track.id === fav.id)? 'text-e-orange':'text-e-grey hover:text-white'"/> 
                        </div>
                    </td>
                    <td v-if="includeArtist">{{ track.artist_name }}</td>
                    <td>{{ convertToMinuteDuration(track.duration) }}</td>
                    <td>
                        <div class="flex gap-4 justify-end pr-3">
                            <a :href="track.audiodownload">
                                <Icon name="material-symbols:download-for-offline-rounded" size="1.8em" class="hover:text-e-orange" />
                            </a>
                            <div class="relative">
                                <Icon @click="showPlaylists" name="ic:sharp-playlist-add" class="hover:text-e-orange" size="1.8em" />
                                <div class="absolute bottom-[120%] right-0" v-if="playlistVisible">
                                    <PlaylistOptions />
                                </div>
                            </div>
                            
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- <div v-if="tracks && tracks.length == 0">
            <div class="w-full flex gap-10 h-80 flex-col items-center justify-center">
                <Icon name="solar:music-library-bold-duotone" size="8em" class="text-e-grey" />
                <p class="text-e-orange-blur text-2xl">No result found</p>
            </div>
        </div> -->
    </div>
</template>

<style scoped>
tr:hover .not-playing-index{
        display: none;
    }
tr:hover .not-playing{
    display:block
}
.track:hover .like-btn{
    display: block;
}

.like-btn{
    display: none;
}
</style>