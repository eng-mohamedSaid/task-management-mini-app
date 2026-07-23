import { THEME_STORAGE_KEY } from '~/constants/task'


export function useTheme() {
  const theme = useState<'light' | 'dark'>('theme', () => 'light')


  onMounted(() => {
    theme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })

  watch(theme, (value) => {
    document.documentElement.classList.toggle('dark', value === 'dark')
    localStorage.setItem(THEME_STORAGE_KEY, value)
  })

  return {
    isDark: computed(() => theme.value === 'dark'),
    toggleTheme: () => (theme.value = theme.value === 'dark' ? 'light' : 'dark'),
  }
}
