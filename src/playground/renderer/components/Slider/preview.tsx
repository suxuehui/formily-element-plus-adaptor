import { ElSlider as ASlider } from 'element-plus'
import { composeExport, transformComponent } from '@cps/__builtins__'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { createBehavior, createResource } from '@designable/core'

import { AllLocales } from '../../locales'
import { PreviewText } from '@cps'


const TransformSlider = transformComponent(ASlider, {
  change: 'updatev-model:value',
})

const InnerSlider = connect(
  TransformSlider,
  mapProps({
    value: 'modelValue',
    readOnly: 'readonly',
  }),
  mapReadPretty(PreviewText.Input)
)

export const Slider = composeExport(
  InnerSlider,
  {
    Behavior: createBehavior({
      name: 'Slider',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'Slider',
      designerProps: {
        // propsSchema: createFieldSchema(AllSchemas.Slider),
      },
      designerLocales: AllLocales.Slider,
    }),
    Resource: createResource({
      icon: 'SliderSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'number',
            title: 'Slider',
            'x-decorator': 'FormItem',
            'x-component': 'Slider',
          },
        },
      ],
    }),
  }
)
