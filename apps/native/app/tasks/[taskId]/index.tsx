import React, { useState, useEffect } from 'react'
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Modal from 'react-native-modal'
import { router, Stack, useLocalSearchParams } from 'expo-router'

import { useTaskStore } from '@app/state/tasks.store'
import { Task } from '@app/types/task.types'

import { TaskFormComponent } from '@app/components/TaskFormComponent'
import { DeleteConfirmationModal } from '@app/components/DeleteFormModal'
import { TakeMeHome } from '@app/components/TakeMeHome'
import { formatDueDate } from '@app/utils/date-util'

export default function TaskDetailsPage() {
  const { taskId } = useLocalSearchParams<{ taskId: string }>()

  const { tasks, updateTask, removeTask, getTaskByID } = useTaskStore(
    (store) => store
  )

  const [selectedTask, setTask] = useState<Task>()
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDelModal, setShowDelModal] = useState(false)

  useEffect(() => {
    const foundTask = getTaskByID(taskId)
    if (foundTask) setTask(foundTask)
  }, [taskId, tasks])

  const handleUpdateTask = (data: Task) => {
    if (data) {
      data.id = taskId
      const task = updateTask(data)
      setTask(task)
      setShowEditModal(false)
    }
  }

  const handleDelete = () => {
    if (selectedTask && selectedTask.id) {
      removeTask(taskId)
      router.replace('/tasks')
    }
  }

  if (!selectedTask) {
    return <TakeMeHome />
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: 'Task',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'rgba(245, 224, 220, 0.8)',
          },
        }}
      />

      <View style={styles.card}>
        <Text style={styles.title}>{selectedTask.title}</Text>
        <Text style={styles.description}>{selectedTask.description}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Status:</Text>
          <Text
            style={
              selectedTask.status === 'completed'
                ? styles.completed
                : styles.pending
            }
          >
            {selectedTask.status}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Due Date:</Text>
          <Text style={styles.value}>
            {selectedTask.dueDate ? formatDueDate(selectedTask.dueDate) : ''}
          </Text>
        </View>

        <View style={styles.btns}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setShowEditModal(true)}
          >
            <Text style={styles.ButtonText}>Edit Task</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setShowDelModal(true)}
          >
            <Text style={styles.ButtonText}>Delete Task</Text>
          </TouchableOpacity>
        </View>

        <DeleteConfirmationModal
          isVisible={showDelModal}
          onCancel={() => setShowDelModal(false)}
          onConfirm={handleDelete}
        />

        <Modal
          isVisible={showEditModal}
          onBackdropPress={() => setShowEditModal(false)}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowEditModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TaskFormComponent
              task={selectedTask}
              onSubmit={(data) => {
                handleUpdateTask(data)
              }}
            />
          </View>
        </Modal>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'rgba(245, 224, 220, 0.8)',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    lineHeight: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#888',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  completed: {
    fontSize: 16,
    color: '#89b4fa',
  },
  pending: {
    fontSize: 16,
    color: '#F44336',
  },
  errorText: {
    fontSize: 18,
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 50,
  },
  btns: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#89b4fa',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  ButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 500,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
})
