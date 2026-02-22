import { defineStore } from 'pinia';

const STORAGE_KEY = 'tasks';

const defaultTasks = [];

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),
  actions: {
    loadTasks() {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      if (savedTasks) {
        try {
          this.tasks = JSON.parse(savedTasks);
        } catch (error) {
          this.tasks = [...defaultTasks];
        }
      } else {
        this.tasks = [...defaultTasks];
      }
    },
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    },
    addTask(task) {
      this.tasks.push({ ...task });
      this.persist();
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.persist();
    },
    toggleTaskCompleted(index) {
      const task = this.tasks[index];
      if (task) {
        task.completed = !task.completed;
        this.persist();
      }
    },
    updateTask(index, payload) {
      const task = this.tasks[index];
      if (task) {
        task.name = payload.name;
        task.description = payload.description;
        this.persist();
      }
    }
  }
});
