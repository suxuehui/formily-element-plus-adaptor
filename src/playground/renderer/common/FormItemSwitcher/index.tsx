import { Switch } from '@cps'
import { defineComponent } from 'vue'

export interface IFormItemSwitcherProps {
  value?: string
  // onChange?: (value: string) => void
}

export const FormItemSwitcher = defineComponent({
  props: { value: {} },
  setup(props, { emit }) {
    return () => {
      return (
        <Switch
          // checked={props.value === 'FormItem'}
          {...{
            "onUpdate:modelValue": (value) => {
              emit('change', value)
            }
          }}
        />
      )
    }
  },
})
