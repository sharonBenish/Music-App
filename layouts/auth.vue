<script setup lang="ts">
</script>

<template>
    <div class="page relative">
      <!-- <img src="/auth-bg.jpg" class="absolute z-0 h-full w-full blur-xl" /> -->
      <div class="logo flex items-center my-10 ">
        <img class="w-12 sm:w-18" src="../assets/images/logo.svg" alt="">
        <img class="w-16 sm:w-18" src="../assets/images/musi.svg" alt="">
      </div>
      <div class="relative z-20 w-[80%] max-w-[30rem] md:max-w-none md:w-[60%] xl:w-[50%]">
        <slot >
        </slot>
      </div>     
    </div>
</template>

<style scoped>
.page{
  @apply pb-10 min-h-screen flex flex-col items-center justify-center bg-e-blackLight;
}
</style>