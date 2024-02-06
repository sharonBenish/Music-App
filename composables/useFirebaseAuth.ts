import { createUserWithEmailAndPassword, User, signOut, signInWithEmailAndPassword, Auth } from 'firebase/auth'
import { AuthResponse } from '~/types/auth';

export default function() {
  const nuxtApp = useNuxtApp();
  // const auth = inject('auth') as Auth

  const user = useState<User | null>("fb_user", () => null)

  const registerUser = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const userCreds = await createUserWithEmailAndPassword(nuxtApp.$auth, email, password)
      console.log(userCreds)
      if (userCreds) {
        // user.value = userCreds.user
        return { isSuccessful: true }
      }
    } 
    catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error)
      }
      return { isSuccessful: false, error: error as string}
    }
    return { isSuccessful: false }
  }

  const signOutUser = async() =>{
    user.value = null
    signOut(nuxtApp.$auth)
    .then(()=>{
      console.log('signed out')
    }).catch((error)=>{
      console.log(error)
    })
  }

  const signInUser = async (email:string, password:string): Promise<AuthResponse> => {
    try {
      const userCreds = await signInWithEmailAndPassword(nuxtApp.$auth, email, password)
      console.log(userCreds)
      if (userCreds) {
        user.value = userCreds.user
        return { isSuccessful: true }
      }
    } 
    catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error)
      }
      return { isSuccessful: false, error: error as string}
    }
    return { isSuccessful: false }
  }

  return {
    user,
    registerUser,
    signOutUser,
    signInUser
  }
}