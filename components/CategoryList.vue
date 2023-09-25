<template>
    <div class="pt-4 pl-4 mb-4">
        <h2 class="text-white font-semibold text-2xl mb-3" v-if="category.length > 0">{{ title }}</h2>
        <div class="text-red-400 flex gap-1 overflow-scroll scrollbar-hide">
            <MusicCard :card="item" v-for="item in category" @song-clicked="queueSongs" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '~/store/player';
import { Track, Album, Artist } from '~~/types/tracks';

const {title, category} = defineProps<{
    title: string
    category: Album[] | Artist[] | Track[]
}>()

const playerStore = usePlayerStore();
const { addToQueue } = playerStore

function queueSongs(){
    const song = category[0];
    if ('audio' in song){
        addToQueue(category as Track[])
    }
}
</script>

<style scoped>
/* For Webkit-based browsers (Chrome, Safari and Opera) */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>