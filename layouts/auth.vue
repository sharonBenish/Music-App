<script setup lang="ts">
</script>

<template>
    <div class="page">
      <div class="logo flex items-center">
        <img class="w-18" src="../assets/images/logo.svg" alt="">
        <img class="w-18" src="../assets/images/musi.svg" alt="">
      </div>
      <slot>
      </slot>
    </div>
</template>

<style scoped>
.page{
  @apply h-screen bg-e-sidebar-bg flex flex-col items-center py-4
}
</style>