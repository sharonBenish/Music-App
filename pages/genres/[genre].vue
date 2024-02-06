<script setup lang="ts">
import { usePlayerStore } from '~/store/player';
import { useTrackStore } from '~/store/tracks';
import { Track } from '~/types/tracks';

definePageMeta({
  middleware: 'auth'
})

const route = useRoute();

const trackStore = useTrackStore();
const { genreTracks } = toRefs(trackStore);
const { getGenreTracks } = trackStore;

const playerStore = usePlayerStore();
const { isPlaying, currentSongUrl, isPaused } = toRefs(playerStore)
const { playMusic, pausePlayMusic, addToQueue } = playerStore

interface GenreDetails {
    genreName: string
    genreImage: string
}

const genreDetails: GenreDetails = {
    genreName: route.query.genreName as string,
    genreImage: route.query.genreImage as string
}

//music player logic......................................
function playMusicClicked (music: Track ){
    if (isPlaying  && currentSongUrl.value === music.audio){
        pausePlayMusic()
    }
    playMusic(music)
    addToQueue(genreTracks.value)
}

onMounted(()=>{
    getGenreTracks(route.params.genre as string)
})
</script>

<template>
    <div class="px-6">
        <div class="flex gap-10 pt-10 pb-10 md:pb-20">
            <div class="w-[150px] h-[150px] sm:w-[250px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] shrink-0">
                <img :src="`/genres/${genreDetails.genreImage}.jpg`" class="w-full h-full" />
            </div>
            <div class="text-white">
                <h1 v-html="genreDetails.genreName" class="text-2xl sm:text-5xl md:text-6xl font-semibold my-4"></h1>
            </div>
        </div>

        <div>
            <div class="pt-4 pb-24">
                <div>
                    <TrackList :tracks="genreTracks" @play-clicked="playMusicClicked" />
                </div>
                <!-- <div class="flex flex-wrap min-h-[40rem]">
                </div> -->
            </div>
        </div>
    </div>
</template>