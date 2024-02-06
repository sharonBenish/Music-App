import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const firebaseConfig = {
        apiKey: "AIzaSyChWQqsZ5X5qGOjiLbHNw1rjyyqSiQ8c10",
        authDomain: "musi-app-37de2.firebaseapp.com",
        projectId: "musi-app-37de2",
        storageBucket: "musi-app-37de2.appspot.com",
        messagingSenderId: "796910435865",
        appId: "1:796910435865:web:0764d7946577b63bd83488"
    };

    const app = initializeApp(firebaseConfig)

    const auth = getAuth(app)
    const firestore = getFirestore(app)

    // nuxtApp.vueApp.provide('auth', auth)
    // nuxtApp.provide('auth', auth)

    // nuxtApp.vueApp.provide('firestore', firestore)
    // nuxtApp.provide('firestore', firestore)

    return {
        provide:{
            auth,
            firestore
        }
    }
})