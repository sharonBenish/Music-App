<script setup lang="ts">
const { message, type } = defineProps<{
    message: string
    type: "error" | "success" | "warning"
}>()
</script>

<template>
    <div class="toast-container">
        <div class="toast">
            <Icon name="ep:success-filled" size="1.5em"/>
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<style scoped>
.toast-container{
    @apply absolute top-2 w-full;
}
.toast{
    @apply border-2 border-emerald-400 bg-emerald-100 rounded-md p-4 w-[15rem] mx-auto flex gap-4 items-center text-emerald-600;
}
</style>