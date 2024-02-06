<template>
    <div @click="closePopUp">
        <div class="flex w-screen overflow-hidden">
            <SideBar class="hidden md:block"/>
            <div class="bg-e-background flex-1 flex flex-col h-screen overflow-scroll" :class="route.path.includes('/albums/')? 'gradient': route.path.includes('/favorites')? 'gradient':''">
                <div class="flex justify-between items-center shadow-sm px-3 sm:px-4 h-20">
                    <div class="flex gap-4 sm:gap-8 items-center">
                        <div class="md:hidden">
                            <Icon name="ri:menu-2-line"  class="text-2xl sm:text-3xl text-e-orange" @click="openSidebar"/>
                        </div>
                        <div class="search-bar relative my-5">
                            <input v-model="searchQuery" type="text" class="outline-0 text-sm rounded-full h-10 sm:h-12 sm:px-8 pl-8 min-w-[15rem] sm:w-96" @input="search" @click="closeSidebar">
                            <div class="search-icon text-black absolute left-2 top-1/2 -translate-y-1/2 transform">
                                <Icon name="ri:search-line" class="text-lg sm:text-xl"/>
                            </div>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="text-white hover:cursor-pointer" @click.stop="openPopUp">
                            <Icon name="material-symbols:account-circle" class="text-3xl sm:text-3xl" />
                        </div>
                        <div v-if="popUp" class="absolute w-[14rem] right-[100%] bg-e-sidebar-bg shadow-e-sidebar-bg shadow-md rounded-md p-3 text-e-grey hover:cursor-pointer z-[100000] ">
                            <div class="p-1 hover:text-white">{{ user?.email }}</div>
                            <div class="h-[0.5px] my-1 bg-e-grey"></div>
                            <div class="p-1 flex justify-between items-center hover:text-white" @click="signOut">Log out <span><Icon name="ri:logout-box-r-line" /></span></div>
                        </div>
                    </div>
                    
                </div>

                
                    
                <div class="panel flex-1 overflow-scroll">
                    <slot />
                </div>
            </div>  
        </div>
        
        <div v-if="showPlayer">
            <PlayerBottomBar />
        </div>

        <div v-if="sidebar" class="fixed top-20 w-screen z-[9000]" @click="closeSidebar">
            <SideBar />
        </div>
    </div>
    <!-- <PlayerView /> -->
</template>

<script setup lang="ts">
import { usePlayerStore } from '~/store/player';
import { usePlaylistStore } from '~~/store/playlist';
const { user, signOutUser } = useFirebaseAuth();

const route = useRoute()
const router = useRouter()

const showPlayer = ref(false)

//stores...........................................
const playerStore = usePlayerStore();
const { isPlaying, songQueue } = toRefs(playerStore)

const playlistStore = usePlaylistStore()
const { showPlaylistModal, hidePlaylistModal  } = playlistStore
const { playlistModalVisible } = toRefs(playlistStore);

//search Logic............................................
const searchQuery = ref('');

function search(){
    if(sidebar.value){
        closeSidebar()
    }
    router.push({
        name:'search',
        query:{
            searchQuery: searchQuery.value
        }
    })
}

const popUp = ref(false)
const openPopUp = ()=>{
    if(popUp.value){
        popUp.value = false
    }
    else{
        popUp.value= true
    }
}
const closePopUp = ()=>{
    popUp.value= false
}

const sidebar = ref(false)
const openSidebar = ()=>{
    if(sidebar.value){
        sidebar.value = false
    }
    else{
        sidebar.value = true
    }
}
const closeSidebar = ()=>{
    sidebar.value = false
}


function signOut(){
    signOutUser().then(()=>{
        navigateTo('/auth/signin')
    })
}

watch(route, ()=>{
    searchQuery.value = route.query.searchQuery as string
    hidePlaylistModal()
    closePopUp()
    closeSidebar()
})

watch( isPlaying, ()=>{
    if (isPlaying.value){
        showPlayer.value = true
    }
})

onMounted(()=>{
    searchQuery.value = route.query.searchQuery as string
})
</script>

<style scoped>
.gradient{
    /* background: #FF7A01;

background: linear-gradient(90deg, #da6c05 0%, #FF7A01 100%);

background: -moz-linear-gradient(90deg, #da6c05 0%, #FF7A01 100%);

background: -webkit-linear-gradient(90deg, v 0%, #FF7A01 100%);

filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#da6c05", endColorstr="##FF7A01'", GradientType=1 ); */
}
/* .panel{
    max-height: calc( 100vh - 48px - 40px);
} */
tr:hover .index{
        display: none;
    }
tr:hover .play-icon{
    display:block
}
</style>