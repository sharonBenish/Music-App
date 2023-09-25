<script setup lang="ts">
import { useAlbumStore } from '~/store/albums';
import { usePlayerStore } from '~/store/player';
import { Track } from '~/types/tracks';

const route = useRoute();
const playerStore = usePlayerStore();
const { isPlaying, currentSongUrl, isPaused } = toRefs(playerStore)
const { playMusic, stopPlaying, pausePlayMusic, addToQueue } = playerStore

interface AlbumDetails {
    albumName: string,
    albumImage: string,
    artistName: string,
    releaseDate: string
}

const albumDetails: AlbumDetails = {
    albumName: route.query.albumName as string,
    albumImage: route.query.albumImage as string,
    artistName: route.query.artistName as string,
    releaseDate: route.query.releaseDate as string

}
const albumStore = useAlbumStore();
const { albumTracks } = toRefs(albumStore);
const { getAlbumTracks, clearAlbumTracks } = albumStore;

//music player logic......................................
function playMusicClicked (music: Track ){
    if (isPlaying  && currentSongUrl.value === music.audio){
        pausePlayMusic()
    }
    playMusic(music)
    addToQueue(albumTracks.value)
}

onMounted(()=>{
    getAlbumTracks(route.params.albumId as string)
})
onBeforeRouteLeave(()=>{
    clearAlbumTracks()
})
</script>

<template>
    <div class="back min-h-screen">
        <div class="flex gap-10 my-8 px-6 pt-10 pb-20 gradient">
            <div class="w-[200px] h-[200px] shrink-0">
                <img :src="albumDetails.albumImage" class="w-full h-full" alt="" />
            </div>
            <div class="text-white">
                <p>Album</p>
                <h1 class="text-6xl font-semibold my-4" v-html="albumDetails.albumName"></h1>
                <div class="flex items-center">
                    <p v-html="albumDetails.artistName"></p>
                    <span class="mx-4">&bull;</span>
                    <p>{{ albumDetails.releaseDate.split('-')[0] }}</p>
                    <span class="mx-4">&bull;</span>
                    <p>{{ albumTracks.length }} {{ albumTracks.length > 1? 'songs': 'song' }}</p>
                </div>
            </div>
        </div>
        <div class="px-6">
            <TrackList :tracks="albumTracks"  :includeArtist="false" @play-clicked="playMusicClicked"/>
        </div>
    </div>
</template>

<style>
.back{
    /* background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)); */

    background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.5) 20%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 1) 100%
  );
}
</style>