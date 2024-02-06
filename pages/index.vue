<template>
    <div class="pb-28">
        <CategoryList title="Trending Tracks" :category="topTracks" v-if="topTracks.length > 0"/>
        <CategoryList title="Trending Albums" :category="topAlbums" v-if="topAlbums.length > 0"/>
        <CategoryList title="Trending Artists" :category="topArtists" v-if="topArtists.length > 0" />
    </div>
</template>

<script setup lang="ts">
import { useAlbumStore } from '~~/store/albums';
import { useTrackStore } from '~~/store/tracks';
import { useArtistStore } from '~~/store/artists';

definePageMeta({
  middleware: 'auth'
})

const trackStore = useTrackStore()
const albumStore = useAlbumStore()
const artistStore = useArtistStore()
const { topTracks } = toRefs(trackStore)
const { topAlbums } = toRefs(albumStore)
const { topArtists } = toRefs(artistStore)

// trackStore.getTopTracks()
// albumStore.getTopAlbums()
// artistStore.getTopArtists()

onMounted(()=>{
    nextTick( async()=>{
        await trackStore.getTopTracks()
        await albumStore.getTopAlbums()
        await artistStore.getTopArtists()
    })
})
</script>

<style scoped>

</style>