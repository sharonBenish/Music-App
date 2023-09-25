<template>
    <div class="pb-32 ml-6 mt-8 relative min-h-[80vh]">
        <div class="cursor-pointer text-white gap-8 ml-4 mb-6 font-semibold">
            <h2 class="text-3xl font-semibold">Albums</h2>
            <p class="text-sm font-light">Musi has a list of amazing albums for you to listen to</p>
        </div>
        <div class="flex flex-wrap">
            <MusicCard v-if="albums.length > 0" v-for="album in albums" :index="album.id" :card="album"/>
            <Icon v-else name="svg-spinners:3-dots-bounce" size="3em" class="text-e-orange justify-self-center w-full" />
        </div>
        <div class="absolute right-4 bottom-24" >
            <Pagination :n="10" @page-change="handlePagination" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAlbumStore } from '~~/store/albums';

const albumStore = useAlbumStore()
const { getTopAlbums, clearTopAlbums, goToPage } = albumStore;
const { topAlbums:albums } = toRefs(albumStore);

//Functions.................
function handlePagination(currentPage:number, page:number){
    clearTopAlbums()
    goToPage(page)
    
    getTopAlbums(20)
}

onMounted(()=>{
    clearTopAlbums()
    getTopAlbums(20);
})
</script>

<style scoped>
</style>