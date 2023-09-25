<template>
    <div>
        <div class="flex overflow-hidden">
            <SideBar/>
            <div class="bg-e-background w-5/6" :class="route.path.includes('/albums/')? 'gradient': route.path.includes('/favorites')? 'gradient':''">
                <div class="flex justify-between items-center">
                    <div class="search-bar relative ml-5 my-5">
                        <input v-model="searchQuery" type="text" placeholder="what do you want to listen to?" class="outline-0 rounded-full h-12 px-3 pl-8 w-96" @input="search">
                        <div class="search-icon text-e-grey mr-5 absolute top-1/4 left-1">
                            <Icon name="ri:search-line" size="1.3em"/>
                        </div>
                    </div>

                    <div class="text-white mr-4 hover:cursor-pointer">
                        <Icon name="material-symbols:account-circle" size="2em" />
                    </div>
                </div>
                    
                <div class="panel overflow-scroll">
                    <slot />
                </div>
            </div>  
        </div>
        
        <div v-if="isPlaying">
            <PlayerBottomBar />
        </div>
    </div>
    <!-- <PlayerView /> -->
</template>

<script setup lang="ts">
import { usePlayerStore } from '~/store/player';

const route = useRoute()
const router = useRouter()

//stores...........................................
const playerStore = usePlayerStore();
const { isPlaying } = toRefs(playerStore)

//search Logic............................................
const searchQuery = ref('');

function search(){
    router.push({
        name:'search',
        query:{
            searchQuery: searchQuery.value
        }
    })
}

watch(route, ()=>{
    searchQuery.value = route.query.searchQuery as string
})
</script>

<style scoped>
.gradient{
    background: #FF7A01;

background: linear-gradient(90deg, #da6c05 0%, #FF7A01 100%);

background: -moz-linear-gradient(90deg, #da6c05 0%, #FF7A01 100%);

background: -webkit-linear-gradient(90deg, v 0%, #FF7A01 100%);

filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#da6c05", endColorstr="##FF7A01'", GradientType=1 );
}
.panel{
    max-height: calc( 100vh - 48px - 40px);
}
tr:hover .index{
        display: none;
    }
tr:hover .play-icon{
    display:block
}
</style>