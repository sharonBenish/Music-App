<template>
    <div class="hover:bg-stone-950 rounded-lg music cursor-pointer w-36 sm:w-[200px] md:w-40 lg:w-[200px]" @click="handleClick">
        <div class=" relative">
            <img :src="card.image" class="h-36 w-36 sm:h-44 sm:w-[200px] md:h-36 md:w-40 lg:h-48 lg:w-[200px] rounded-lg"/>
            <!-- <div v-if="!isArtist" class="play bg-e-orange rounded-full w-8 h-8 sm:w-10 sm:h-10 justify-center items-center absolute bottom-5 right-3 hidden hover:scale-110">
                <Icon :name="songPlaying?'material-symbols:pause-rounded':'material-symbols:play-arrow-rounded'" class="text-xl sm:text-3xl text-black hover:scale-110" />
            </div> -->
        </div>

        <div class="details mt-2 w-32 sm:w-48 md:w-38 lg-48">
            <h3 class="text-sm text-e-orange" v-html="card.name"></h3>
            <p class="text-xs text-white" v-html="'artist_name' in card? card.artist_name: ''"></p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '~/store/player';
import { Album, Artist, Track } from '~~/types/tracks';

const router = useRouter()
const playerStore = usePlayerStore()
const { isPlaying, currentSongUrl, isPaused } = toRefs(playerStore)
const { playMusic, stopPlaying, pausePlayMusic } = playerStore

const { card }= defineProps<{
    card: Track| Artist| Album
}>()

const emit = defineEmits(['song-clicked'])

const isArtist = computed(()=>{
    if (card.hasOwnProperty('website') && !card.hasOwnProperty('zip')){
        return true
    }
    else {
        return false
    }
})

const songPlaying = computed(()=>{
    if ('audio' in card ){
        if (isPlaying.value && card.audio === currentSongUrl.value && !isPaused.value){
            return true
        }else{
            false
        }
    }else{
        false
    }
})

function handleClick(){
    if ('audio' in card){
        if (isPlaying  && currentSongUrl.value === card.audio){
            pausePlayMusic()
        }
        emit('song-clicked')
        playMusic(card)
    }
    else{
        if('releasedate' in card && !('audio' in card)){
            navigateTo({
                path:`/albums/${card.id}`,
                query:{
                    artistName: card.artist_name,
                    albumImage: card.image,
                    albumName: card.name,
                    releaseDate: card.releasedate
                }
            })
        }

        if ('joindate' in card){
            navigateTo({
                path:`/artists/${card.id}`,
                query:{
                    artistName: card.name,
                    artistImage: card.image,
                    joindate: card.joindate,
                    website: card.website
                }
            })
        }
    }
    
}
</script>

<style scoped>
.music:hover .play{
    display: flex;
}
</style>