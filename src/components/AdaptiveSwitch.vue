<script setup lang="ts">
import { useAdaptive } from '../composables/useAdaptive'

const { size, policy, width } = useAdaptive()
</script>

<template>
  <slot
    v-if="size === 'compact'"
    name="compact"
    :size="size"
    :policy="policy"
    :width="width"
  >
    <slot :size="size" :policy="policy" :width="width" />
  </slot>

  <slot
    v-else-if="size === 'medium'"
    name="medium"
    :size="size"
    :policy="policy"
    :width="width"
  >
    <slot :size="size" :policy="policy" :width="width" />
  </slot>

  <slot
    v-else
    name="expanded"
    :size="size"
    :policy="policy"
    :width="width"
  >
    <slot :size="size" :policy="policy" :width="width" />
  </slot>
</template>
