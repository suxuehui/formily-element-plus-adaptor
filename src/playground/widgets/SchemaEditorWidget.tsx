//json编辑器

import { defineComponent, ref, watch } from 'vue'
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'
import {MonacoInput} from '@pg/settings-form'
export default defineComponent({
  name: 'SchemaEditorWidget',
  props: ['tree'],
  setup(props, { emit }) {
    const transformCode = value => {
      return JSON.stringify(transformToSchema(value), null, 2)
    }
    const code = ref(transformCode(props.tree))
    let timer: any = null
    const handleEmitChanges = (value) => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      timer = setTimeout(() => {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        emit('change', transformToTreeNode(JSON.parse(value)))
      }, 1000)
    }

    watch(() => props.tree, (newVal) => {
      code.value = transformCode(newVal)
    })

    return () => {
      return (
        <MonacoInput
          v-model={code.value}
          onChange={ handleEmitChanges }
          lang="json"></MonacoInput>
      )
    }
  },
})
