import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { randomUUID } from 'expo-crypto'
import { useRouter, Stack } from 'expo-router'

import { Task } from '@app/types/task.types'
import { TaskFormComponent } from '@app/components/TaskFormComponent'
import { useTaskStore } from '@app/state/tasks.store'

export default function NewTaskPage() {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const router = useRouter()

  const { addTask } = useTaskStore((store) => store)

  const onSubmit = (data: Task) => {
    const newTask = {
      ...data,
      id: randomUUID(),
    }

    addTask(newTask)
    router.push('/tasks')
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
