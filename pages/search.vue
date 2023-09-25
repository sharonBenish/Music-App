<script setup lang="ts">
import { usePlayerStore } from '~/store/player';
import { Track } from '~/types/tracks';
import { useAlbumStore } from '~~/store/albums';
import { useArtistStore } from '~~/store/artists';
import { useTrackStore } from '~~/store/tracks';

const route = useRoute()
const router = useRouter()

const query = computed(()=>{
    return route.query.searchQuery as string
})

//stores...........................................
const trackStore = useTrackStore();
const albumStore = useAlbumStore();
const artistStore = useArtistStore();
const playerStore = usePlayerStore();

const { searchedTracks } = toRefs(trackStore)
const { searchedAlbums } = toRefs(albumStore)
const { searchedArtists } = toRefs(artistStore)
const { isPlaying, currentSongUrl, isPaused } = toRefs(playerStore)
const { playMusic, stopPlaying, pausePlayMusic, addToQueue } = playerStore
const { searchTracks } = trackStore
const { searchAlbums } = albumStore
const { searchArtists } = artistStore

//music player logic......................................
function playMusicClicked (music: Track){
    if (isPlaying  && currentSongUrl.value === music.audio){
        pausePlayMusic()
    }
    playMusic(music)
    addToQueue(searchedTracks.value)
}

//search Logic............................................
const searchQuery = ref('');
const activeSearchTab = ref('Tracks');
function changeSearchTab(tab:'Tracks'| 'Artists'| 'Albums'| 'Playlists'){
    activeSearchTab.value = tab
}

//watchers................................................
watch(query, ()=>{
    if(query.value == ''){
        console.log(route.params)
    }
    searchTracks(query.value)
    searchAlbums(searchQuery.value)
    searchArtists(searchQuery.value)
})
</script>

<template>
    <div class="px-6">
        <div class="flex gap-3 mb-4 text-white">
            <button :class="activeSearchTab==='Tracks'?'bg-e-orange':'bg-e-orange-blur'" class="text-sm px-4 py-1.5 rounded-full hover:bg-e-orange" @click="changeSearchTab('Tracks')">Tracks</button>
            <button :class="activeSearchTab==='Albums'?'bg-e-orange':'bg-e-orange-blur'" class="text-sm px-4 py-1.5 rounded-full hover:bg-e-orange" @click="changeSearchTab('Albums')">Albums</button>
            <button :class="activeSearchTab==='Artists'?'bg-e-orange':'bg-e-orange-blur'" class="text-sm px-4 py-1.5 rounded-full hover:bg-e-orange" @click="changeSearchTab('Artists')">Artists</button>
            <button :class="activeSearchTab==='Playlists'?'bg-e-orange':'bg-e-orange-blur'" class="text-sm px-4 py-1.5 rounded-full hover:bg-e-orange" @click="changeSearchTab('Playlists')">Playlists</button>
        </div>

        <div class="pb-20 text-white">
            <!--Showing tracks that match search query-->
            <div v-if="activeSearchTab === 'Tracks'">
                <TrackList :tracks="searchedTracks" @play-clicked="playMusicClicked" />
            </div>

            <!--Showing albums that match search query-->
            <div v-if="activeSearchTab === 'Albums'">
                <div v-if="searchedAlbums.length > 0" class="flex flex-wrap">
                    <MusicCard v-for="album in searchedAlbums" :index="album.id" :card="album"/>
                </div>
                <div v-else>
                    <div class="w-full flex gap-10 h-80 flex-col items-center justify-center">
                        <Icon name="solar:music-library-bold-duotone" size="8em" class="text-e-grey" />
                        <p class="text-e-orange-blur text-2xl">No result found</p>
                    </div>
                </div>
            </div>

            <!--Showing artists that match search query-->
            <div v-if="activeSearchTab === 'Artists'">
                <div v-if="searchedArtists.length > 0" class="flex flex-wrap">
                    <MusicCard  v-for="artist in searchedArtists" :index="artist.id" :card="artist"/>
                </div>
                <div v-else>
                    <div class="w-full flex gap-10 h-80 flex-col items-center justify-center">
                        <Icon name="solar:music-library-bold-duotone" size="8em" class="text-e-grey" />
                        <p class="text-e-orange-blur text-2xl">No result found</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>