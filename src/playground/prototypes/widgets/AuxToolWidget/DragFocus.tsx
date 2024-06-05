import { observer } from '@formily/reactive-vue'
import { IconWidget } from '../IconWidget'
import { useOperation, usePrefix } from '../../hooks'
import { ElButton as Button } from 'element-plus'
import { composeExport } from '@cps/__builtins__'
import { defineComponent } from 'vue'

// export interface IDragFocusProps {
//   node: TreeNode
//   style?: React.CSSProperties
// }

const DragFocusComponent = observer(
  defineComponent({
    name: 'DragFocus',
    props: ['node'],
    setup(props) {
      const operationRef = useOperation()
      const prefixRef = usePrefix('aux-focus')
      return () => {
        if (props.node === props.node.root) return null
        return (
          <Button
            class={prefixRef.value}
            type="primary"
            onClick={() => {
              operationRef.value.switchFocusNode(props.node)
            }}
          >
            <IconWidget
              {...{
                infer:
                  operationRef.value.focusNode === props.node
                    ? 'Move'
                    : 'Focus',
              }}
            />
          </Button>
        )
      }
    },
  })
)

export const DragFocus = composeExport(DragFocusComponent, {
  displayName: 'DragFocus',
})
