import { Engine } from '@designable/core'
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'
import { ElMessage } from 'element-plus'

export const saveSchema = (designer: Engine) => {
  const schema = transformToSchema(designer.getCurrentTree());
  localStorage.setItem(
    'formily-schema',
    JSON.stringify(schema)
  )
  ElMessage({
    message: 'Save Success',
    type: 'success',
  });
}

export const loadInitialSchema = (designer: Engine) => {
  try {
    const tree = transformToTreeNode(
      JSON.parse(localStorage.getItem('formily-schema'))
    )
    designer.setCurrentTree(tree)
  } catch (err) { }
}
