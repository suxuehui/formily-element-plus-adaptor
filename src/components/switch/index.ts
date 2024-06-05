import { connect, mapProps } from '@formily/vue'

import { ElSwitch } from 'element-plus'

export type SwitchProps = typeof ElSwitch

export const Switch = connect(ElSwitch, mapProps({ readOnly: 'readonly', value: 'modelValue' }))

export default Switch
