import React, { useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Modal from 'react-native-modal'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { Task } from '@app/types/task.types'
import { TaskFormComponent } from '@app/components/TaskFormComponent'
import { storeData } from '@app/state/async.state'

export default function TaskDetailsPage() {
  const queryClient = useQueryClient()
  const { taskId } = useLocalSearchParams<{ taskId: string }>()

  const existingTasks = queryClient.getQueryData<Task[]>(['tasks']) || []
  const task = existingTasks.find((task) => task.id === taskId)

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    task?.dueDate ? new Date(task.dueDate) : undefined
  )
  const [showDatePicker, setShowDatePicker] = useState(false)

  const updateTask = async (updatedTask: Task) => {
    const existingTasks = queryClient.getQueryData<Task[]>(['tasks']) || []
    const updatedTasks = existingTasks.map((task) =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    )
    await storeData('tasks', updatedTasks)
    return updatedTasks
  }

  const mutation = useMutation({
    mutationFn: (updatedTask: Task) => updateTask(updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      setModalVisible(false)
    },
  })

  const handleUpdateTask = (data: Task) => {
    if (task) {
      mutation.mutate({ ...task, ...data })
    }

    setModalVisible(false)
  }

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Task not found</Text>
      </View>
    )
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
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Status:</Text>
          <Text
            style={
              task.status === 'completed' ? styles.completed : styles.pending
            }
          >
            {task.status}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Due Date:</Text>
          <Text style={styles.value}>
            {task?.dueDate
              ? new Date(task.dueDate)
                  .toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                  .replace(/(\d{1,2})(st|nd|rd|th)?/, (day) => `${day}th`)
              : ''}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.editButtonText}>Edit Task</Text>
        </TouchableOpacity>

        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TaskFormComponent
              task={task}
              selectedDate={selectedDate}
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
              setSelectedDate={setSelectedDate}
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
  editButton: {
    backgroundColor: '#89b4fa',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
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
    maxWidth: 500, // Max width for larger screens
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
