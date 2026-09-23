<script setup lang="ts">
import { Adaptive, AdaptiveSwitch } from '@kevinedgm/vue-adaptive'
import BottomNavigation from './BottomNavigation.vue'
import NavigationRail from './NavigationRail.vue'
import Sidebar from './Sidebar.vue'
</script>

<template>
  <Adaptive preset="native-detail">
    <div class="app-shell">
      <AdaptiveSwitch>
        <template #compact><BottomNavigation /></template>
        <template #medium><NavigationRail /></template>
        <template #expanded><Sidebar /></template>
      </AdaptiveSwitch>

      <main>
        <RouterView />
      </main>
    </div>
  </Adaptive>
</template>
