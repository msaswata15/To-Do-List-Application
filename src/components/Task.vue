<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../stores/taskStore';

const props = defineProps({
  task: Object,
  index: Number
});

const emit = defineEmits(['delete-task']);

const isEditing = ref(false);
const editedName = ref(props.task.name);
const editedDescription = ref(props.task.description);

const taskStore = useTaskStore();

function toggleCompleted() {
  taskStore.toggleTaskCompleted(props.index);
}

function removeTask() {
  emit('delete-task', props.index);
}

function startEdit() {
  editedName.value = props.task.name;
  editedDescription.value = props.task.description;
  isEditing.value = true;
}

function saveEdit() {
  if (!editedName.value.trim() || !editedDescription.value.trim()) {
    return;
  }
  taskStore.updateTask(props.index, {
    name: editedName.value.trim(),
    description: editedDescription.value.trim()
  });
  isEditing.value = false;
}

function cancelEdit() {
  isEditing.value = false;
}

</script>

<template>
  <el-card shadow="hover" class="task-card">
    <template v-if="!isEditing">
      <div class="task-header">
        <span class="task-title">{{ task.name }}</span>
        <el-tag :type="task.completed ? 'success' : 'info'" size="small">
          {{ task.completed ? 'Done' : 'To-Do' }}
        </el-tag>
      </div>
      <p class="task-desc">{{ task.description }}</p>
      <el-divider style="margin: 12px 0;" />
      <div class="task-footer">
        <el-checkbox :model-value="task.completed" @change="toggleCompleted">
          Mark as done
        </el-checkbox>
        <div class="task-actions">
          <el-button size="small" type="primary" @click="startEdit">Edit</el-button>
          <el-button size="small" type="danger" @click="removeTask">Delete</el-button>
        </div>
      </div>
    </template>
    <template v-else>
      <el-form label-position="top">
        <el-form-item label="Title">
          <el-input v-model="editedName" placeholder="Task title" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input
            v-model="editedDescription"
            type="textarea"
            :rows="3"
            placeholder="Task description"
          />
        </el-form-item>
      </el-form>
      <div class="task-actions">
        <el-button size="small" type="primary" @click="saveEdit">Save</el-button>
        <el-button size="small" @click="cancelEdit">Cancel</el-button>
      </div>
    </template>
  </el-card>
</template>

<style scoped>
.task-card {
  height: 100%;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.task-title {
  font-size: 16px;
  font-weight: 700;
  word-break: break-word;
}

.task-desc {
  margin-top: 10px;
  font-size: 14px;
  color: #606266;
  word-break: break-word;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.task-actions {
  display: flex;
  gap: 6px;
}
</style>