import { Transfer as FormilyTransfer } from '@cps'
import { composeExport } from '@cps/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@pg/prototypes'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { VNode } from 'vue'

export const Transfer: DnFC<VNode> =
  composeExport(FormilyTransfer, {
    Resource: createResource({
      icon: 'TransferSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            title: 'Transfer',
            'x-decorator': 'FormItem',
            'x-component': 'Transfer',
          },
        },
      ],
    }),
    Behavior: createBehavior({
      name: 'Transfer',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'Transfer',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.Transfer),
      },
      designerLocales: AllLocales.Transfer,
    }),
  })
