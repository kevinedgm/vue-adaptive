import type { InjectionKey, Ref } from 'vue'

export type AdaptiveSize = 'compact' | 'medium' | 'expanded'
export type NavigationMode = 'bottom' | 'rail' | 'sidebar' | 'none'
export type LayoutMode = 'single' | 'split' | 'master-detail' | 'centered' | 'grid' | 'custom'
export type OverlayMode = 'bottom-sheet' | 'dialog' | 'popover' | 'inline'
export type DensityMode = 'comfortable' | 'normal' | 'compact'

export interface AdaptiveBreakpoints {
  compactMax: number
  mediumMax: number
}

export interface AdaptiveScale {
  heading: number
  text: number
  space: number
}

export interface AdaptiveModePolicy {
  navigation?: NavigationMode
  layout?: LayoutMode
  overlay?: OverlayMode
  density?: DensityMode
  [key: string]: unknown
}

export type AdaptivePolicy = Record<AdaptiveSize, AdaptiveModePolicy>
export type AdaptivePolicyInput = Partial<Record<AdaptiveSize, AdaptiveModePolicy>>

export interface AdaptiveContext {
  width: Readonly<Ref<number>>
  size: Readonly<Ref<AdaptiveSize>>
  policy: Readonly<Ref<AdaptiveModePolicy>>
  compact: Readonly<Ref<boolean>>
  medium: Readonly<Ref<boolean>>
  expanded: Readonly<Ref<boolean>>
}

export const ADAPTIVE_CONTEXT_KEY: InjectionKey<AdaptiveContext> = Symbol('vue-adaptive-context')
