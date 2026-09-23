<script setup lang="ts">
import { computed } from 'vue'
import { useAdaptive } from '../composables/useAdaptive'

const props = withDefaults(defineProps<{
  compact?: 'list' | 'detail'
}>(), {
  compact: 'list',
})

const { size } = useAdaptive()
const isSingle = computed(() => size.value === 'compact')
</script>

<template>
  <div class="adaptive-pane" :data-size="size">
    <template v-if="isSingle">
      <slot v-if="compact === 'list'" name="list" />
      <slot v-else name="detail" />
    </template>

    <template v-else>
      <section class="adaptive-pane__list">
        <slot name="list" />
      </section>
      <section class="adaptive-pane__detail">
        <slot name="detail" />
      </section>
    </template>
  </div>
</template>

<style scoped>
.adaptive-pane {
  min-width: 0;
}

.adaptive-pane[data-size='medium'],
.adaptive-pane[data-size='expanded'] {
  display: grid;
  grid-template-columns: minmax(240px, 0.8fr) minmax(0, 1.4fr);
  gap: calc(16px * var(--adaptive-space-scale, 1));
}

.adaptive-pane[data-size='expanded'] {
  grid-template-columns: minmax(280px, 360px) minmax(0, 1fr);
}

.adaptive-pane__list,
.adaptive-pane__detail {
  min-width: 0;
}
</style>
