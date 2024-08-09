import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { randomUUID } from 'expo-crypto'
import { useForm, Controller } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'

import { Task, TaskForm, taskFormSchema } from '@app/types/task.types'
import { storeData } from '@app/state/async.state'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const QUERYKEY = 'tasks'

export default function NewTaskPage() {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const queryClient = useQueryClient()

  const handleDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false)
    if (date) {
      setSelectedDate(date)
    }
  }

  const { control, handleSubmit } = useForm<TaskForm>({
    resolver: zodResolver(taskFormSchema),
  })

  const router = useRouter()
  const mutation = useMutation({
    mutationFn: async (data: TaskForm) => {
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

  const onSubmit = (data: TaskForm) => {
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

      <Text style={styles.header}>Create New Task</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Task Title</Text>
        <Controller
          control={control}
          name="title"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                style={[styles.input, error && styles.errorInput]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter task title"
                placeholderTextColor="#999"
              />
              {error && (
                <Text style={styles.errorText}>{error?.message as string}</Text>
              )}
            </>
          )}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <Controller
          control={control}
          name="description"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter task description"
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
              />
              {error && (
                <Text style={styles.errorText}>{error?.message as string}</Text>
              )}
            </>
          )}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Due Date</Text>
        <Controller
          control={control}
          name="dueDate"
          render={({ field: { onChange }, fieldState: { error } }) => (
            <>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>
                  {selectedDate ? selectedDate.toDateString() : 'Select Date'}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate ?? new Date()}
                  mode="date"
                  display="default"
                  onChange={(e, date) => {
                    handleDateChange(e, date)
                    if (date) onChange(date)
                  }}
                />
              )}
              {error && (
                <Text style={styles.errorText}>{error?.message as string}</Text>
              )}
            </>
          )}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Status</Text>
        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.input}
              >
                <Picker.Item label="Pending" value="pending" />
                <Picker.Item label="In Progress" value="in-progress" />
                <Picker.Item label="Completed" value="completed" />
              </Picker>
              {error && (
                <Text style={styles.errorText}>{error?.message as string}</Text>
              )}
            </>
          )}
        />
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.submitButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  errorInput: {
    borderColor: '#F44336',
  },
  errorText: {
    color: '#F44336',
    marginTop: 5,
  },
  dateButton: {
    backgroundColor: '#EEE',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#333',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#89b4fa',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
