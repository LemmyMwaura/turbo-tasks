import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useRouter, Stack } from 'expo-router'

import { Task } from '@app/types/task.types'
import { TaskFormComponent } from '@app/components/TaskFormComponent'
import { useCreateTaskMutation } from '@app/hooks/useCreateMutation'

export default function NewTaskPage() {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const router = useRouter()

  const mutation = useCreateTaskMutation({
    onComplete: () => {
      router.push('/tasks')
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
