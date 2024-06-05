import { defineComponent, ref, watch } from 'vue'
import { TreeNode } from '@designable/core'
import { isEmpty, isPlainObj } from '@formily/shared'
import {MonacoInput} from '@pg/settings-form'
const transformToMarkupSchemaCode = (tree: TreeNode) => {
  const printAttribute = (node: TreeNode) => {
    if (!node) return ''
    const props = {...node.props}
    if (node.depth !== 0) {
      props.name = node.props?.name || node.id
    }
    return `${Object.keys(props)
      .map((key) => {
        if (
          key === 'x-designable-id' ||
          key === 'x-designable-source-name' ||
          key === '_isJSONSchemaObject' ||
          key === 'version' ||
          key === 'type'
        )
          return ''
        const value = props[key]
        if (isPlainObj(value) && isEmpty(value)) return ''
        if (typeof value === 'string') return `${key}="${value}"`
        return `${key}={${JSON.stringify(value)}}`
      })
      .join(' ')}`
  }
  const printChildren = (node: TreeNode) => {
    if (!node) return ''
    return node.children
      .map((child) => {
        return printNode(child)
      })
      .join('')
  }
  const printTag = (node: TreeNode) => {
    if (node.props?.type === 'string') return 'SchemaField.String'
    if (node.props?.type === 'number') return 'SchemaField.Number'
    if (node.props?.type === 'boolean') return 'SchemaField.Boolean'
    if (node.props?.type === 'date') return 'SchemaField.Date'
    if (node.props?.type === 'datetime') return 'SchemaField.DateTime'
    if (node.props?.type === 'array') return 'SchemaField.Array'
    if (node.props?.type === 'object') return 'SchemaField.Object'
    if (node.props?.type === 'void') return 'SchemaField.Void'
    return 'SchemaField.Markup'
  }
  const printNode = (node: TreeNode) => {
    if (!node) return ''
    return `<${printTag(node)} ${printAttribute(node)} ${
      node.children.length
        ? `>${printChildren(node)}</${printTag(node)}>`
        : '/>'
    }`
  }
  const root = tree.find((child) => {
    return child.componentName === 'Form' || child.componentName === 'Root'
  })
  return `import { defineComponent } from 'vue'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import {
  Form,
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayCards,
} from '@formily/element-plus'
import { ElCard as Card, ElSlider as Slider, ElRate as Rate } from 'element-plus'

// const Text: React.FC<{
//   value?: string
//   content?: string
//   mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p'
// }> = ({ value, mode, content, ...props }) => {
//   const tagName = mode === 'normal' || !mode ? 'div' : mode
//   return React.createElement(tagName, props, value || content)
// }

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayCards,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,
  },
})

export default defineComponent({
  setup() {
    const form = createForm()
    return <FormProvider form={form} ${printAttribute(root)}>
      <SchemaField>
        ${printChildren(root)}
      </SchemaField>
    </FormProvider>
  }
})
  
`
}
export default defineComponent({
  name: 'MarkupSchemaWidget',
  props: ['tree'],
  setup(props) {
    const code = ref(transformToMarkupSchemaCode(props.tree))
    watch(() => props.tree, (newVal) => {
      code.value = transformToMarkupSchemaCode(newVal)
    })
    return () => (
      <MonacoInput
        v-model={code.value}
        readOnly={true}
        lang="typescript"
      />
    )
  }
})
