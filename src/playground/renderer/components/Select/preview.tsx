import { Select as FormilySelect } from '@cps'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@pg/prototypes'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { composeExport } from '@cps/__builtins__'
import { VNode } from 'vue'

export const Select: DnFC<VNode> =
  composeExport(FormilySelect, {
    Behavior: createBehavior({
      name: 'Select',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'Select',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.Select),
      },
      designerLocales: AllLocales.Select,
    }),
    Resource: createResource({
      icon: 'SelectSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            title: 'Select',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
          },
        },
      ],
    }),
  })
