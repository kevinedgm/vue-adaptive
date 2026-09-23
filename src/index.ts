export { default as Adaptive } from './components/Adaptive.vue'
export { default as AdaptiveSwitch } from './components/AdaptiveSwitch.vue'
export { default as AdaptivePane } from './components/AdaptivePane.vue'
export { useAdaptive } from './composables/useAdaptive'
export { adaptivePresets } from './presets'
export type { AdaptivePresetName } from './presets'
export {
  DEFAULT_BREAKPOINTS,
  DEFAULT_SCALES,
  normalizePolicy,
  resolveAdaptiveSize,
  resolveModePolicy,
} from './core/resolve'
export type {
  AdaptiveBreakpoints,
  AdaptiveContext,
  AdaptiveModePolicy,
  AdaptivePolicy,
  AdaptivePolicyInput,
  AdaptiveScale,
  AdaptiveSize,
  DensityMode,
  LayoutMode,
  NavigationMode,
  OverlayMode,
} from './types'
