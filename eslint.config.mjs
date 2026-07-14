// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "vue/no-v-html": "off",
      "vue/no-multiple-template-root": "off",
      "vue/multi-word-component-names": "off",
      "import/first": "off",
      "vue/html-self-closing": "off",
    },
  },
]);
