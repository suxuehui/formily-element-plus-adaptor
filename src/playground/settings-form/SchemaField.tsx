import { createSchemaField } from '@formily/vue'
import {
  ColorInput,
  CollapseItem,
  SizeInput,
  DisplayStyleSetter,
  BackgroundStyleSetter,
  BoxShadowStyleSetter,
  FontStyleSetter,
  BoxStyleSetter,
  BorderRadiusStyleSetter,
  BorderStyleSetter,
  ValueInput,
  DrawerSetter,
} from './components'
import * as UIFramework from '@cps';
import { Slider } from '../renderer/components/Slider/preview';
import { FormItemSwitcher } from '../renderer/common/FormItemSwitcher'


const SchemaFields = createSchemaField({
  components: {
    ...UIFramework,
    CollapseItem,
    ColorInput,
    SizeInput,
    DisplayStyleSetter,
    BackgroundStyleSetter,
    BoxShadowStyleSetter,
    FontStyleSetter,
    DrawerSetter,
    BoxStyleSetter,
    BorderRadiusStyleSetter,
    BorderStyleSetter,
    ValueInput,
    Slider,
    FormItemSwitcher
  },
})

export const SchemaField = SchemaFields.SchemaField
