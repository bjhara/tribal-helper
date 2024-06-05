import pluginVue from 'eslint-plugin-vue'
import js from '@eslint/js'

export default [
    {
        ignores: ['**/assets/presets'],
    },
    js.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    {
        files: ['src/pages/**/*.vue'],
        rules: {
            'vue/multi-word-component-names': "off",
        },
    },
]
