import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { randomUUID } from 'expo-crypto'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Task } from '@app/types/task.types'
import { storeData } from '@app/state/async.state'
import { TaskFormComponent } from '@app/components/TaskFormComponent'

const QUERYKEY = 'tasks'

export default function NewTaskPage() {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (data: Task) => {
      const newTask = {
        ...data,
        id: randomUUID(),
        dueDate: selectedDate as Date,
      }

      const existingTasks = queryClient.getQueryData<Task[]>([QUERYKEY]) || []
      const updatedTasks = [...existingTasks, newTask]
      await storeData(QUERYKEY, updatedTasks)
      return updatedTasks
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERYKEY] })
      router.push('/tasks')
    },
    onError: (error) => {
      console.error('Error saving task:', error)
    },
  })

  const onSubmit = (data: Task) => {
    mutation.mutate(data)
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Add New Task',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'rgba(245, 224, 220, 0.8)',
          },
        }}
      />
      <TaskFormComponent
        selectedDate={selectedDate}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        setSelectedDate={setSelectedDate}
        onSubmit={onSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(245, 224, 220, 0.8)',
    padding: 20,
    paddingTop: 50,
  },
})
