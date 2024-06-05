import { ElInput as Input, 
  //ColorPicker 
} from 'element-plus'
import { ColorPicker } from '@cps';
import { usePrefix } from '@pg/prototypes'
import './styles.less'
import { defineComponent } from 'vue'

export interface IColorInputProps {
  value?: string
  onChange?: (color: string) => void
}

export const ColorInput = defineComponent({
  props: ['value'],
  emits: ['change'],
  setup(props, { emit }) {
    const prefixRef = usePrefix('color-input')
    return () => {
      return (
        <div class={prefixRef.value}>
          <Input
            v-model:value={props.value}
            placeholder="Color"
            {...{
              'onUpdate:modelValue': (e) => {
                emit('change', e)
              }
            }}
            v-slots={{
              suffix: () => {
                return (
                  <ColorPicker
                    v-model:value={props.value}
                    {...{
                      'onUpdate:modelValue': (e) => {
                        emit('change', e)
                      }
                    }}
                  />
                )
              }
            }}
          />
        </div>
      )
    }
  },
})
