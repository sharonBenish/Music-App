<script setup lang="ts">
import { useArtistStore } from '~/store/artists';
import { usePlayerStore } from '~/store/player';
import { Track } from '~/types/tracks';

definePageMeta({
  middleware: 'auth'
})

const route = useRoute();

const artistStore = useArtistStore();
const { artistTracks, artistAlbums } = toRefs(artistStore)
const { getArtistTracks, getArtistAlbums } = artistStore

const playerStore = usePlayerStore();
const { isPlaying, currentSongUrl, isPaused } = toRefs(playerStore)
const { playMusic, pausePlayMusic, addToQueue } = playerStore

interface ArtistDetails {
    artistName: string
    joindate: string
    website: string
    artistImage: string
}

const artistDetails: ArtistDetails = {
    artistName: route.query.artistName as string,
    artistImage: route.query.artistImage as string,
    joindate: route.query.joindate as string,
    website: route.query.website as string
}

const activeTab = ref<'Tracks' | 'Albums'>('Tracks')

function setTab (tabName:string){
    if (tabName === 'Tracks'){
        activeTab.value = 'Tracks'
    }else{
        activeTab.value = 'Albums'
        console.log(activeTab.value)
    }
}

//music player logic......................................
function playMusicClicked (music: Track ){
    if (isPlaying  && currentSongUrl.value === music.audio){
        pausePlayMusic()
    }
    playMusic(music)
    addToQueue(artistTracks.value)
}

onMounted(()=>{
    getArtistTracks(route.params.artistId as string)
    getArtistAlbums(route.params.artistId as string)
})
</script>

<template>
    <div class="px-6 ">
        <div class="flex gap-6 sm:gap-10 pt-10 pb-10 sm:pb-20">
            <div class="h-[150px] w-[150px] sm:w-[200px] sm:h-[200px] shrink-0 ">
                <img :src="artistDetails.artistImage" class="w-full h-full" />
            </div>
            <div class="text-white">
                <h1 v-html="artistDetails.artistName" class="text-2xl sm:text-4xl md:text-6xl font-semibold my-4"></h1>
                <div v-if="artistDetails.website"><span class="text-e-orange">Website: </span><a>{{ artistDetails.website }}</a></div>
                <div><span class="text-e-orange">Join date: </span>{{ artistDetails.joindate }}</div>
            </div>
        </div>

        <div>
            <div class="flex gap-10 text-2xl">
                <p class="underline-offset-8 hover:cursor-pointer" @click="setTab('Tracks')" :class="activeTab ==='Tracks'? 'underline text-e-orange': 'text-white'">Tracks</p>
                <p class="underline-offset-8 hover:cursor-pointer" @click="setTab('Albums')" :class="activeTab ==='Albums'? 'underline text-e-orange': 'text-white'">Albums</p>
            </div>

            <div class="pt-4 pb-24">
                <div v-if="activeTab === 'Tracks'">
                    <TrackList :tracks="artistTracks" :include-artist="false" @play-clicked="playMusicClicked" />
                </div>
                <div v-else class="grid gap-y-8 xl:gap-y-10 justify-items-center grid-cols-2 xs:grid-cols-3 xl:grid-cols-4">
                    <MusicCard v-if="artistAlbums.length > 0"  v-for="album in artistAlbums" :index="album.id" :card="album"/>
                    <Icon v-else name="svg-spinners:3-dots-bounce" size="3em" class="text-e-orange justify-self-center w-full" />
                </div>
            </div>
        </div>
    </div>
</template>