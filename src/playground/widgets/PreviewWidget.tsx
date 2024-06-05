import { transformToSchema } from '@designable/formily-transformer'
import { createForm, Form as IForm } from '@formily/core'
import { Form } from '@cps'
import * as UILib from '@cps'
import { connect, createSchemaField, mapProps } from '@formily/vue'
import { shallowRef, defineComponent, computed } from 'vue'
import { Card, Text, Rate, Slider, TreeSelect } from '@pg/renderer'

const { SchemaField } = createSchemaField({
  components: {
    ...UILib,
    Card,
    Text,
    Rate,
    Slider,
    TreeSelect,
    Password: connect(UILib.Input, mapProps({}, (args) => ({ ...args, type: 'password', showPassword: true })))
  },
})

export default defineComponent({
  name: 'PreviewWidget',
  props: ['tree'],
  setup(props) {
    const formRef = shallowRef<IForm>(createForm())
    const treeSchemaRef = computed(() => {
      return transformToSchema(props.tree)
    })

    return () => {
      const form = formRef.value
      const { form: formProps, schema } = treeSchemaRef.value
      return (
        <div style={{ height: '100%', width: '100%', overflowY: 'auto', background: 'var(--dn-composite-panel-tabs-content-bg-color)' }}>
          <Form previewTextPlaceholder={" "} form={form} {...formProps}>
            <SchemaField schema={schema} />
          </Form>
        </div>
      )
    }
  },
})
