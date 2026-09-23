<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { DEFAULT_BREAKPOINTS, DEFAULT_SCALES, normalizePolicy, resolveAdaptiveSize, resolveModePolicy } from '../core/resolve'
import { adaptivePresets, type AdaptivePresetName } from '../presets'
import { ADAPTIVE_CONTEXT_KEY, type AdaptiveBreakpoints, type AdaptivePolicyInput, type AdaptiveScale, type AdaptiveSize } from '../types'

const props = withDefaults(defineProps<{
  as?: string
  preset?: AdaptivePresetName
  policy?: AdaptivePolicyInput
  breakpoints?: Partial<AdaptiveBreakpoints>
  scales?: Partial<Record<AdaptiveSize, Partial<AdaptiveScale>>>
  initialWidth?: number
}>(), {
  as: 'div',
  initialWidth: 1024,
})

const root = ref<HTMLElement | null>(null)
const width = ref(props.initialWidth)
let observer: ResizeObserver | undefined

const breakpoints = computed<AdaptiveBreakpoints>(() => ({
  ...DEFAULT_BREAKPOINTS,
  ...props.breakpoints,
}))

const size = computed(() => resolveAdaptiveSize(width.value, breakpoints.value))

const normalizedPolicy = computed(() => {
  const preset = props.preset ? adaptivePresets[props.preset] : undefined
  return normalizePolicy({
    ...preset,
    ...props.policy,
  })
})

const currentPolicy = computed(() => resolveModePolicy(normalizedPolicy.value, size.value))
const compact = computed(() => size.value === 'compact')
const medium = computed(() => size.value === 'medium')
const expanded = computed(() => size.value === 'expanded')

const scale = computed<AdaptiveScale>(() => ({
  ...DEFAULT_SCALES[size.value],
  ...props.scales?.[size.value],
}))

const adaptiveStyle = computed(() => ({
  '--adaptive-heading-scale': String(scale.value.heading),
  '--adaptive-text-scale': String(scale.value.text),
  '--adaptive-space-scale': String(scale.value.space),
}))

provide(ADAPTIVE_CONTEXT_KEY, {
  width,
  size,
  policy: currentPolicy,
  compact,
  medium,
  expanded,
})

onMounted(() => {
  if (!root.value || typeof ResizeObserver === 'undefined') return

  observer = new ResizeObserver(([entry]) => {
    if (entry) width.value = entry.contentRect.width
  })

  observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <component
    :is="as"
    ref="root"
    class="adaptive"
    :data-adaptive="size"
    :data-adaptive-navigation="currentPolicy.navigation"
    :data-adaptive-layout="currentPolicy.layout"
    :data-adaptive-overlay="currentPolicy.overlay"
    :data-adaptive-density="currentPolicy.density"
    :style="adaptiveStyle"
  >
    <slot
      :size="size"
      :width="width"
      :policy="currentPolicy"
      :compact="compact"
      :medium="medium"
      :expanded="expanded"
    />
  </component>
</template>

<style scoped>
.adaptive {
  width: 100%;
  min-width: 0;
  container-type: inline-size;
}
</style>
