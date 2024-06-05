import { DroppableWidget } from '@pg/prototypes'
import './styles.less'
import { defineComponent, VNode } from 'vue'

export const Container = defineComponent({
  name: 'DnContainer',
  setup(props, { slots }) {
    return () => {
      return <DroppableWidget v-slots={slots}></DroppableWidget>
    }
  },
})

export const withContainer = (Target: VNode) => {
  return defineComponent({
    setup(props, { attrs, slots }) {
      return () => {
        return (
          <DroppableWidget>
            <Target {...attrs} v-slots={slots} />
          </DroppableWidget>
        )
      }
    },
  })
}
