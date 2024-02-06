<template>
    <div class="pb-32 px-2 md:px-6 mt-8 relative min-h-[80vh]">
        <div class="flex justify-between items-start">
            <div class="cursor-pointer text-white gap-8 ml-4 mb-6 font-semibold">
                <h2 class="text-2xl sm:text-3xl font-semibold">Playlists</h2>
                <p class="text-sm font-light">Create your own playlists to fit your vibe</p>
            </div>

            <button @click="openCreateModal" class="text-white bg-e-orange p-2 rounded">Create</button>
        </div>
        

        <div class="grid gap-y-8 xl:gap-y-10 justify-items-center grid-cols-2 xs:grid-cols-3 xl:grid-cols-4 ">
            <div v-for="playlist of playlists" class="relative">
                <PlaylistCard :playlist="playlist" @delete-clicked="openDeleteModal" />
            </div>
        </div>

        <!--Delete Modal-->
        <div v-if="deleteModal" class="bg-e-sidebar-bg p-8 w-[40%] absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 text-e-grey">
            <div class="flex items-center gap-2 mb-2">
                <Icon name="ph:warning-circle-fill" size="1.2em" class="text-red-400"/>
                <h2 class="text-lg text-gray-300">Are you sure you want to delete?</h2>
            </div>
            <p class="text-sm">All songs will be deleted with the playlist</p>

            <div class="mt-4 flex gap-4 justify-end">
                <button class="hover:bg-e-blackLight rounded px-2.5 py-1" @click="closeDeleteModal">Cancel</button>
                <button class="rounded bg-red-400 hover:bg-red-300 text-white px-2.5 py-1" @click="deletePlaylist">Delete</button>
            </div>
        </div>
    </div>
    <div v-if="createPlaylistModal" class="h-screen w-screen overlay-width absolute top-0 flex items-center justify-center z-[5000]">
        <div class="px-8 py-6 rounded-md bg-e-sidebar-bg">
            <p class="text-e-orange">Enter Playlist Name</p>
            <input v-model="newPlaylist" type="text" class="outline-0 border-0 rounded py-2 px-3 my-4">
            <div class="text-white flex gap-4 justify-end my-2">
                <button class="bg-white/10 px-2 py-1 rounded" @click="closeCreateModal">Cancel</button>
                <button class="px-2 py-1 bg-e-orange rounded" @click="createPlaylist">Create</button>

            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePlaylistStore } from '~~/store/playlist';

definePageMeta({
  middleware: 'auth'
})

const { user } = useFirebaseAuth()

const { toast, showToast } = useToast()
const playlistStore = usePlaylistStore()
const { createNewPlaylist, delPlaylist, getPlaylists } = playlistStore
const { playlists } = toRefs(playlistStore);

const deleteModal = ref(false)
const selectedPlaylist = ref('')

const createPlaylistModal = ref(false)
const newPlaylist = ref('')

function openCreateModal(){
    createPlaylistModal.value = true
}

function closeCreateModal(){
    newPlaylist.value = ''
    createPlaylistModal.value = false
}

async function createPlaylist(){
    await createNewPlaylist(newPlaylist.value)
    closeCreateModal()
}

//Functions.................
function openDeleteModal(playlist:string){
    selectedPlaylist.value = playlist
    deleteModal.value = true
}

function closeDeleteModal(){
    selectedPlaylist.value = ''
    deleteModal.value = false
}

async function deletePlaylist(){
    deleteModal.value = false
    try{
        const res = await delPlaylist(selectedPlaylist.value)

        if (res){
            showToast('Playlist successfully deleted', 'success')
        }
    }
    catch(error){
        showToast('Falied to delete playlist', 'error')
    }
}

onMounted(()=>{
    watchEffect(()=>{
        if (user.value){
            getPlaylists()
        }
    })
    
})
</script>

<style scoped>
@media (min-width: 768px){
    .overlay-width{
        width: calc(100vw - 15rem)
    }
}
</style>