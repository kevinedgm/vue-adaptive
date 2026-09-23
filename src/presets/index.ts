import type { AdaptivePolicy } from '../types'

export const adaptivePresets = {
  'native-detail': {
    compact: { navigation: 'bottom', layout: 'single', overlay: 'bottom-sheet', density: 'comfortable' },
    medium: { navigation: 'rail', layout: 'split', overlay: 'dialog', density: 'comfortable' },
    expanded: { navigation: 'sidebar', layout: 'master-detail', overlay: 'popover', density: 'normal' },
  },
  directory: {
    compact: { navigation: 'bottom', layout: 'single', overlay: 'bottom-sheet', density: 'comfortable' },
    medium: { navigation: 'rail', layout: 'grid', overlay: 'dialog', density: 'comfortable' },
    expanded: { navigation: 'sidebar', layout: 'grid', overlay: 'inline', density: 'normal' },
  },
  form: {
    compact: { navigation: 'bottom', layout: 'single', overlay: 'bottom-sheet', density: 'comfortable' },
    medium: { navigation: 'rail', layout: 'centered', overlay: 'dialog', density: 'comfortable' },
    expanded: { navigation: 'sidebar', layout: 'centered', overlay: 'popover', density: 'normal' },
  },
  dashboard: {
    compact: { navigation: 'bottom', layout: 'single', overlay: 'bottom-sheet', density: 'comfortable' },
    medium: { navigation: 'rail', layout: 'grid', overlay: 'dialog', density: 'normal' },
    expanded: { navigation: 'sidebar', layout: 'grid', overlay: 'inline', density: 'compact' },
  },
  settings: {
    compact: { navigation: 'bottom', layout: 'single', overlay: 'bottom-sheet', density: 'comfortable' },
    medium: { navigation: 'rail', layout: 'split', overlay: 'dialog', density: 'comfortable' },
    expanded: { navigation: 'sidebar', layout: 'split', overlay: 'popover', density: 'normal' },
  },
} satisfies Record<string, AdaptivePolicy>

export type AdaptivePresetName = keyof typeof adaptivePresets
