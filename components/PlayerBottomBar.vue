<template>
    <div class='bar flex absolute bottom-0 bg-e-blackLight w-full py-3 px-5 justify-between items-center max-h-[90px]'>
        <div class="flex items-center gap-4 cursor-pointer">
            <img :src="currentSong.image" class="song-image w-10 h-10"/>
            <div class="song-details max-w-[150px] overflow-hidden">
                <div class="title text-white text-sm scrolling-text" v-html="currentSong.name"></div>
                <div class="artist text-e-grey text-xs" v-html="currentSong.artist_name"></div>
            </div>
            <div class="like hover:cursor-pointer" 
            :class="favorites.some(fav => currentSong.id === fav.id)? 'text-e-orange':'text-e-grey hover:text-white'"
            @click="addSongToFavorite">
                <Icon name="ri:heart-fill" size="1.1em"/>
            </div>
            <div class="playlist relative text-e-grey hover:text-white hover:cursor-pointer">
                <!-- <Icon name="ri:play-list-add-line"  size="1.1em" /> -->
                <Icon @click="showPlaylists" name="ic:sharp-playlist-add" class="hover:text-e-orange" size="1.1em" />
                <div class="absolute bottom-[120%] left-0" v-if="playlistVisible">
                    <PlaylistOptions />
                </div>
            </div>
        </div>
        <div>
            <div class="flex flex-col-reverse items-center gap-3">
                <div class="flex text-xs gap-3 items-center">
                    <span class="text-white">{{ currentTime }}</span>
                    <div ref="progressBar" class="duration relative hover:cursor-pointer" @click="handleClick">
                        <div class="w-80 h-1 bg-e-grey"></div>
                        <div class="h-1 min-w-min bg-white absolute top-0 left-0" :style="{ width: progress }"></div>
                    </div>
                    <span class="text-e-grey text-xs">{{ convertToMinuteDuration(currentSong.duration)}}</span>
                </div>
                <div class="controls text-e-grey flex items-center">
                    <div class="prev hover:cursor-pointer" @click="playPrev">
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
        </div>
        <div class="options text-e-grey flex text-center gap-3 text-sm">
            <div class="repeat hover:text-white hover:cursor-pointer" :class="repeatOn?'text-white':''" @click="controlRepeat">
                <Icon :name="repeatIcon!"  size="1.1em"/>
            </div>
            <div class="shuffle hover:text-white hover:cursor-pointer" :class="shuffleOn?'text-white':''" @click="controlShuffle">
                <Icon name="ri:shuffle-fill"  size="1.1em"/>
            </div>
            <div class="volume hover:text-white hover:cursor-pointer" @click="toggleMute">
                <Icon :name="audio.muted?'solar:muted-linear':'ri:volume-up-line'" size="1.1em"/>
            </div>
            <div>
                <input v-model="volume" type="range" min="0" max="100" class="slider" @change="controlVolume">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '~/store/player';
import { convertToMinuteDuration } from '~/composables/useTime'
import { useFavoriteStore } from '~/store/favorites';
const { toast, showToast } = useToast()

const favoriteStore = useFavoriteStore()
const { favorites } = toRefs(favoriteStore)
const { addToFavorites, getFavorites, deleteFavorite } = favoriteStore

const playerStore = usePlayerStore()
const { isPlaying, currentSongUrl, isPaused, currentSong } = toRefs(playerStore)
const { pausePlayMusic, stopPlaying, playNextSong, playPrevSong } = playerStore

const audio = new Audio (currentSongUrl.value)

const currentTime = ref(convertToMinuteDuration(audio.currentTime))
const progress = ref('0%')
const progressBar = ref<HTMLDivElement | null>(null)

const handleClick = (event:MouseEvent) => {
    if (progressBar.value){
        const containerRect = progressBar.value.getBoundingClientRect();
        const x = event.clientX - containerRect.left;
        const y = event.clientY - containerRect.top;
        // console.log('Clicked position:', { x, y });
        audio.currentTime = audio.duration - ((320 - x)*audio.duration/320)
    }
};

//Repeat Logic................................
const repeatOn = ref(false)
const repeatSong = ref(false)

const repeatIcon = computed (()=>{
    if(repeatOn.value){
        if (repeatSong.value){
            console.log("repeat song")
            return 'ri:repeat-one-line'
        }else{
            console.log("repeat on")
            return 'ri:repeat-line'
        }
    }else{
        console.log("repeat off")
        return 'ri:repeat-line'
    }
})

function controlRepeat(){
    if (!repeatOn.value){
        repeatOn.value = true
    }else if(repeatOn.value && repeatSong.value){
        repeatOn.value = false
        repeatSong.value = false
        audio.loop=false
    }
    else{
        repeatSong.value = true
        audio.loop = true
    }
}

//Shuffle Logic.......................
const shuffleOn = ref(false)
function controlShuffle(){
    shuffleOn.value = !shuffleOn.value
}

//Volume Logic.........................
const volume = ref(audio.volume * 100)
function toggleMute(){
    audio.muted =!audio.muted
}

function controlVolume(){
    console.log(volume.value)
    audio.volume = volume.value/100
    console.log(audio.volume)
}

//Play logic...........................
function controlPlay(){
    pausePlayMusic()
}

function playNext(){
    playNextSong()
}

function playPrev(){
    playPrevSong()
}

//Favorite Logic
async function addSongToFavorite (){
    const isFavorite = favorites.value.some((fav) => fav.id === currentSong.value.id);
    if (isFavorite){
        const fav = favorites.value.find((el)=> el.id === currentSong.value.id )
        console.log(fav)
        try{
            const deleted = await deleteFavorite(fav?.docId!);
            if (deleted){
                showToast('Song Removed From Favorites', 'success')
            }
        }
        catch(error){
            showToast('Failed To Delete From Favorites', 'error')
       }
    }else{
        try{
            const added = await addToFavorites(currentSong.value);
            if (added){
                showToast('Song Added To Favorites', 'success')
            }
        }
        catch(error){
            showToast('Failed To Add To Favorites', 'error')
        }
    }
}

//Playlists Logic
const playlistVisible = ref(false)
function showPlaylists (){
    playlistVisible.value = !playlistVisible.value
}

//watchers.............................

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

// watch(audio.duration, ()=>{
//     if(audio.currentTime === audio.duration){
//         console.log('end')
//     }
// })

onMounted(()=>{
    audio.play()
    audio.ontimeupdate = ()=>{
        currentTime.value = convertToMinuteDuration(audio.currentTime);
        progress.value = `${audio.currentTime/audio.duration * 100}%`
    }
    audio.onended = ()=>{
        if(repeatOn.value && !repeatSong.value){
            playNext()
        }else{
            stopPlaying()
            audio.pause()
        }  
    }
    getFavorites()
})

onBeforeUnmount(()=>{
    stopPlaying()
    audio.pause()
})
</script>

<style scoped>
.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 1rem;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 100%;
  background: #FF7A01;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #04AA6D;
  cursor: pointer;
}

.scrolling-text {
  animation: scrolling-animation 18s linear infinite;
  white-space: nowrap;
}

@keyframes scrolling-animation {
  0% {
    transform: translateX(0%);
  }
  83.333% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>