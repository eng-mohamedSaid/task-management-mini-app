<script setup lang="ts">
defineProps<{ title: string }>()

const open = defineModel<boolean>('open', { required: true })
const panel = ref<HTMLElement | null>(null)
let previouslyFocused: HTMLElement | null = null

const titleId = useId()

watch(open, async (isOpen) => {
  if (isOpen) {
    previouslyFocused = document.activeElement as HTMLElement | null
    await nextTick()
    panel.value?.querySelector('input')?.focus()
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''

    previouslyFocused?.focus()
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-shell/60 p-4"
      @keydown.esc="open = false"
    >
      <div class="absolute inset-0" @click="open = false" />

      <div
        ref="panel"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        class="relative z-10 w-full max-w-md rounded-xl bg-surface p-6 shadow-xl"
      >
        <h2 :id="titleId" class="text-title mb-5 text-center uppercase text-ink">
          {{ title }}
        </h2>

        <slot />
      </div>
    </div>
  </Teleport>
</template>
