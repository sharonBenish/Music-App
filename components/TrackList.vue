<script lang="ts" setup>
import { Track } from '~/types/tracks';
import { usePlayerStore } from '~/store/player';
import { usePlaylistStore } from '~~/store/playlist';
import { useFavoriteStore } from '~/store/favorites';
const { toast, showToast } = useToast()

const favoriteStore = useFavoriteStore()
const { favorites } = toRefs(favoriteStore)
const { addToFavorites, deleteFavorite } = favoriteStore

const playlistStore = usePlaylistStore()
const { delSong, playlist:getPlaylist, showPlaylistModal, hidePlaylistModal  } = playlistStore
const { playlists, playlistModalVisible } = toRefs(playlistStore);

const { tracks, includeArtist = true, isPlaylist=false } = defineProps<{
    tracks:Track[],
    includeArtist?: boolean,
    isPlaylist?: boolean
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
const song = ref<Track|null>()
function setPlaylistModal(track: Track){
    song.value = track
}
</script>

<template>
    <div>
        <table v-if="tracks.length > 0" class="text-white w-full text-left overflow-scroll mb-32">
            <thead class="text-e-orange">
                <th class="w-16 h-12 pl-4">#</th>
                <th class="w-[60%]">Title</th>
                <th v-if="includeArtist">Artist</th>
                <th class="hidden sm:table-cell">Time</th>
                <th class="w-28"></th>
            </thead>
            <tbody>
                <tr v-for="(track, index) in tracks" class="h-12 hover:bg-e-grey/20 hover:cursor-pointer text-sm max-w-[100px] w-[100px]">
                    <TrackListRow :isPlaylist="isPlaylist" :track="track" :index="index" :includeArtist="includeArtist"  @track-clicked="handleClick" @favorite-clicked="addSongToFavorite"
                    @playlist-clicked="setPlaylistModal"
                    />

                    <!-- <div class="absolute top-0 left-[15rem]" v-if="playlistModalVisible">
                        <PlaylistOptions :track="track"/>
                    </div> -->
                </tr>
                <div class="absolute top-0 left-0 md:left-[15rem]" v-if="playlistModalVisible">
                    <PlaylistOptions :track="song!"/>
                </div>
            </tbody>
        </table>
    </div>
</template>

