import { defineStore } from 'pinia'
import { Album, FetchResponse, Track } from '~~/types/tracks'

const url = `https://api.jamendo.com/v3.0/albums/?client_id=8c9663b5&format=jsonpretty`
export const useAlbumStore = defineStore('albumStore', {
    state: ()=>({
        topAlbums: [] as Album[],
        topAlbumsLimit: 12,
        orderedAlbums: [] as Album[],
        offset:0,
        searchedAlbums: [] as Album[],
        albumTracks: [] as Track[]
    }),
    getters: {},
    actions: {
        clearSearchedAlbums(){
            this.searchedAlbums = []
        },
        clearTopAlbums(){
            this.topAlbums = []
        },
        async getTopAlbums(limit:number = 12){
            
            try{
                const { data } = await useFetch<FetchResponse<Album>>(`${url}&order=popularity_week&limit=${limit}&offset=${this.offset}`)
                console.log(data.value)
                if (data.value){
                    this.topAlbums = data.value.results
                }
            }
            catch(error){
                console.log(error)
            }
        },
        async getAlbumsAlphabetically(){
            try{
                const { data } = await useFetch<FetchResponse<Album>>(`${url}&limit=20&order=name&offset=${this.offset}`)
                if (data.value){
                    console.log(data.value.results)
                    this.orderedAlbums = data.value.results
                }
            }
            catch(error){
                console.log(error)
            }
        },

        async searchAlbums(searchQuery:string){
            try{
                const { data } = await useFetch<FetchResponse<Album>>(`${url}&limit=50&namesearch=${searchQuery}`)
                if (data.value){
                    this.searchedAlbums = data.value.results
                }
            }
            catch(error){
                console.log(error)
            }
             
        },

        async getAlbumTracks(albumId:string){
            console.log(albumId)
            try{
                const { data } = await useFetch<FetchResponse<Album>>(`https://api.jamendo.com/v3.0/albums/tracks?client_id=8c9663b5&format=jsonpretty&id=${albumId}`)
                if (data.value){
                    console.log(data.value.results)
                    this.albumTracks = data.value.results[0].tracks!
                }
            }
            catch(error){
                console.log(error)
            }
        },

        clearAlbumTracks(){
            this.albumTracks = []
        },

        // goToPrevPage (){
        //     this.offset -=20 
        // },
        // goToNextPage (){
        //     this.offset +=20
        // }

        goToPage (page:number){
            this.offset = 20 * (page - 1);
        }
    }
})