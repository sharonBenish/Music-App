import { defineStore } from 'pinia'
import { Album, Artist, FetchResponse, Track } from '~~/types/tracks'

const url = 'https://api.jamendo.com/v3.0/artists/?client_id=8c9663b5&format=jsonpretty'
export const useArtistStore = defineStore('artistStore', {
    state: ()=>({
        topArtists: [] as Artist[],
        topArtistsLimit: 12,
        orderedArtists: [] as Artist[],
        offset:0,
        searchedArtists: [] as Artist[],
        artistTracks: [] as Track[],
        artistAlbums: [] as Album[]
    }),
    getters: {},
    actions: {
        clearSearchedArtists(){
            this.searchedArtists = []
        },
        clearTopArtist(){
            this.topArtists = []
        },
        
        async getTopArtists(limit:number = 12){
            try{
                const { data } = await useFetch<FetchResponse<Artist>>(`${url}&order=popularity_month&limit=${limit}&offset=${this.offset}`)
                if (data.value){
                    console.log(data.value)
                    this.topArtists = data.value.results
                }
            }
            catch(error){
                console.log(error)
            }
        },
         
        async getArtistAlphabetically(){
            try{
                const { data } = await useFetch<FetchResponse<Artist>>(`${url}&limit=20&order=name&offset=${this.offset}`)
                if (data.value){
                    console.log(data.value.results)
                    this.orderedArtists = data.value.results
                }
            }
            catch(error){
                console.log(error)
            }
        },

        async searchArtists(searchQuery:string){
            try{
                const { data } = await useFetch<FetchResponse<Artist>>(`${url}&limit=50&namesearch=${searchQuery}`)
                if (data.value){
                    this.searchedArtists = data.value.results
                }
            }
            catch(error){
                console.log(error)
            }
        },

        async getArtistTracks (id:string){
            try{
                const { data } = await useFetch<FetchResponse<Artist>>(`https://api.jamendo.com/v3.0/artists/tracks/?client_id=8c9663b5&format=jsonpretty&id=${id}`)
                if (data.value){
                    this.artistTracks = data.value.results[0].tracks!
                }
            }
            catch (error){
                console.log(error)
            }
        },

        async getArtistAlbums (id:string){
          try{
                const { data } = await useFetch<FetchResponse<Artist>>(`https://api.jamendo.com/v3.0/artists/albums/?client_id=8c9663b5&format=jsonpretty&id=${id}&order=album_releasedate`)
                if (data.value){
                    this.artistAlbums = data.value.results[0].albums!
                }
            }
            catch (error){
                console.log(error)
            }  
        },

        // goToPrevPage (page){
        //     this.offset -=20
        // },
        // goToNextPage (page:number){
        //     // this.offset +=20
        //     this.offset = 20 * page
        // }

        goToPage (page:number){
            this.offset = 20 * (page - 1);
        }
    }
})