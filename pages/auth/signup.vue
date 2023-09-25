<script setup lang="ts">
definePageMeta({
    layout: "auth"
})

const { user, registerUser, signOutUser } = useFirebaseAuth();
const { toast, showToast } = useToast()

interface NewUser{
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

const newUser = ref<NewUser>({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
})

const signupForm = ref<HTMLFormElement>();
const errorMsg = ref('');
const hasError = ref(false);
const loading = ref(false)
const success = ref(false)

async function signUp (){
    errorMsg.value ='';
    hasError.value = false;
    if (newUser.value.firstName.trim() === ''){
        errorMsg.value = "Please input a first name";
        hasError.value = true
        return
    }
    if (newUser.value.lastName.trim() === ''){
        errorMsg.value = "Please input a last name";
        hasError.value = true
        return
    }
    if (newUser.value.email.trim() === ''){
        errorMsg.value = "Please input a email";
        hasError.value = true
        return
    }
    try {
        loading.value = true;
        const res = await registerUser(newUser.value.email, newUser.value.password);
        if (res.isSuccessful){
            errorMsg.value ='';
            hasError.value = false;
            success.value = true;
            // showToast('Account Created', 'success')
            setTimeout(async () => {
                await signOutUser()
                await navigateTo('/auth/signin', { replace: true })
            }, 3000)
            newUser.value = {
                firstName: '',
                lastName: '',
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
</script>

<template>
    <div class="signup">
        <div v-if="success">
            <div class="h-full w-full grid place-items-center">
                <!-- <lottie-player
                autoplay
                style="width:100px"
                src="https://assets8.lottiefiles.com/packages/lf20_lk80fpsm.json"
                speed="1"
                /> -->
                <p class="text-2xl text-e-orange font-bold my-4">
                 Sign up successful
                </p>
            </div>
        </div>
        <form ref="signupForm" v-else>
            <div class="form-item">
                <label>First Name</label>
                <input type="text" v-model="newUser.firstName" />
            </div>
            <div class="form-item">
                <label>Last Name</label>
                <input type="text" v-model="newUser.lastName" />
            </div>
            <div class="form-item">
                <label>Email</label>
                <input type="text" v-model="newUser.email" />
            </div>
            <div class="form-item">
                <label>Password</label>
                <input type="password" v-model="newUser.password" />
            </div>

            <div class="flex justify-center mt-10 mb-2">
                <button @click.prevent="signUp" class="flex justify-center items-center gap-4">
                    <p>Sign Up</p>
                    <span v-if="loading">
                        <Icon name="svg-spinners:6-dots-scale-middle" size="1.5em" />
                    </span>
                </button>

            </div>
            
            <p>Have an account already? <NuxtLink to="/auth/signin">Sign In</NuxtLink> to your account</p>
        </form>
        <p>{{ errorMsg }}</p>
    </div>
</template>

<style scoped>
.signup{
    @apply border-2 border-e-orange-blur rounded-md px-10 py-10 w-[50%]
}

input{
    @apply border-0 outline-none px-4 py-3 mt-2 rounded w-full bg-e-grey/20;
    @apply focus:bg-white text-e-orange
}

label{
    @apply text-e-orange/70 font-light
}

button{
    @apply bg-e-orange/70 text-e-sidebar-bg px-4 py-3 rounded w-[60%] font-bold mx-auto;
    @apply hover:bg-e-orange focus:scale-95
}

.form-item{
    @apply mb-6
}

p{
    @apply text-white text-sm font-light text-center
}

a{
    @apply underline text-e-orange 
}
</style>