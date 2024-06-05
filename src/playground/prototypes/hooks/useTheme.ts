import { computed, inject, ref, ComputedRef } from 'vue'
import { DesignerLayoutSymbol } from '../context'
import { IDesignerLayoutContext } from '../types'

export const useTheme = (): ComputedRef<IDesignerLayoutContext['theme']> => {
  return computed(
    () =>
      window['__DESINGER_THEME__'] ||
      inject(DesignerLayoutSymbol, ref()).value?.theme
  )
}
