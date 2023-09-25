<template>
    <div class="pb-32 ml-6 mt-8 relative min-h-[80vh]">
        <div class="cursor-pointer text-white gap-8 ml-4 mb-6 font-semibold">
            <h2 class="text-3xl font-semibold">Artists</h2>
            <p class="text-sm font-light">Musi has a list of amazing artists for you to listen to</p>
        </div>
        <div class="flex flex-wrap min-h-[40rem]">
            <MusicCard v-if="topArtists.length > 0" v-for="artist in topArtists" :index="artist.id" :card="artist"/>
            <Icon v-else name="svg-spinners:3-dots-bounce" size="3em" class="text-e-orange justify-self-center w-full" />
        </div>
        <div class="absolute right-4 bottom-24">
            <Pagination :n="10" @page-change="handlePagination" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useArtistStore } from '~~/store/artists';
import { Artist } from '~~/types/tracks';

const artistStore = useArtistStore()
const { getTopArtists, clearTopArtist, goToPage } = artistStore;
const { topArtists } = toRefs(artistStore);


//Functions.................
function handlePagination(currentPage:number, page:number){
    // if (page > currentPage){
    //     goToNextPage()
    // }
    // else {
    //     goToPrevPage()
    // }

    clearTopArtist()
    goToPage(page);
    getTopArtists(20)
}

onMounted(()=>{
    clearTopArtist()
    getTopArtists(20)
})
</script>

<style scoped>

</style>