import { ElRadio, ElButton } from 'element-plus';
import { defineComponent, onMounted, ref } from 'vue';
import { loadInitialSchema, saveSchema } from '../service';
import { GlobalRegistry } from '@designable/core';
import {TextWidget, useDesigner} from '@pg/prototypes';

const RadioGroup = ElRadio.RadioGroup
const RadioButton = ElRadio.RadioButton

export default defineComponent({
    name: 'ActionsWidget',
    setup() {
        const language = ref(String.prototype.toLocaleLowerCase.call(GlobalRegistry.getDesignerLanguage()))
        const handleChangeLanguage = value => {
            language.value = value;
            GlobalRegistry.setDesignerLanguage(value);
        }
        const handleSaveSchema = () => {
            saveSchema(designerRef.value)
        }
        const designerRef = useDesigner()
        onMounted(() => {
            loadInitialSchema(designerRef.value)
        })
        return () => {
            return (
                <div class="dn-actions-widget">
                    <RadioGroup v-model={language.value} onChange={ handleChangeLanguage } size="small">
                        <RadioButton value="zh-cn">简体中文</RadioButton>
                        <RadioButton value="en-us">English</RadioButton>
                    </RadioGroup>
                    <ElButton class="btn-save" onClick={ handleSaveSchema }><TextWidget>save</TextWidget></ElButton>
                    <ElButton onClick={ handleSaveSchema } type="primary"><TextWidget>publish</TextWidget></ElButton>
                </div>
            )
        }
    }
})
