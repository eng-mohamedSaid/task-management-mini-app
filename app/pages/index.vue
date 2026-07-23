<script setup lang="ts">
import plus from '~/assets/images/plus.svg'
import type { Task, TaskInput } from '~/types/task'

const { t } = useI18n()
const store = useTaskStore()
const { tasks, isLoading, error, isEmpty } = storeToRefs(store)
const { search, status, filteredTasks, hasNoMatches } = useTaskFilters(tasks)

onMounted(store.fetchTasks)

const formOpen = ref(false)
const editing = ref<Task | null>(null)

function openCreate() {
  editing.value = null
  formOpen.value = true
}

function openEdit(task: Task) {
  editing.value = task
  formOpen.value = true
}

async function onSubmit(payload: TaskInput) {
  const ok = editing.value
    ? await store.updateTask(editing.value.id, payload)
    : await store.addTask(payload)

  if (ok) formOpen.value = false
}
</script>

<template>
  <div class="mx-auto w-full max-w-2xl">
    <h1 class="text-title mb-6 text-center uppercase text-ink">{{ t('app.title') }}</h1>

    <TaskToolbar v-model:search="search" v-model:status="status" class="mb-6" />

    <TaskList
      :tasks="filteredTasks"
      :loading="isLoading"
      :error="error"
      :empty="isEmpty"
      :no-matches="hasNoMatches"
      @toggle="store.toggleTask"
      @edit="openEdit"
      @remove="store.removeTask"
      @retry="store.fetchTasks"
    />

    <button
      type="button"
      class="fixed bottom-8 end-8 z-40 grid size-14 cursor-pointer place-items-center rounded-full bg-primary shadow-lg hover:bg-primary-hover"
      :aria-label="t('actions.newTask')"
      @click="openCreate"
    >
      <img :src="plus" alt="" class="size-6">
    </button>

    <TaskFormModal v-model:open="formOpen" :task="editing" @submit="onSubmit" />
  </div>
</template>
