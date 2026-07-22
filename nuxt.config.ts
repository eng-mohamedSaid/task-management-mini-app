import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/eslint'],

  css: ['~/assets/css/main.css'],

  // Tailwind v4 is configured in CSS (@theme), so the Vite plugin is the
  // entire integration — no tailwind.config.js, no PostCSS chain.
  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    defaultLocale: 'en',
    // `dir` is consumed by the layout to set <html dir>, which is what makes
    // Tailwind's logical utilities (ps-/pe-/ms-/me-) mirror in Arabic.
    locales: [
      { code: 'en', name: 'English', dir: 'ltr', file: 'en.json' },
      { code: 'ar', name: 'العربية', dir: 'rtl', file: 'ar.json' },
    ],
    // The language is a user preference, not a separate page, so we keep one
    // URL per route and persist the choice in a cookie. Switch to
    // 'prefix_except_default' if shareable per-language URLs are ever needed.
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'todo_locale',
      redirectOn: 'root',
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  typescript: {
    strict: true,
  },

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A simple task management application.' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Cairo:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },
})
