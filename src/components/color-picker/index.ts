import { transformComponent } from '../__builtins__'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { ElColorPicker } from 'element-plus'
import { PreviewText } from '../preview-text'

export type ElColorPickerProps = typeof ElColorPicker

const TransformColorPickerProps = transformComponent<ElColorPickerProps>(
    ElColorPicker,
  {
    change: 'update:modelValue',
  }
)

export const ColorPicker = connect(
    TransformColorPickerProps,
  mapProps(
    {
      value: 'modelValue',
      readOnly: 'readonly',
    },
    (props) => {
      let controlsPosition = 'right'
      if (props.controlsPosition) {
        controlsPosition = props.controlsPosition
      }
      return {
        controlsPosition,
        modelValue: props.modelValue,
      }
    }
  ),
  mapReadPretty(PreviewText.Input)
)

export default ColorPicker