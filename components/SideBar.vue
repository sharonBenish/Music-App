<template>
  <div class="sidebar w-1/5 min-w-max h-screen pt-3 px-5 bg-e-background">
    <div class="logo flex items-center">
      <img class="w-18" src="../assets/images/logo.svg" alt="">
      <img class="w-18" src="../assets/images/musi.svg" alt="">
    </div>
    <div>
      <nav>
        <ul class=" flex flex-col gap-5 text-e-grey pl-5 mt-5">
          <li>
            <NuxtLink class="flex items-center gap-3 cursor-pointer">
              <Icon name="ri:home-5-fill" />
              <span>Home</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="flex items-center gap-3 cursor-pointer">
              <Icon name="ri:album-fill" />
              <span>Album</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink  class="flex items-center gap-3 cursor-pointer">
              <Icon name="ri:music-fill" />
              <span>Tracks</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="flex items-center gap-3 cursor-pointer">
              <Icon name="ri:gradienter-line" />
              <span>Genres</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="flex items-cente gap-3 cursor-pointer">
              <Icon name="ri:play-circle-fill" />
              <span>Playlist</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="flex items-center gap-3 cursor-pointer">
              <Icon name="ri:user-fill" />
              <span>Artist</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="flex items-cente gap-3 cursor-pointer">
              <Icon name="ri:settings-3-fill"/>
              <span>Settings</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>