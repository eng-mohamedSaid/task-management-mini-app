<script setup lang="ts">
const { t, locale, setLocale } = useI18n()

const nextLocale = computed(() => (locale.value === 'en' ? 'ar' : 'en'))
</script>

<template>
  <div class="mx-auto max-w-2xl space-y-6 text-center">
    <h1 class="text-title uppercase">{{ t('app.title') }}</h1>

    <p class="text-paragraph text-ink-muted">{{ t('state.empty') }}</p>

    <button
      type="button"
      class="text-button rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-hover"
      @click="setLocale(nextLocale)"
    >
      {{ nextLocale === 'ar' ? 'العربية' : 'English' }}
    </button>
  </div>
</template>
