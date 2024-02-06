<script setup lang="ts">
import { useFavoriteStore } from '~/store/favorites';
import { usePlayerStore } from '~/store/player';
import { Track } from '~/types/tracks';

const { user } = useFirebaseAuth()

definePageMeta({
  middleware: 'auth'
})

const favoritesStore = useFavoriteStore()
const {favorites} = toRefs(favoritesStore)
const {getFavorites } = favoritesStore


const route = useRoute();
const playerStore = usePlayerStore();
const { isPlaying, currentSongUrl, isPaused } = toRefs(playerStore)
const { playMusic, stopPlaying, pausePlayMusic, addToQueue } = playerStore

//music player logic......................................
function playMusicClicked (music: Track ){
    if (isPlaying  && currentSongUrl.value === music.audio){
        pausePlayMusic()
    }
    playMusic(music)
    addToQueue(favorites.value)
}

onMounted(()=>{
    watchEffect(()=>{
        if (user.value){
            console.log('hii')
            getFavorites()
        }
    })
    
})
</script>

<template>
    <div class="min-h-screen px-6">
        <div class="flex gap-6 sm:gap-10 pt-10 pb-10 sm:pb-20 gradient">
            <div class="h-[150px] w-[150px] sm:w-[200px] sm:h-[200px] shrink-0">
                <img src="" class="w-full h-full" alt="" />
            </div>
            <div class="text-white">
                <h1 class="text-2xl sm:text-4xl md:text-6xl font-semibold my-4" >Liked Songs</h1>
                <div class="flex gap-2 items-center">
                    <Icon name="basil:music-solid" class="text-base sm:text-lg"/>
                    <p>{{ favorites.length }} {{ favorites.length > 1? 'songs': 'song' }}</p>
                </div>
            </div>
        </div>
        <div>
            <TrackList :tracks="favorites"  :includeArtist="false" @play-clicked="playMusicClicked"/>
        </div>
    </div>
</template>

<style scoped>

</style>