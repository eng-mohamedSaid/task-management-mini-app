<script setup lang="ts">
import pen from '~/assets/images/pen.svg'
import trash from '~/assets/images/trash.svg'
import type { Task } from '~/types/task'
import { formatDate } from '~/utils/date'


const props = defineProps<{ task: Task }>()
const emit = defineEmits<{
  toggle: [id: string]
  edit: [task: Task]
  remove: [id: string]
}>()
const { t, locale } = useI18n()

const checkboxLabel = computed(() =>
  t(props.task.completed ? 'a11y.markIncomplete' : 'a11y.markComplete', {
    title: props.task.title,
  }),
)
</script>

<template>
  <li class="group flex items-center gap-3 border-b border-line py-3">
    <input
      type="checkbox"
      :checked="task.completed"
      :aria-label="checkboxLabel"
      class="size-5 shrink-0 cursor-pointer rounded accent-primary"
      @change="emit('toggle', task.id)"
    >

    <div class="min-w-0 flex-1">
      <p
        class="text-paragraph break-words font-semibold uppercase"
        :class="task.completed ? 'text-ink-muted line-through' : 'text-ink'"
      >
        {{ task.title }}
      </p>
      <p class="text-paragraph text-ink-muted">{{ formatDate(task.dueDate, locale) }}</p>
    </div>

    <div
      class="flex shrink-0 gap-1 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
    >
      <button
        type="button"
        class="cursor-pointer rounded p-1.5 hover:bg-line/40"
        :aria-label="t('a11y.editTask', { title: task.title })"
        @click="emit('edit', task)"
      >
        <img :src="pen" alt="" class="size-[18px]">
      </button>

      <button
        type="button"
        class="cursor-pointer rounded p-1.5 hover:bg-danger/10"
        :aria-label="t('a11y.deleteTask', { title: task.title })"
        @click="emit('remove', task.id)"
      >
        <img :src="trash" alt="" class="size-[18px]">
      </button>
    </div>
  </li>
</template>
