<script setup lang="ts">
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-canvas">
    <div class="h-12 shrink-0 bg-shell" aria-hidden="true" />

    <main class="flex-1 px-4 py-8 sm:px-6">
      <slot />
    </main>

    <div class="h-12 shrink-0 bg-shell" aria-hidden="true" />
  </div>
</template>
