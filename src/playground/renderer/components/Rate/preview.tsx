import { ElRate as ARate } from 'element-plus'
import { composeExport, transformComponent } from '@cps/__builtins__'
import { connect, mapProps } from '@formily/vue'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@pg/prototypes'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { VNode } from 'vue'

const RateInner = connect(transformComponent(ARate, {
  change: 'onUpdate:modelValue'
}), mapProps({ value: 'modelValue' }))

export const Rate: DnFC<VNode> = composeExport(RateInner, {
  Behavior: createBehavior({
    name: 'Rate',
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === 'Rate',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Rate),
    },
    designerLocales: AllLocales.Rate,
  }),
  Resource: createResource({
    icon: 'RateSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'number',
          title: 'Rate',
          'x-decorator': 'FormItem',
          'x-component': 'Rate',
        },
      },
    ],
  }),
})
