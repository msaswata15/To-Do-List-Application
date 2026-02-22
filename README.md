# To-Do List Application

This is a functional To-Do List application built as a micro-frontend using Vue 3. It provides a clean interface to manage personal tasks with full create, edit, complete, and delete capabilities.

## Technical Stack

- **Framework:** Vue 3
- **State Management:** Pinia
- **UI Library:** Element Plus
- **Build Tool:** Vite

## Features

- Add new tasks to the list.
- Mark tasks as "done" or keep them as "to-do".
- Edit the title and description of existing tasks.
- Remove individual tasks from the list.

## Data Persistence

- All existing tasks are loaded and displayed whenever the application launches.
- Task data is stored in the browser using `localStorage`, so it survives page refreshes.
- Newly added, edited, deleted, or completed tasks are reflected in the UI immediately.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a7513a03-7e27-4386-af3f-16fc82c3064f" />

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
