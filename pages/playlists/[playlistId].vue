<script setup lang="ts">
import { useAlbumStore } from '~/store/albums';
import { usePlayerStore } from '~/store/player';
import { usePlaylistStore } from '~~/store/playlist';
import { Playlist, Track } from '~/types/tracks';

definePageMeta({
  middleware: 'auth'
})

const { user } = useFirebaseAuth()

const route = useRoute();
const playerStore = usePlayerStore();
const { isPlaying, currentSongUrl, isPaused } = toRefs(playerStore)
const { playMusic, stopPlaying, pausePlayMusic, addToQueue } = playerStore

const { toast, showToast } = useToast()
const playlistStore = usePlaylistStore()
const { addToExistingPlaylist, addToNewPlaylist, getPlaylists, delPlaylist, delSong, playlist:getPlaylist } = playlistStore
const { playlists } = toRefs(playlistStore);

const playlist = computed(()=>{
    const playlistName = route.params.playlistId as string
    // return playlists.value.find((playlist)=> {
    //     playlist.name === playlistName
    // })
    return playlists.value.find((playlist)=> playlist.name == playlistName)
})

//music player logic......................................
function playMusicClicked (music: Track ){
    if (isPlaying  && currentSongUrl.value === music.audio){
        pausePlayMusic()
    }
    playMusic(music)
    // addToQueue(albumTracks.value)
}

onMounted(()=>{
    watchEffect(()=>{
        if (user.value){
            getPlaylists()
        }
    })
    
})
onBeforeRouteLeave(()=>{
    
})
</script>

<template>
    <div class="min-h-screen overflow-hidden px-6">
        <div class="flex gap-6 sm:gap-10 pt-10 pb-10 sm:pb-20">
            <div class="h-[150px] w-[150px] sm:w-[200px] sm:h-[200px] shrink-0 bg-white">
                <!-- <img :src="albumDetails.albumImage" class="w-full h-full" alt="" /> -->
            </div>
            <div class="text-white">
                <p>Playlist</p>
                <h1 class="text-2xl sm:text-4xl md:text-6xl font-semibold my-4" v-html="playlist?.name"></h1>
                <div class="flex gap-2 items-center">
                   <Icon name="basil:music-solid" class="text-base sm:text-lg"/>
                    <p>{{ playlist?.songs? playlist?.songs?.length : 0 }} songs</p>
                </div>
            </div>
        </div>
        <div>
            <TrackList v-if="playlist?.songs ? playlist.songs.length > 0: false" :isPlaylist="true" :tracks="(playlist?.songs as Track[])"  :includeArtist="false" @play-clicked="playMusicClicked"/>
            <div v-else class="text-3xl text-center text-white">No songs</div>
        </div>
    </div>
</template>