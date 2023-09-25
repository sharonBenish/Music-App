<template>
    <div class="px-6 pb-28 w-full py-6">
        <div class="flex flex-wrap gap-x-8 gap-y-10">
            <GenreCard v-for="genre in genres" :genre="genre" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Genre } from '~~/types/tracks';
const genres: Genre[] = [
    {
        name: 'Hip Hop',
        image: 'hiphop'
    },
    {
        name: 'R & B',
        image: 'rnb'
    },
    {
        name: 'Afrobeats',
        image: 'afrobeat'
    },
    {
        name: 'Rock',
        image: 'rock'
    },
    {
        name: 'Jazz',
        image: 'jazz'
    },
    {
        name: 'Indie',
        image: 'indie'
    },
    {
        name: 'Funk',
        image: 'funk'
    },
    {
        name: 'Country',
        image: 'country'
    },
]
</script>