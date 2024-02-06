<script setup lang="ts">
import { usePlayerStore } from '~/store/player';
import { useFavoriteStore } from '~/store/favorites';
import { usePlaylistStore } from '~~/store/playlist';
import { Playlist, Track } from '~/types/tracks';

const route = useRoute()
const { toast, showToast } = useToast()

const playlistStore = usePlaylistStore()
const { delSong, playlist:getPlaylist, showPlaylistModal, hidePlaylistModal  } = playlistStore
const { playlists, playlistModalVisible } = toRefs(playlistStore);

const { track, index, includeArtist, isPlaylist = false } = defineProps<{
    track: Track,
    index: number,
    includeArtist: boolean,
    isPlaylist?: boolean
}>()

const emits = defineEmits(['trackClicked', 'favoriteClicked', 'playlistClicked'])

const playerStore = usePlayerStore()
const { currentSongUrl, isPaused, songQueue } = toRefs(playerStore)

const favoriteStore = useFavoriteStore()
const { favorites } = toRefs(favoriteStore)
const { getFavorites } = favoriteStore

// const playlistVisible = ref(false)
// function showPlaylists (){
//     playlistVisible.value = !playlistVisible.value
// }

async function deleteSong(){
    try{
        const res = await delSong(route.params.playlistId as string, track)
        if (res){
            showToast('Song deleted from playlist', 'success')
        }
    }
    catch(error){
        showToast('Failed to delete song from playlist', 'error')
    }
}

function openPlaylistModal(event:any){
    // console.log(event.clientX, event.clientY)
    const mouse = {
        x: window.innerWidth < 786? event.clientX + 250 : event.clientX,
        y: event.clientY
    }
    showPlaylistModal(mouse)
    emits('playlistClicked', track)
}

onMounted(()=>{
    getFavorites()
})
</script>

<template>
    <td @click="emits('trackClicked', track)" class="row pl-4 rounded-l-md">
        <div class="play-icon hidden" :class="currentSongUrl == track.audio && !isPaused? 'playing':'not-playing'">
            <Icon name="heroicons:play-20-solid" class="text-xl sm:text-2xl"/>
        </div>
        <div :class="currentSongUrl == track.audio && !isPaused? 'playing-index':'not-playing-index'">
            <div v-if="track.audio && currentSongUrl == track.audio && !isPaused">
                <Icon name="svg-spinners:bars-scale-middle" class="text-e-orange text-xl sm:text-2xl"/>
            </div>
            <span v-else>{{ index + 1 }}</span>
        </div>
    </td>
    <td class="flex justify-between items-center h-12 pr-4 track">
        <p v-html="track.name" class="whitespace-nowrap max-w-[180px] xs:max-w-[300px] sm:whitespace-normal overflow-hidden text-ellipsis"></p>
        <div @click="emits('favoriteClicked', track)">
            <Icon name="ri:heart-fill" size="1.15em" class=" like-btn" :class="favorites.some(fav => track.id === fav.id)? 'text-e-orange':'text-e-grey hover:text-white'"/> 
        </div>
    </td>
    <td v-if="includeArtist">{{ track.artist_name }}</td>
    <td class="hidden sm:table-cell">{{ convertToMinuteDuration(track.duration) }}</td>
    <td class="pr-4 rounded-r-md pl-3">
        <div class="flex gap-4 justify-end">
            <a :href="track.audiodownload">
                <Icon name="material-symbols:download-for-offline-rounded" class="hover:text-e-orange text-xl sm:text-2xl" />
            </a>
            <div v-if="!isPlaylist">
                <Icon @click="openPlaylistModal" name="ic:sharp-playlist-add" class="hover:text-e-orange text-xl sm:text-2xl" />
                <!-- <div class="absolute top-0 left-[15rem]" v-if="playlistModalVisible">
                    <PlaylistOptions :track="track"/>
                </div> -->
            </div>
            
            <div v-else @click="deleteSong()">
                <Icon name="material-symbols:delete-forever" class="hover:text-e-orange" size="1.6em" />
            </div>
        </div>
    </td>
</template>

<style scoped>
.row:hover .not-playing-index{
        display: none;
    }
.row:hover .not-playing{
    display:block
}
.track:hover .like-btn{
    display: block;
}

.like-btn{
    display: none;
}
td{
    vertical-align:baseline;
}
</style>