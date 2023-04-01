<template>
    <div class='bar flex absolute bottom-0 bg-e-blackLight w-full py-3 px-5 justify-between'>
        <div class="flex items-center gap-4">
            <div class="song-image bg-orange-600 w-10 h-10"></div>
            <div class="song-details">
                <div class="title text-white">Therefore I Am</div>
                <div class="artist text-e-grey">Billie Eilish</div>
            </div>
        </div>
        <div>
            <MusicPlayer />
        </div>
        <div class="options text-e-grey flex text-center gap-3 text-sm">
            <div class="repeat">
                <Icon name="ri:repeat-line"/>
                <p>Repeat</p>
            </div>
            <div class="shuffle">
                <Icon name="ri:shuffle-fill" />
                <p>Shuffle</p>
            </div>
            <div class="like">
                <Icon name="ri:heart-fill" />
                <p>Like</p>
            </div>
            <div class="playlist">
                <Icon name="ri:play-list-add-line" />
                <p>Playlist</p>
            </div>
            <div class="volume">
                <Icon name="ri:volume-up-line" />
                <p>Volume</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>