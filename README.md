# Todo List

A small task management app built with Nuxt 4, Vue 3 (Composition API), Pinia and Tailwind CSS 4.

Supports creating, editing, deleting and completing notes, searching by title,
filtering by status, light/dark theming, and English/Arabic with full RTL.


## 📌 Project Links

| Resource | Link |
|----------|------|
| 🎨 My Figma Design | https://www.figma.com/design/nEBoSaOTZ68A4CzzKpaTk2/ToDo-List?node-id=0-1&t=3KeAYga4Xmd00ilP-1 |
| 🌐 Live Demo | https://task-management-todo-app.vercel.app |
| 💻 Local Development | http://localhost:3000 |

## Requirements

- Node.js 20 or newer
- pnpm 10 or newer

## Setup

```bash
pnpm install
pnpm dev
```

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Serve the production build |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run unit tests |

## Project structure

```
app/
├─ components/
│  ├─ MainButton.vue        filled / outline button
│  ├─ Input.vue             search, note title, due date
│  ├─ Modal.vue             the new/edit note dialog
│  └─ task/
│     ├─ Toolbar.vue        search, filter, theme, language
│     ├─ List.vue           list + loading / empty / error states
│     ├─ Item.vue           one row
│     └─ FormModal.vue      create and edit form
├─ composables/
│  ├─ useTheme.ts           light/dark toggle
│  └─ useTaskFilters.ts     debounced search + status filter
├─ constants/task.ts
├─ services/task.service.ts mock API
├─ stores/tasks.ts          Pinia store
├─ types/task.ts
├─ utils/                   date and validation helpers
└─ pages/index.vue          the only page
```

## Notes on the implementation

**Mock API.** `services/task.service.ts` simulates a backend with `setTimeout`
and persists to `localStorage`. JSONPlaceholder was not used because its `/todos`
resource has no due date field and its writes do not persist, so create, edit and
delete would appear to work and then vanish on refresh. The store only ever sees
promises, so replacing this file with real HTTP calls would not require changes
anywhere else.

**State.** The Pinia store owns the task list and its loading/error state. View
state — which modal is open, what is typed in the search box — stays in the page
and the filter composable, so the store stays focused on data.

**Dark mode.** Colours are defined once in `app/assets/css/main.css` as semantic
tokens (`surface`, `ink`, `line`). The `.dark` block reassigns those same
variables, so components never need `dark:` variants. An inline script in
`nuxt.config.ts` applies the saved theme before first paint to avoid a flash of
the wrong theme.

**Dates.** Due dates are stored as `YYYY-MM-DD` strings in local time rather than
timestamps, so a note due Thursday stays due Thursday in any timezone.

**Validation.** The title is required and the due date must be today or later.
When editing an existing note the date rule only applies if the date is actually
changed — otherwise an already-overdue note could never be saved again.

