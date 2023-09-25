import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { defineStore } from 'pinia'
import { Track } from '~/types/tracks';
const { user } = useFirebaseAuth();

const nuxtApp = useNuxtApp()
export const useFavoriteStore = defineStore('favoriteStore', {
    state: ()=>({
        favorites: [] as Track[]
    }),
    getters: {},
    actions: {
        async addToFavorites (track: Track){
            const docRef = collection(nuxtApp.$firestore,`users/${user.value?.uid}/favorites`);
            console.log(nuxtApp.$firestore)
            try{
                const res = await addDoc(docRef, {...track, timestamp:serverTimestamp()})
                if(res){
                    console.log(res)
                    return true
                }
            }
            catch(error){
                console.log(error)
                return false
            }
        },

        async getFavorites(){
            try{
                const q = query(collection(nuxtApp.$firestore, `users/${user.value?.uid}/favorites`));

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const favoritesSongs: Track[] = [];
                    querySnapshot.forEach((doc) => {
                        favoritesSongs.push({...doc.data(), docId: doc.id} as Track );
                    });
                    this.favorites = favoritesSongs
                    console.log(this.favorites)
                });
            }
            catch(error){
                console.log(error)
            }
        },

        async deleteFavorite(docId: string){
            const docRef = doc(nuxtApp.$firestore, 'users', user.value?.uid, 'favorites', docId)
            try{
                const res = await deleteDoc(docRef)
                return true
            }
            catch(error){
                console.log('error')
                return false
            }
        }
    }
})