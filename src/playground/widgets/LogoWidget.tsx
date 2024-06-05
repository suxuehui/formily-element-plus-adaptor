import { defineComponent } from 'vue'
export default defineComponent({
    name: 'LogoWidget',
    setup(props) {
        return () => {
            return (
                <div class="logo-container">
                    <a href="javascript:void(0)">
                        <img class="logo" src="https://element-plus.org/images/element-plus-logo.svg" alt="ElementPlus Logo" />
                    </a>
                </div>
            )
        }
    }
})