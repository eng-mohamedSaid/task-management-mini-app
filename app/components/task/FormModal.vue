<script setup lang="ts">
import { TITLE_MAX_LENGTH } from '~/constants/task'
import type { Task, TaskInput } from '~/types/task'
import { todayISO } from '~/utils/date'
import { isValid, validateTask } from '~/utils/validation'


const props = defineProps<{ task: Task | null }>()
const open = defineModel<boolean>('open', { required: true })
const emit = defineEmits<{ submit: [payload: TaskInput] }>()

const { t } = useI18n()

const title = ref('')
const dueDate = ref(todayISO())
const submitted = ref(false)

// reset on open, so reopening after an edit doesn't inherit the old values.
watch(open, (isOpen) => {
  if (!isOpen) return
  title.value = props.task?.title ?? ''
  dueDate.value = props.task?.dueDate ?? todayISO()
  submitted.value = false
})

const errors = computed(() =>
  validateTask(
    { title: title.value, dueDate: dueDate.value },
    !props.task || dueDate.value !== props.task.dueDate,
  ),
)

function errorFor(field: 'title' | 'dueDate') {
  if (!submitted.value || !errors.value[field]) return undefined
  return t(errors.value[field]!, { max: TITLE_MAX_LENGTH })
}

function onSubmit() {
  submitted.value = true
  if (!isValid(errors.value)) return
  emit('submit', { title: title.value.trim(), dueDate: dueDate.value })
}
</script>

<template>
  <Modal v-model:open="open" :title="task ? t('note.edit') : t('note.new')">
    <form class="space-y-3" @submit.prevent="onSubmit">
      <Input
        v-model="title"
        :label="t('note.label')"
        :placeholder="t('note.placeholder')"
        :error="errorFor('title')"
      />

      <Input
        v-model="dueDate"
        type="date"
        :label="t('note.date')"
        :error="errorFor('dueDate')"
      />

      <div class="flex items-center justify-between gap-3 pt-3">
        <MainButton variant="outline" @click="open = false">
          {{ t('actions.cancel') }}
        </MainButton>
        <MainButton type="submit">{{ t('actions.apply') }}</MainButton>
      </div>
    </form>
  </Modal>
</template>
