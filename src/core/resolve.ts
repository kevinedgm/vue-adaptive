import type {
  AdaptiveBreakpoints,
  AdaptiveModePolicy,
  AdaptivePolicy,
  AdaptivePolicyInput,
  AdaptiveScale,
  AdaptiveSize,
} from '../types'

export const DEFAULT_BREAKPOINTS: AdaptiveBreakpoints = {
  compactMax: 599,
  mediumMax: 899,
}

export const DEFAULT_SCALES: Record<AdaptiveSize, AdaptiveScale> = {
  compact: { heading: 0.82, text: 0.96, space: 0.86 },
  medium: { heading: 0.92, text: 0.985, space: 0.94 },
  expanded: { heading: 1, text: 1, space: 1 },
}

export function resolveAdaptiveSize(
  width: number,
  breakpoints: AdaptiveBreakpoints = DEFAULT_BREAKPOINTS,
): AdaptiveSize {
  if (width <= breakpoints.compactMax) return 'compact'
  if (width <= breakpoints.mediumMax) return 'medium'
  return 'expanded'
}

export function normalizePolicy(input?: AdaptivePolicyInput): AdaptivePolicy {
  return {
    compact: input?.compact ?? {},
    medium: input?.medium ?? {},
    expanded: input?.expanded ?? {},
  }
}

export function resolveModePolicy(
  policy: AdaptivePolicy,
  size: AdaptiveSize,
): AdaptiveModePolicy {
  return policy[size] ?? {}
}
