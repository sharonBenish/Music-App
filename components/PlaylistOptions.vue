<script setup lang="ts">
const showInput = ref(false);
const newPlaylist = ref('');
function createPlaylist (){
    console.log("create")
    showInput.value = true
}
function cancel(){
    showInput.value = false;
    newPlaylist.value = ''
}
</script>

<template>
    <div class="popup">
        <div>
            <div>
                <!-- <p v-if="!showInput" @click="createPlaylist">Create New Playlist</p> -->
                <div v-if="!showInput" class="flex items-center gap-2 p-4 hover:bg-stone-700 rounded-sm font-bold text-[11px]">
                    <Icon name="material-symbols:add-circle-rounded" size="1.3em" class="hover:cursor-pointer text-e-orange" />
                    <div @click="createPlaylist">Create New Playlist</div>
                </div>
            </div>
            
            <p v-if="!showInput" v-for="n of 3">Playlist {{ n }}</p>
            <div v-else class="flex flex-col">
                <label class="p-4 block">New Playlist</label>
                <input v-model="newPlaylist" />
                <div class="flex justify-end w-[90%] m-auto py-4 gap-4">
                    <button class="bg-stone-700 px-1.5 py-1 rounded-lg text-[11px]" @click="cancel">Cancel</button>
                    <button class="bg-e-orange px-1.5 py-1 rounded-lg text-[11px]">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.popup{
    @apply bg-e-blackLight rounded-md text-white w-[250px]
}
p{
    @apply p-4 hover:bg-stone-700 rounded-sm font-bold text-[11px];
}
input {
    @apply outline-0 border-0 p-2 w-[90%] m-auto rounded-md text-e-orange;
}
</style>