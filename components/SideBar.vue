<template>
    <div class="sidebar">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">expand</el-radio-button>
        <el-radio-button :label="true">collapse</el-radio-button>
        </el-radio-group>
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
        >
        <el-menu-item index="1">
            <el-icon><ElIconHouse /></el-icon>
            <template #title>Home</template>
        </el-menu-item>
        <el-menu-item index="2">
            <el-icon><ElIconStar/></el-icon>
            <template #title>Favorites</template>
        </el-menu-item>
        <el-menu-item index="3">
            <el-icon><icon-menu /></el-icon>
            <template #title>Playlist</template>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <template #title>Settings</template>
        </el-menu-item>
        </el-menu>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
  } from '@element-plus/icons-vue'
  
  const isCollapse = ref(true)
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script>
  
  <style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  </style>
  