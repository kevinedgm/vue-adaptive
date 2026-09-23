import { inject } from 'vue'
import { ADAPTIVE_CONTEXT_KEY } from '../types'

export function useAdaptive() {
  const context = inject(ADAPTIVE_CONTEXT_KEY)

  if (!context) {
    throw new Error('[vue-adaptive] useAdaptive() must be used inside <Adaptive>.')
  }

  return context
}
