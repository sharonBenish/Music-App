<script setup lang="ts">
import { useFavoriteStore } from '~/store/favorites';

const favoritesStore = useFavoriteStore()
const {favorites} = toRefs(favoritesStore)
const {getFavorites } = favoritesStore

import { usePlayerStore } from '~/store/player';
import { Track } from '~/types/tracks';

const route = useRoute();
const playerStore = usePlayerStore();
const { isPlaying, currentSongUrl, isPaused } = toRefs(playerStore)
const { playMusic, stopPlaying, pausePlayMusic, addToQueue } = playerStore

// interface AlbumDetails {
//     albumName: string,
//     albumImage: string,
//     artistName: string,
//     releaseDate: string
// }

// const albumDetails: AlbumDetails = {
//     albumName: route.query.albumName as string,
//     albumImage: route.query.albumImage as string,
//     artistName: route.query.artistName as string,
//     releaseDate: route.query.releaseDate as string

// }

//music player logic......................................
function playMusicClicked (music: Track ){
    if (isPlaying  && currentSongUrl.value === music.audio){
        pausePlayMusic()
    }
    playMusic(music)
    addToQueue(favorites.value)
}

onMounted(()=>{
    getFavorites()
})
</script>

<template>
    <div class="back min-h-screen">
        <div class="flex gap-10 my-8 px-6 pt-10 pb-20 gradient">
            <div class="w-[200px] h-[200px] shrink-0">
                <img src="" class="w-full h-full" alt="" />
            </div>
            <div class="text-white">
                <h1 class="text-6xl font-semibold my-4" >Liked Songs</h1>
                <div class="flex items-center">
                    <p>sharon</p>
                    <span class="mx-4">&bull;</span>
                    <p>{{ favorites.length }} {{ favorites.length > 1? 'songs': 'song' }}</p>
                </div>
            </div>
        </div>
        <div class="px-6">
            <TrackList :tracks="favorites"  :includeArtist="false" @play-clicked="playMusicClicked"/>
        </div>
    </div>
</template>

<style scoped>
.back{
    background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.5) 20%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 1) 100%
  );

}
</style>