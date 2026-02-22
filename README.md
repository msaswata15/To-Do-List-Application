# To-Do List Application - Week 6 Assignment

This is a functional To-Do List Application built as a Micro-Frontend using Vue 3, fulfilling the requirements for the TAG COE Training 2026 Week 6 assignment.

## Technical Stack

- **Framework:** Vue 3
- **State Management:** Pinia
- **UI Library:** Element Plus
- **Build Tool:** Vite

## Functional Requirements Implemented

- Adding a new task to the list.
- Marking a task as "done."
- Removing a specific task from the list.
- Updating the text of an existing task.

## Data Persistence & Performance

- All existing tasks are fetched and displayed whenever the application launches.
- Data persists across browser refreshes using `localStorage`.
- Newly added, edited, or deleted items reflect in the UI immediately without any delay or failure.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
