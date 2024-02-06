<template>
    <div class="pb-32 px-2 md:px-6 mt-8 relative min-h-[80vh]">
        <div class="cursor-pointer text-white gap-8 ml-4 mb-6 font-semibold">
            <h2 class="text-3xl font-semibold">Albums</h2>
            <p class="text-sm font-light">Musi has a list of amazing albums for you to listen to</p>
        </div>
        <div v-if="albums.length > 0" class="grid gap-y-8 xl:gap-y-10 justify-items-center grid-cols-2 xs:grid-cols-3 xl:grid-cols-4">
            <MusicCard class=""  v-for="album in albums" :index="album.id" :card="album"/> 
        </div>
        <div v-else class="w-full flex justify-center">
            <Icon name="svg-spinners:3-dots-bounce" size="3em" class="text-e-orange" />
        </div>
        <div class="absolute right-4 bottom-24" >
            <Pagination :n="10" @page-change="handlePagination" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAlbumStore } from '~~/store/albums';

definePageMeta({
  middleware: 'auth'
})

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