import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { defineComponent, h } from 'vue'
import { PreviewText } from '../preview-text'

import { ElSelect, ElOption } from 'element-plus'
import { resolveComponent, transformComponent } from '../__builtins__'

const valueMap = {
  '继承': 'inherit',
}

export type SelectProps = typeof ElSelect & {
  options?: Array<typeof ElOption>
}

const TransformElSelect = transformComponent<SelectProps>(ElSelect, {
  change: 'update:modelValue',
})

const InnerSelect = connect(
  TransformElSelect,
  mapProps({ value: 'modelValue', readOnly: 'readonly' }),
  mapReadPretty(PreviewText.Select)
)

const SelectOption = defineComponent({
  name: 'FSelect',
  props: ['options'],
  setup(customProps, { attrs, slots }) {
    return () => {
      const options = customProps.options || []
      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option: any) => {
                  if (typeof option === 'string') {
                    return h(
                      ElOption,
                      { key: option, value: option, label: option },
                      {
                        default: () => [
                          resolveComponent(slots?.option, { option }),
                        ],
                      }
                    )
                  } else {
                    if (!option.value) {
                      option.value = valueMap[option.label] || option.label
                    }
                    return h(
                      ElOption,
                      {
                        key: option.value,
                        ...option,
                      },
                      {
                        default: () => [
                          resolveComponent(slots?.option, { option }),
                        ],
                      }
                    )
                  }
                }),
            }
          : slots
      return h(
        InnerSelect,
        {
          ...attrs,
        },
        children
      )
    }
  },
})

export const Select = connect(
  SelectOption,
  mapProps({ dataSource: 'options', loading: true }),
  mapReadPretty(PreviewText.Select)
)

export default Select
