<template>
  <div class="sidebar w-1/6 min-w-max h-screen pt-3 px-5 bg-e-sidebar-bg shrink-0">
    <div>
      <div class="logo flex items-center">
        <img class="w-12" src="../assets/images/logo.svg" alt="">
        <img class="w-14" src="../assets/images/musi.svg" alt="">
      </div>
      <!-- <div class="search text-e-grey mr-5">
        <Icon name="ri:search-line" size="1.3em"/>
      </div> -->
    </div>
    
    <div>
      <nav>
        <ul class=" flex flex-col gap-5 text-e-grey pl-5 mt-5">
          <li>
            <NuxtLink to="/" class="flex items-center gap-3 cursor-pointer hover:text-white">
              <Icon name="ri:home-fill" />
              <span>Home</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/albums" class="flex items-center gap-3 cursor-pointer hover:text-white">
              <Icon name="ri:album-fill" />
              <span>Album</span>
            </NuxtLink>
          </li>
          <!-- <li>
            <NuxtLink  class="flex items-center gap-3 cursor-pointer hover:text-white">
              <Icon name="ri:music-fill" />
              <span>Tracks</span>
            </NuxtLink>
          </li> -->
          <li>
            <NuxtLink to="/genres" class="flex items-center gap-3 cursor-pointer hover:text-white">
              <Icon name="ri:gradienter-line" />
              <span>Genres</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="flex items-center gap-3 cursor-pointer hover:text-white">
              <Icon name="ri:play-circle-fill" />
              <span>Playlist</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/artists" class="flex items-center gap-3 cursor-pointer hover:text-white">
              <Icon name="ri:user-fill" />
              <span>Artist</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/favorites" class="flex items-center gap-3 cursor-pointer hover:text-white">
              <Icon name="ri:heart-fill" />
              <span>Favorites</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="flex items-center gap-3 cursor-pointer hover:text-white">
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
.router-link-active {
  color: #FF7A01
}
</style>