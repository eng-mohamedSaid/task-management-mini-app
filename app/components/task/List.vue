<script setup lang="ts">
import emptyImage from '~/assets/images/empty.png'
import type { Task } from '~/types/task'

defineProps<{
  tasks: Task[]
  loading: boolean
  error: string | null
  empty: boolean
  noMatches: boolean
}>()

const emit = defineEmits<{
  toggle: [id: string]
  edit: [task: Task]
  remove: [id: string]
  retry: []
}>()

const { t } = useI18n()
</script>

<template>
  <div v-if="loading" class="space-y-3" aria-busy="true">
    <div v-for="n in 3" :key="n" class="flex items-center gap-3 border-b border-line py-3">
      <div class="size-5 shrink-0 animate-pulse rounded bg-line" />
      <div class="flex-1 space-y-2">
        <div class="h-3.5 w-1/3 animate-pulse rounded bg-line" />
        <div class="h-3 w-1/5 animate-pulse rounded bg-line" />
      </div>
    </div>
  </div>

  <div v-else-if="error" role="alert" class="flex flex-col items-center gap-4 py-12">
    <p class="text-paragraph text-danger">{{ t(error) }}</p>
    <MainButton variant="outline" @click="emit('retry')">{{ t('actions.retry') }}</MainButton>
  </div>

  <div v-else-if="empty || noMatches" class="flex flex-col items-center gap-2 py-10">
    <img :src="emptyImage" alt="" class="w-40 max-w-full">
    <p class="text-paragraph text-ink">
      {{ noMatches ? t('state.noMatches') : t('state.empty') }}
    </p>
  </div>

  <ul v-else class="list-none p-0">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="emit('toggle', $event)"
      @edit="emit('edit', $event)"
      @remove="emit('remove', $event)"
    />
  </ul>
</template>
