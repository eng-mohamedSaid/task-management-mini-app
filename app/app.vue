<script setup lang="ts">
const { t } = useI18n()

// useLocaleHead fot  <html lang> and <html dir> 
const head = useLocaleHead()

useHead(() => ({
  htmlAttrs: head.value.htmlAttrs,
  title: t('app.title'),
}))
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
