
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',

    // for making component single word
    'vue/multi-word-component-names': 'off',
  },
})
