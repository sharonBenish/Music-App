<template>
    <div class="pb-32 px-2 md:px-6 mt-8 w-full py-6">
        <div class="justify-items-center grid grid-cols-2 gap-y-8 xl:gap-y-10 xs:grid-cols-3 md:grid-cols-3 xl:grid-cols-4">
            <GenreCard v-for="genre in genres" :genre="genre" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Genre } from '~~/types/tracks';

definePageMeta({
  middleware: 'auth'
})

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