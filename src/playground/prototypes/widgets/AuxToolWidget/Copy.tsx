import { useOperation, usePrefix } from '../../hooks'
import { IconWidget } from '../IconWidget'
import { ElButton } from 'element-plus'
import { defineComponent } from 'vue'
import { useStyle } from '@pg/prototypes'
import { composeExport } from '@cps/__builtins__'

// export interface ICopyProps {
//   node: TreeNode
//   style?: React.CSSProperties
// }

const CopyComponent = defineComponent({
  name: 'CopyComponent',
  props: ['node'],
  setup(props) {
    const operationRef = useOperation()
    const prefixRef = usePrefix('aux-copy')
    const style = useStyle()
    return () => {
      if (props.node === props.node.root) return null
      return (
        <ElButton
          class={prefixRef.value}
          style={style}
          onClick={() => {
            operationRef.value.cloneNodes([props.node])
          }}
        >
          <IconWidget infer="Clone" />
        </ElButton>
      )
    }
  },
})

export const Copy = composeExport(CopyComponent, { displayName: 'Copy' })
