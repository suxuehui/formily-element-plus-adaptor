import ActionsWidget from './ActionsWidget.tsx'
import SchemaEditorWidget from './SchemaEditorWidget'
import MarkupSchemaWidget from "./MarkupSchemaWidget.tsx"
import PreviewWidget from './PreviewWidget'
import LogoWidget from './LogoWidget'
import { App } from 'vue'
import './styles.less'

export default function install(app: App) {
  app.component('ActionsWidget', ActionsWidget)
  app.component('SchemaEditorWidget', SchemaEditorWidget)
  app.component('MarkupSchemaWidget', MarkupSchemaWidget)
  app.component('PreviewWidget', PreviewWidget)
  app.component('LogoWidget', LogoWidget)
}
