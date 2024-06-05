import { ElCard as ACard } from 'element-plus'
import { composeExport } from '@cps/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@pg/prototypes'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { defineComponent, VNode } from 'vue'
import { useStyle } from '@pg/prototypes'

export const Card: DnFC<VNode> = composeExport(
  defineComponent({
    props: { title: {} },
    setup(props, { slots }) {
      const style = useStyle()
      return () => {
        return (
          <ACard {...props} style={style} v-slots={{
            header: () => (
              <span data-content-editable="x-component-props.title">
                {props.title}
              </span>
            )
          }}>
            {slots.default?.()}
          </ACard>
        )
      }
    },
  }),
  {
    Behavior: createBehavior({
      name: 'Card',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'Card',
      designerProps: {
        droppable: true,
        propsSchema: createVoidFieldSchema(AllSchemas.Card),
      },
      designerLocales: AllLocales.Card,
    }),
    Resource: createResource({
      icon: 'CardSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Card',
            'x-component-props': {
              title: 'Title',
            },
          },
        },
      ],
    }),
  }
)
