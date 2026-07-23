<script setup lang="ts">
withDefaults(
  defineProps<{
    // we have only 2 button shapes in figma design
    variant?: 'primary' | 'outline'
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { variant: 'primary', type: 'button', disabled: false },
)

const VARIANT_CLASS = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  outline: 'border border-primary text-primary hover:bg-primary/10',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="text-button cursor-pointer rounded-lg px-5 py-2 uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50"
    :class="VARIANT_CLASS[variant]"
  >
    <slot />
  </button>
</template>
