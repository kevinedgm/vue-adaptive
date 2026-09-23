import { describe, expect, it } from 'vitest'
import { adaptivePresets, normalizePolicy, resolveAdaptiveSize, resolveModePolicy } from '../src'

describe('resolveAdaptiveSize', () => {
  it('maps available width to semantic size classes', () => {
    expect(resolveAdaptiveSize(390)).toBe('compact')
    expect(resolveAdaptiveSize(768)).toBe('medium')
    expect(resolveAdaptiveSize(1024)).toBe('expanded')
  })

  it('accepts custom breakpoints', () => {
    expect(resolveAdaptiveSize(500, { compactMax: 480, mediumMax: 720 })).toBe('medium')
  })
})

describe('adaptive policy', () => {
  it('resolves a preset for the current size', () => {
    const policy = normalizePolicy(adaptivePresets['native-detail'])
    expect(resolveModePolicy(policy, 'compact').navigation).toBe('bottom')
    expect(resolveModePolicy(policy, 'expanded').layout).toBe('master-detail')
  })
})
