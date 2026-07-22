<script setup lang="ts">
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header class="h-12 shrink-0 bg-shell" />

    <main class="flex-1 px-4 py-8 sm:px-6">
      <slot />
    </main>

    <footer class="h-12 shrink-0 bg-shell" />
  </div>
</template>
