<template>
    <div class="flex flex-col items-center gap-3">
        <div class="flex text-xs gap-3 items-center">
            <span class="text-white">1:03</span>
            <div class="duration relative">
                <div class="w-80 h-1 bg-e-grey"></div>
                <div class="h-1 min-w-min bg-white absolute top-0 left-0 w-11"></div>
            </div>
            <span class="text-e-grey text-xs">2.56</span>
        </div>
        <div class="controls text-e-grey flex items-center">
            <div class="prev hover:cursor-pointer">
                <Icon name="ant-design:fast-backward-filled" size="1.5em"/>
            </div>
            <div class="play text-white hover:cursor-pointer" @click="controlPlay">
                <Icon :name="isPlaying && isPaused?'ri:play-circle-fill':'ri:pause-circle-fill'" size="2.5em" />
            </div>
            <div class="next hover:cursor-pointer" @click="playNext">
                <Icon name="ant-design:fast-forward-filled" size="1.5em" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '~/store/player';

const playerStore = usePlayerStore()
const { isPlaying, currentSongUrl, isPaused, currentSong } = toRefs(playerStore)
const { pausePlayMusic, stopPlaying, playNextSong } = playerStore

const audio = new Audio (currentSongUrl.value)

function controlPlay(){
    pausePlayMusic()
}

function playNext(){
    console.log('next')
    playNextSong()
}

watch(isPaused, ()=>{
    if (isPaused.value){
        audio.pause()
    }else{
        audio.play()
    }
})

watch(currentSongUrl,()=>{
    console.log(currentSongUrl.value)
    audio.src = currentSongUrl.value
    audio.play()
})

onMounted(()=>{
    audio.play()
})

onBeforeUnmount(()=>{
    stopPlaying()
    audio.pause()
})
</script>

<style scoped>

</style>