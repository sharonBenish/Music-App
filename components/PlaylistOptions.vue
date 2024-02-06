<script setup lang="ts">
import { Track } from '~/types/tracks';
import { useFavoriteStore } from '~/store/favorites';
import { usePlaylistStore } from '~/store/playlist';
const { toast, showToast } = useToast()

const favoriteStore = useFavoriteStore()
const { favorites } = toRefs(favoriteStore)
const { addToFavorites, deleteFavorite } = favoriteStore

const playlistStore = usePlaylistStore()
const { playlists, mouse } = toRefs(playlistStore)
const { addToNewPlaylist, getPlaylists, addToExistingPlaylist, hidePlaylistModal } = playlistStore

const { track } = defineProps<{
    track: Track
}>()

const showInput = ref(false);
const newPlaylist = ref('');
function createPlaylist (){
    showInput.value = true
}
function cancel(){
    showInput.value = false;
    newPlaylist.value = ''
}

function closeModal(){
    console.log('close')
    hidePlaylistModal()
}

function stopPropagation(e:Event){
    e.stopPropagation()
}

const position = computed(()=>{
    // return `left-[${mouse.value.x}px] top-[${mouse.value.y}px]`
    return { left: mouse.value.x, top:mouse.value.y }
})

//Favorite Logic
async function addSongToFavorites (){
    const isFavorite = favorites.value.some((fav) => fav.id === track.id);
    if (isFavorite){
        const fav = favorites.value.find((el)=> el.id === track.id )
        try{
            const deleted = await deleteFavorite(fav?.docId!);
            if (deleted){
                showToast('Song Removed From Favorites', 'success')
            }
        }
        catch(error){
            showToast('Failed To Delete From Favorites', 'error')
       }
    }
    else {
        try{
            const added = await addToFavorites(track);
            if (added){
                showToast('Song Added To Favorites', 'success')
            }
        }
        catch(error){
            showToast('Failed To Add To Favorites', 'error')
        }
    }
}

//Playlist Logic
async function CreateNewPlaylist(){
    try{
        const res = await addToNewPlaylist(track, newPlaylist.value)
        if (res){
            showToast('Song Added ', 'success')
        }
    }
    catch(error){
        showToast('Failed To Add To Favorites', 'error')
    }
    
}

async function addToPlaylist(playlist: string){
    try{
        const res = await addToExistingPlaylist(track, playlist)
        if (res){
            showToast('Song Added ', 'success')
        }
    }
    catch(error){
        showToast('Failed To Add To Favorites', 'error')
    }
    
}

onMounted(()=>{
    getPlaylists()
})
</script>

<template>
    <div class="overlay border-2 relative h-screen w-screen overlay-width" @click="closeModal" >
        <div class="popup absolute" :style="{ left: `${mouse.x - 500}px`, top: `${mouse.y - 200}px` }" @click="stopPropagation">
            <div>
                <div>
                    <!-- <p v-if="!showInput" @click="createPlaylist">Create New Playlist</p> -->
                    <div @click="createPlaylist" v-if="!showInput" class="flex items-center gap-2 p-4 hover:bg-e-grey/20 rounded-sm font-bold text-[11px]">
                        <Icon name="material-symbols:add-circle-rounded" size="1.3em" class="hover:cursor-pointer text-e-orange" />
                        <div>Create New Playlist</div>
                    </div>
                </div>
                
                <div v-if="!showInput" class="min-h-[8rem] overflow-scroll">
                    <p @click="addSongToFavorites">Favorites</p>
                    <p  v-for="playlist of playlists" @click="addToPlaylist(playlist.name)">{{ playlist.name }}</p>
                </div>
                
                <div v-else class="flex flex-col">
                    <label class="p-4 block">New Playlist</label>
                    <input v-model="newPlaylist" />
                    <div class="flex justify-end w-[90%] m-auto py-4 gap-4">
                        <button class="bg-stone-700 px-1.5 py-1 rounded-lg text-[11px]" @click="cancel">Cancel</button>
                        <button class="bg-e-orange px-1.5 py-1 rounded-lg text-[11px]" @click="CreateNewPlaylist">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.popup{
    @apply bg-e-sidebar-bg rounded-md text-white w-[250px]
}
p{
    @apply p-4 hover:bg-e-grey/20 rounded-sm font-bold text-[11px];
}
input {
    @apply outline-0 border-0 p-2 w-[90%] m-auto rounded-md text-e-orange;
}

@media (min-width: 768px) {
    .overlay-width{
        width: calc(100vw - 15rem)
    }
}

</style>