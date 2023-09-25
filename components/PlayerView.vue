<template>
    <div class="absolute w-full h-screen bg-white top-0 bottom-0 flex justify-center py-16 flex-col items-center">
        <div>
            <div class=" bg-slate-500 rounded-md w-80 h-72 m-auto"></div>

            <div class="text-center my-5">
                <h3 class="title text-e-orange font-semibold">Alone</h3>
                <p class="artist">Color out</p>
            </div>

            <div class="options text-e-grey flex text-center gap-3 text-sm justify-center">
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

            <div>
                <MusicPlayer />
            </div>
        </div>

        <div class="w-fit text-center mt-32 m-auto">
            <p class="w-52">Close Full View</p>
            <Icon name="mdi:chevron-down" size="2em" />
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>