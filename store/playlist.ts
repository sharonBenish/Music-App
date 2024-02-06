import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, getDocs, doc, deleteDoc, where, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { defineStore } from 'pinia'
import { Playlist, Track } from '~/types/tracks';
import { Mouse } from '../types/screen';
const { user } = useFirebaseAuth();

const nuxtApp = useNuxtApp()
export const usePlaylistStore = defineStore('playlistStore', {
    state: ()=>({
        playlistModalVisible: false,
        playlists: [] as Array<Playlist>,
        mouse: {
            x: 0,
            y: 0
        } as Mouse
    }),
    getters: {
        playlist: (state)=>{
            return (playlistName: string) => state.playlists.filter((playlist)=>{
                playlist.name === playlistName
            })
        }
    },
    actions: {
        showPlaylistModal(pos:Mouse){
            this.playlistModalVisible = true;
            this.mouse = pos
        },
        hidePlaylistModal(){
            this.playlistModalVisible = false;
            this.mouse = {
                x: 0,
                y: 0
            }
        },

        async createNewPlaylist (playlist: string){
            const docRef = doc(nuxtApp.$firestore,`users/${user.value?.uid}/playlists/${playlist}`);

            try{
                const res = await setDoc(docRef, {
                    name: playlist,
                    songs: []
                })
            }
            catch (error){
                console.log(error)
            }
        },

        async addToNewPlaylist (track: Track, playlist:string){
            
            const docRef = doc(nuxtApp.$firestore,`users/${user.value?.uid}/playlists/${playlist}`);
            
            try{
                const res = await setDoc(docRef, { name: playlist, songs: [track]})
                return true
            }
            catch (error){
                console.log(error)
                return false
            }
        },

        async addToExistingPlaylist (track: Track, playlist:string){
            const docRef = doc(nuxtApp.$firestore,`users/${user.value?.uid}/playlists/${playlist}`);
            // console.log('doc')
            try{
                const res = await updateDoc(docRef, { songs: arrayUnion(track)})
                return true
            }
            catch (error){
                console.log(error)
                return false
            }
        },

        async getPlaylists(){
            try{
                const q = query(collection(nuxtApp.$firestore,`users/${user.value?.uid}/playlists`));

                const unsubscribe = onSnapshot(q, (querySnapshot)=>{
                    const playlists: Array<any> = [];
                    querySnapshot.forEach((doc) => {
                        playlists.push(doc.data());
                    });
                    this.playlists = playlists
                    console.log(this.playlists)
                })

            }
            catch(error){
                console.log(error)
            }
        },

        async delPlaylist (playlist:string){
            try{
                const docRef = doc(nuxtApp.$firestore,`users/${user.value?.uid}/playlists/${playlist}`)
                const res = await deleteDoc(docRef)

                return true
            }
            catch (error){
                console.log(error)
                return false
            }
        },

        async delSong (playlist:string, track: Track){
            try{
                const docRef = doc(nuxtApp.$firestore,`users/${user.value?.uid}/playlists/${playlist}`);
                await updateDoc(docRef, {
                    songs: arrayRemove(track)
                });
                return true
            }
            catch(error){
                console.log(error)
                return false
            }
        }

    }
})