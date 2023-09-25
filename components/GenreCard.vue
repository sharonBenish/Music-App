<template>
    <div @click="goToGenre">
        <div class="card hover:cursor-pointer relative">
            <p class="absolute top-5 left-5 text-white font-bold z-10">{{ genre.name }}</p>
            <img :src="`/genres/${genre.image}.jpg`" alt="picture" class="h-[13rem] w-[13rem] rounded-md drop-shadow-light object-cover" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Genre } from '~~/types/tracks';

const { genre }= defineProps<{
    genre: Genre
}>()

function goToGenre(){
    navigateTo({
        path:`/genres/${genre.image}`,
        query:{
            genreName: genre.name,
            genreImage: genre.image
        }
    })
}
</script>

<style>
</style>