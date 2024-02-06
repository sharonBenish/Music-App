import { defineStore } from 'pinia'
import { Track } from '~/types/tracks';

export const usePlayerStore = defineStore('playerStore', {
    state: ()=>({
        isPlaying: false,
        isPaused: false,
        isOnRepeat: false,
        currentSongUrl: '',
        currentSong: {} as Track,
        songQueue: [] as Track[]
    }),
    getters: {},
    actions: {
        playMusic(music:Track){
            this.isPlaying = true;
            this.currentSong = music
            this.currentSongUrl = music.audio;
        },
        stopPlaying(){
            this.isPlaying = false
        },
        pausePlayMusic(){
            this.isPaused= !this.isPaused
        },
        addToQueue(queue: Track[]){
            this.songQueue = queue
        },
        playShuffle(){
            const randIdx = Math.floor(Math.random()*this.songQueue.length)
            this.currentSong = this.songQueue[randIdx]
            this.currentSongUrl= this.currentSong.audio
        },
        playNextSong(){
            const currentSongIdx = this.songQueue.findIndex(song => song.id === this.currentSong.id)
            if (currentSongIdx !== -1){
                // console.log('curr SOng',this.songQueue[currentSongIdx + 1], currentSongIdx)
                if (currentSongIdx === this.songQueue.length -1){
                    this.currentSong = this.songQueue[0]
                    this.currentSongUrl = this.currentSong.audio
                }
                else{
                    this.currentSong = this.songQueue[currentSongIdx + 1]
                    this.currentSongUrl = this.currentSong.audio
                }
                
            }    
        },
        playPrevSong(){
            const currentSongIdx = this.songQueue.findIndex(song => song.id === this.currentSong.id)
            if (currentSongIdx !== -1){
                if (currentSongIdx === 0){
                    this.currentSong = this.songQueue[this.songQueue.length - 1]
                    this.currentSongUrl = this.currentSong.audio
                }
                else{
                    this.currentSong = this.songQueue[currentSongIdx - 1]
                    this.currentSongUrl = this.currentSong.audio
                }
                
            }
            
        }
    }
})