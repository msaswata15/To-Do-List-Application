<script setup>
import { ref, reactive, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import Task from './components/Task.vue';
import { useTaskStore } from './stores/taskStore';

const appName = ref('Task Manager');

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);

const newTask = reactive({
  name: '',
  description: '',
  completed: false
});

function addTask() {
  if (newTask.name.trim() === '' || newTask.description.trim() === '') {
    alert('Please fill in both the name and description fields.');
    return;
  }
  taskStore.addTask(newTask);
  newTask.name = '';
  newTask.description = '';
}

function deleteTask(index) {
  taskStore.deleteTask(index);
}

onMounted(() => {
  taskStore.loadTasks();
});

</script>

<template>
  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>{{ appName }}</h1>
      </div>
    </div>

    <div class="tasks">
      <el-row :gutter="20">
        <el-col
          v-for="(task, index) in tasks"
          :key="task.name + index"
          :xs="24"
          :sm="12"
          :md="8"
        >
          <Task
            :task="task"
            :index="index"
            @delete-task="deleteTask"
          />
        </el-col>
      </el-row>
    </div>

    <div class="add-task">
      <h3>Add a new task</h3>
      <el-input
        v-model="newTask.name"
        placeholder="Enter a title..."
        class="add-task-input"
      />
      <el-input
        v-model="newTask.description"
        type="textarea"
        :rows="4"
        placeholder="Enter a description..."
        class="add-task-textarea"
      />
      <el-button type="primary" class="add-task-button" @click="addTask">
        Add Task
      </el-button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-side {
    display: flex;
    align-items: center;

    h1 {
      text-transform: capitalize;
      font-size: 42px;
      font-weight: 700;
      line-height: 47px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
}

.tasks {
  margin-top: 20px;
}

.add-task {
  margin-top: 60px;
}

.add-task-input,
.add-task-textarea,
.add-task-button {
  width: 360px;
  max-width: 100%;
  margin-top: 12px;
}
</style>