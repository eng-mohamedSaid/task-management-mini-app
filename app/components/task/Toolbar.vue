<script setup lang="ts">
import lens from '~/assets/images/lens.svg'
import localeIcon from '~/assets/images/locale.svg'
import moon from '~/assets/images/moon.svg'
import sun from '~/assets/images/sun.svg'
import { STATUS_FILTERS } from '~/constants/task'
import type { StatusFilter } from '~/types/task'

const search = defineModel<string>('search', { required: true })
const status = defineModel<StatusFilter>('status', { required: true })

const { t, locale, setLocale } = useI18n()
const { isDark, toggleTheme } = useTheme()

const selectId = useId()
</script>

<template>
  <div class="flex items-center justify-center gap-3">
    <div class="min-w-0 max-w-md flex-1">
      <Input
        v-model="search"
        type="search"
        :label="t('search.label')"
        :placeholder="t('search.placeholder')"
        :icon="lens"
      />
    </div>

    <div class="relative shrink-0">
      <label :for="selectId" class="sr-only">{{ t('filter.label') }}</label>
      <select
        :id="selectId"
        v-model="status"
        class="text-button cursor-pointer appearance-none rounded-lg bg-primary py-2.5 text-white ps-4 pe-9 uppercase hover:bg-primary-hover"
      >
        <option v-for="option in STATUS_FILTERS" :key="option.value" :value="option.value">
          {{ t(option.labelKey) }}
        </option>
      </select>
      <span class="pointer-events-none absolute top-1/2 end-3 -translate-y-1/2 text-white">▾</span>
    </div>

    <button
      type="button"
      class="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg bg-primary hover:bg-primary-hover"
      :aria-label="t(isDark ? 'a11y.switchToLight' : 'a11y.switchToDark')"
      @click="toggleTheme"
    >
      <img :src="isDark ? sun : moon" alt="" class="size-[18px]">
    </button>

    <button
      type="button"
      class="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg hover:bg-primary/10"
      :aria-label="t('a11y.switchLanguage')"
      @click="setLocale(locale === 'en' ? 'ar' : 'en')"
    >
      <img :src="localeIcon" alt="" class="size-[22px]">
    </button>
  </div>
</template>
