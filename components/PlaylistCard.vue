<script setup lang="ts">
import { Playlist } from '~/types/tracks';

const { playlist } = defineProps<{
    playlist: Playlist
}>()

const emits = defineEmits(['dropDownClicked', 'deleteClicked' ])

const dropdown = ref(false)

function toggleDropDown(){
    dropdown.value = !dropdown.value
}

function openDeleteModal(){
    dropdown.value = false
    emits('deleteClicked', playlist.name)
}

function goToPlaylist(){
    navigateTo({
        path:`/playlists/${playlist.name}`
    })
}
</script>

<template>
    <div class="relative">
        <div class="h-36 w-36 sm:h-44 sm:w-[200px] md:h-36 md:w-40 lg:h-48 lg:w-[200px] bg-slate-800 rounded-md shadow-white hover:cursor-pointer" @click="goToPlaylist"></div>
        
        <div class="flex justify-between items-center px-1 py-2">
            <p class="text-white">{{ playlist.name }}</p>
            <div class="flex items-center gap-2 text-white text-sm">
                <Icon name="solar:music-library-2-bold" size="1em"/>
                <span>{{ playlist.songs? playlist.songs.length : 0}} songs</span>
            </div>
        </div> 

        <!--Drop Down-->
        <div class="absolute right-2 top-2 z-30 hover:cursor-pointer">
            <Icon name="solar:menu-dots-bold" class="rotate-90 text-white" @click="toggleDropDown" />
            <div v-show="dropdown" class="absolute top-8 bg-gray-700 rounded-sm text-white text-sm">
                <div class="flex gap-2 px-2 py-1.5" @click="openDeleteModal">
                    <Icon name="material-symbols:delete-forever" size="1.2em" />
                    <p>Delete</p>
                </div>
            </div>
        </div>
    </div>
</template>