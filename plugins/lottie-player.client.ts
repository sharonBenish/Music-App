import * as LottiePlayer from '@lottiefiles/lottie-player'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(LottiePlayer as any)
})
