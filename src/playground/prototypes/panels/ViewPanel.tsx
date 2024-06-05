import { observer } from '@formily/reactive-vue'
import {usePrefix, useTree, useWorkbench} from '../hooks'
import { Viewport } from '../containers'
import { defineComponent } from 'vue'
import { ITreeNode } from '@designable/core'

//设计器中间区域画布
const ViewPanelComponent = defineComponent({
  name: 'DnViewPanel',
  props: {
    type: String,
    scrollable: { type: Boolean, default: true },
    dragTipsDirection: { type: String },
  },
  setup(props, { slots }) {
    const workbenchRef = useWorkbench()
    const treeRef = useTree()

    const prefix = usePrefix('view-panel-widget')

    return () => {
      if (workbenchRef.value.type !== props.type) return null

      const render = () => {
        return slots.default?.(treeRef.value, (payload: ITreeNode) => {
          treeRef.value.from(payload)
          treeRef.value.takeSnapshot()
        })
      }

      if (workbenchRef.value.type === 'DESIGNABLE') {
        return (
          <Viewport {...{ dragTipsDirection: props.dragTipsDirection }} >
            {render()}
          </Viewport>
        )
      }

      return (
        <div
          class={prefix.value}
          style={{
            overflow: props.scrollable ? 'overlay' : 'hidden',
            height: '100%',
            cursor: 'auto',
            userSelect: 'text',
          }}
        >
          {render()}
        </div>
      )
    }
  },
})
export const ViewPanel = observer(ViewPanelComponent)
