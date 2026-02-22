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
  <div class="task">
    <template v-if="!isEditing">
      <h3>
        {{ task.name }}
      </h3>
      <p>
        {{ task.description }}
      </p>
      <div class="task-check">
        <el-checkbox :model-value="task.completed" @change="toggleCompleted">
          {{ task.completed ? 'Done' : 'To-Do' }}
        </el-checkbox>
        <div class="task-actions">
          <el-button size="small" type="primary" @click="startEdit">Edit</el-button>
          <el-button size="small" type="danger" @click="removeTask">Delete</el-button>
        </div>
      </div>
    </template>
    <template v-else>
      <el-input v-model="editedName" placeholder="Task title" />
      <el-input
        v-model="editedDescription"
        type="textarea"
        :rows="3"
        placeholder="Task description"
        style="margin-top: 8px;"
      />
      <div class="task-actions">
        <el-button size="small" type="primary" @click="saveEdit">Save</el-button>
        <el-button size="small" @click="cancelEdit">Cancel</el-button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.task-actions {
  display: flex;
  gap: 8px;
}
</style>