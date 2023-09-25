<template>
    <div class="hover:bg-stone-950 p-4 rounded-lg music cursor-pointer" @click="handleClick">
        <div class="h-48 min-w-[200px] relative">
            <img :src="card.image" class="h-48 w-[200px] rounded-lg"/>
            <div v-if="!isArtist" class="play bg-e-orange rounded-full w-10 h-10 justify-center items-center absolute bottom-5 right-3 hidden hover:scale-110">
                <Icon :name="songPlaying?'material-symbols:pause-rounded':'material-symbols:play-arrow-rounded'" size="2em" class="text-black hover:scale-110" />
            </div>
        </div>

        <div class="details mt-2 max-w-[190px]">
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