import { defineComponent, toRaw, ref, watch, computed, onMounted, onUnmounted, nextTick } from 'vue'
import * as monaco from 'monaco-editor'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import './styles.less'

// @ts-ignore
self.MonacoEnvironment = {
    getWorker: function (_: string, label: string) {
        switch (label) {
            case 'json':
                return new jsonWorker()
            case 'ts':
            case 'typescript':
            case 'javascript':
                return new tsWorker();
            case 'css':
                return new cssWorker();
            case 'html':
                return new htmlWorker()
        }
        return new editorWorker()
    },
}
export const MonacoInput = defineComponent({
    name: 'MonacoInput',
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        theme: {
            type: String,
            default: 'vs'
        },
        lang: {
            type: String,
            default: 'json'
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        options: {
            type: Object,
            default: () => {}
        }
    },
    emits: ['update:modelValue', 'change', 'ctrlS'],
    setup(props, {emit}) {
        const editor = ref();
        const monacoInput = ref();
        const defaultOptions = {
            value: props.modelValue, // 编辑器的值
            language: props.lang, //语言
            theme: props.theme, // 编辑器主题：vs, hc-black, or vs-dark
            readOnly: props.readOnly, // 是否只读
            autoIndent: true, // 自动缩进
            automaticLayout: true, //
            renderSideBySide: false, //
        }
        const editorConstructionOptions: any = computed(() => {
            return Object.assign(defaultOptions, props.options)
        })
        const editorInstance = computed(() => toRaw(editor.value))
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault() // 阻止浏览器默认的保存操作
                // 执行调试
                emit('ctrlS')
            }
        }
        const createMonacoEditor = () => {
            // 创建 monacoEditor 对象
            try {
                editor.value = monaco.editor.create(monacoInput.value, editorConstructionOptions.value)
                editorInstance.value?.onDidChangeModelContent(() => {
                    const text = editorInstance.value?.getValue()
                    emit('update:modelValue', text)
                    emit('change', text)
                })
            } catch(e) {
                console.error(e)
            }
        }
        const handleReSize = () => {
            nextTick(() => {
                editorInstance.value?.layout()
            })
        }
        onMounted(() => {
            self?.addEventListener('keydown', handleKeyDown)
            self?.addEventListener("resize", handleReSize)
            createMonacoEditor()
        })
        onUnmounted(() => {
            editorInstance.value?.dispose()
            self?.removeEventListener('keydown', handleKeyDown)
            self?.removeEventListener("resize", handleReSize)
        })
        watch(() => props.modelValue, (newVal) => {
            const oldVal = editorInstance.value?.getValue()
            if (oldVal && newVal !== oldVal) {
                editorInstance.value?.setValue(newVal)
            }
        })
        watch(() => props.lang, (newVal) => {
            editorInstance.value?.setModelLanguage(newVal)
        })
        watch(() => props.theme, (newVal) => {
            editorInstance.value?.setTheme(newVal)
        })
        watch(() => props.options, () => {
            nextTick(() => {
                editorInstance.value?.updateOptions(editorConstructionOptions.value)
            })
        }, {deep: true})
        return () => (
            <div ref={monacoInput} class="monaco-input"></div>
        )
    }
})
