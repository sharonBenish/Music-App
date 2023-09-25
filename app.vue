<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <TransitionSlide :offset="[0, -16]">
    <CustomToast v-if="toast.isVisible" :message="toast.message" :type="toast.type" />
  </TransitionSlide>
  
</template>

<script setup lang="ts">
const { toast } = useToast()
</script>
