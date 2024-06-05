import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '../'

import { ElTreeSelect } from 'element-plus'
import { transformComponent } from '../__builtins__'

export type TreeSelectProps = typeof ElTreeSelect

const TransformTreeSelect = transformComponent<TreeSelectProps>(ElTreeSelect, {
  change: 'update:modelValue',
})

export const TreeSelect = connect(
  TransformTreeSelect,
  mapProps({ value: 'modelValue', readOnly: 'readonly' }),
  mapReadPretty(PreviewText.Select)
)

export default TreeSelect