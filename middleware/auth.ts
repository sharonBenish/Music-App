import { onAuthStateChanged } from "firebase/auth";

export default defineNuxtRouteMiddleware((to, from)=>{
    const nuxtApp = useNuxtApp()
    const { user:appUser } = useFirebaseAuth();
    onAuthStateChanged(nuxtApp.$auth, (user)=>{
        if(user){
            appUser.value = user
            
        } else {
           console.log('noooo')
           return navigateTo('/auth/signin')
        }
    })
})