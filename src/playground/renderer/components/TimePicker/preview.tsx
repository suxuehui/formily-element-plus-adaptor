import { TimePicker as FormilyTimePicker } from '@cps'
import { composeExport } from '@cps/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@pg/prototypes'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { VNode } from 'vue'

export const TimePicker: DnFC<VNode> =
  composeExport(FormilyTimePicker, {
    Behavior: createBehavior({
      name: 'TimePicker',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'TimePicker',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.TimePicker),
      },
      designerLocales: AllLocales.TimePicker,
    }),
    Resource: createResource({
      icon: 'TimePickerSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'string',
            title: 'TimePicker',
            'x-decorator': 'FormItem',
            'x-component': 'TimePicker',
          },
        },
      ],
    }),
  })
