<script setup lang="ts">
definePageMeta({
    layout: "auth"
})

const { user, signInUser, signOutUser } = useFirebaseAuth();
const { toast, showToast } = useToast()

interface LoginDetails{
    email: string,
    password: string
}

const userLogin = ref<LoginDetails>({
    email: '',
    password: ''
})

const loginForm = ref<HTMLFormElement>();
const errorMsg = ref('');
const hasError = ref(false);
const loading = ref(false)
const success = ref(false)

async function signIn (){
    errorMsg.value ='';
    hasError.value = false;
    if (userLogin.value.email.trim() === ''){
        errorMsg.value = "Please input a email";
        hasError.value = true
        return
    }
    else if (userLogin.value.password.trim() === ''){
        errorMsg.value = "Please input a password";
        hasError.value = true
        return
    }
    try {
        loading.value = true;
        const res = await signInUser(userLogin.value.email, userLogin.value.password)
        if (res.isSuccessful){
            errorMsg.value ='';
            hasError.value = false;
            success.value = true;
            // showToast('Account Created', 'success')
            setTimeout(async () => {
                await navigateTo('/', { replace: true })
            }, 3000)
            userLogin.value = {
                email: '',
                password: ''
            }
        }
        else{
            errorMsg.value = res.error!;
            hasError.value = true
        }
    }
    catch (error){
        console.log('it has an error', error)
    }
    finally{
        loading.value = false
    }

}

onMounted(()=>{
    signOutUser()
})
</script>

<template>
    <div class="w-full">
        <div v-if="success">
            <div class="h-full w-full grid place-items-center">
                <!-- <lottie-player
                autoplay
                style="width:100px"
                src="https://assets8.lottiefiles.com/packages/lf20_lk80fpsm.json"
                speed="1"
                color="blue"
                /> -->
                <p class="text-2xl text-e-orange  my-4">
                 Sign in successful
                </p>
            </div>
        </div>
        <form v-else class="md:bg-e-sidebar-bg md:shadow-md md:px-10 md:py-12 rounded-md">
            <div class="form-item">
                <label>Email</label>
                <input v-model="userLogin.email" type="text" />
            </div>
            <div class="form-item">
                <label>Password</label>
                <input v-model="userLogin.password" type="password" />
            </div>

            <p class="error" v-if="hasError">- {{  errorMsg }}</p>

            <div class="flex justify-center mt-10 mb-2">
                <button @click.prevent="signIn" class="flex justify-center items-center gap-4">
                    <p>Sign In</p>
                    <span v-if="loading">
                        <Icon name="svg-spinners:6-dots-scale-middle" size="1.5em" />
                    </span>
                </button>
            </div>
            
            <p class="footer">Don't have an account? <NuxtLink to="/auth/signup">Sign Up</NuxtLink> for an account</p>
        </form>
    </div>
</template>

<style scoped>
/* .signin{
    @apply border-2 border-e-orange-blur rounded-md px-10 py-10 w-[50%]
} */

input{
    @apply border-0 shadow-md outline-none px-4 py-3 mt-2 rounded w-full bg-e-grey/20;
    @apply focus:bg-white text-e-orange
}

.error{
    @apply text-red-600 text-left
}

label{
    @apply text-e-orange font-light
}

button{
    @apply bg-e-orange/70 text-e-sidebar-bg px-4 py-3 rounded w-full font-bold mx-auto;
    @apply hover:bg-e-orange active:scale-95
}

.form-item{
    @apply mb-6
}

form p{
    @apply text-white text-sm font-light text-center
}

a{
    @apply underline text-e-orange 
}
.footer{
    @apply text-left my-4 
}
</style>