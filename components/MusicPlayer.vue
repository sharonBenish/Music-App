<template>
    <div class="flex items-center gap-3">
        <div class="controls text-e-grey flex items-center">
            <div class="prev">
                <Icon name="fad:prev" size="1.5em"/>
            </div>
            <div class="play text-white">
                <Icon name="ri:play-circle-fill" size="2.5em" />
            </div>
            <div class="next">
                <Icon name="fad:next" size="1.5em" />
            </div>
        </div>
        <div class="duration relative">
            <div class="w-80 h-1 bg-e-grey"></div>
            <div class="h-1 min-w-min bg-white absolute top-0 left-0 w-11"></div>
        </div>
        <div class="time text-e-grey text-xs">
            <span class="text-white">1:03</span> / <span>2.56</span>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>