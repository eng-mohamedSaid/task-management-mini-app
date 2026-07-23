<script setup lang="ts">
defineProps<{
  label: string
  type?: string
  placeholder?: string
  error?: string
  icon?: string
}>()

const model = defineModel<string>({ required: true })

const id = useId()
</script>

<template>
  <div class="w-full">
    <label :for="id" class="sr-only">{{ label }}</label>

    <div class="relative">
      <input
        :id="id"
        v-model="model"
        :type="type ?? 'text'"
        :placeholder="placeholder"
        :aria-invalid="Boolean(error)"
        :aria-describedby="error ? `${id}-error` : undefined"
        class="text-paragraph w-full rounded-lg border bg-surface py-2.5 text-ink placeholder:text-ink-muted"
        :class="[
          error ? 'border-danger' : 'border-primary/40',
          icon ? 'ps-4 pe-10' : 'px-4',
        ]"
      >

      <img
        v-if="icon"
        :src="icon"
        alt=""
        class="pointer-events-none absolute top-1/2 end-4 size-[18px] -translate-y-1/2"
      >
    </div>

    <p v-if="error" :id="`${id}-error`" role="alert" class="text-paragraph mt-1 text-danger">
      {{ error }}
    </p>
  </div>
</template>
