import { z } from 'zod'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { useRouter } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'
import { Picker } from '@react-native-picker/picker'
import { zodResolver } from '@hookform/resolvers/zod'
import DateTimePicker from '@react-native-community/datetimepicker'

const taskSchema = z.object({
  title: z.string({ required_error: 'Task title is required' }),
  description: z.string().optional(),
  dueDate: z.date({ required_error: 'Due date is required' }),
  status: z.enum(['pending', 'in-progress', 'completed'], {
    required_error: 'Status is required',
  }),
})

export default function NewTaskPage() {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false)
    if (date) setSelectedDate(date)
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
  })

  const router = useRouter()

  const onSubmit = (data: any) => {
    console.log(data)
    router.push('/tasks')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Task</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Task Title</Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.title && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter task title"
              placeholderTextColor="#999"
            />
          )}
        />
        {errors.title && (
          <Text style={styles.errorText}>
            {errors.title?.message as string}
          </Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
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
          )}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Due Date</Text>
        <Controller
          control={control}
          name="dueDate"
          render={({ field: { onChange } }) => (
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
                    onChange(date)
                  }}
                />
              )}
            </>
          )}
        />
        {errors.DueDate && (
          <Text style={styles.errorText}>
            {errors.DueDate?.message as string}
          </Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Status</Text>
        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.input}
            >
              <Picker.Item label="Pending" value="pending" />
              <Picker.Item label="In Progress" value="in-progress" />
              <Picker.Item label="Completed" value="completed" />
            </Picker>
          )}
        />
        {errors.status && (
          <Text style={styles.errorText}>
            {errors.status?.message as string}
          </Text>
        )}
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
