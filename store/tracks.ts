import { defineStore } from 'pinia'
import { FetchResponse, Track } from '~~/types/tracks'

const url = 'https://api.jamendo.com/v3.0/tracks/?client_id=8c9663b5&format=jsonpretty'
export const useTrackStore = defineStore('trackStore', {
    state: ()=> ({
        topTracks: [] as Track[],
        searchedTracks: [] as Track[],
        genreTracks: [] as Track[]
    }),
    getters: {},
    actions: {
        async getTopTracks(){
            try{
                const {data} = await useFetch<FetchResponse<Track>>(`${url}&format=jsonpretty&imagesize=600&boost=popularity_month&limit=12`)
                if (data.value){
                    console.log(data.value)
                    this.topTracks = data.value.results
                }
            }
            catch(error){
                console.log(error)
            }               
        },

        async getGenreTracks(genre:string){
            try{
                const {data} = await useFetch<FetchResponse<Track>>(`${url}&format=jsonpretty&format=jsonpretty&imagesize=600&limit=12&tags=[${genre}]&boost=popularity_month`)
                if (data.value){
                    this.genreTracks = data.value.results
                }
            }
            catch(error){
                console.log(error)
            }
        },

        async searchTracks(searchQuery:string){
            try{
                const { data } = await useFetch<FetchResponse<Track>>(`${url}&format=jsonpretty&imagesize=600&namesearch=${searchQuery}&limit=50`)

                if(data.value){
                    this.searchedTracks = data.value.results
                }
            }
            catch(error){
                console.log(error)
            }
            
        }
    }
})