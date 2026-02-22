<script setup>
import { ref, reactive, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import Task from './components/Task.vue';
import { useTaskStore } from './stores/taskStore';

const appName = ref('To-Do List Application');

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
      <el-empty v-if="tasks.length === 0" description="No tasks yet. Add one below!" />
      <el-row v-else :gutter="20">
        <el-col
          v-for="(task, index) in tasks"
          :key="task.name + index"
          :xs="24"
          :sm="12"
          :md="8"
          class="task-col"
        >
          <Task
            :task="task"
            :index="index"
            @delete-task="deleteTask"
          />
        </el-col>
      </el-row>
    </div>

    <el-divider />

    <el-card class="add-task" shadow="never">
      <template #header>
        <span style="font-weight: 700;">Add a New Task</span>
      </template>
      <el-form label-position="top">
        <el-form-item label="Title">
          <el-input
            v-model="newTask.name"
            placeholder="Enter a title..."
          />
        </el-form-item>
        <el-form-item label="Description">
          <el-input
            v-model="newTask.description"
            type="textarea"
            :rows="4"
            placeholder="Enter a description..."
          />
        </el-form-item>
        <el-button type="primary" @click="addTask">Add Task</el-button>
      </el-form>
    </el-card>
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

.task-col {
  margin-bottom: 20px;
}

.add-task {
  margin-top: 40px;
  max-width: 480px;
}
</style>