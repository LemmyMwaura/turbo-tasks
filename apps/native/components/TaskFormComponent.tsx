import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'

import { Controller, useForm } from 'react-hook-form'
import { Picker } from '@react-native-picker/picker'

import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'

import { Task, taskSchema } from '@app/types/task.types'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  task?: Task
  selectedDate: Date | undefined
  showDatePicker: boolean
  setShowDatePicker: (show: boolean) => void
  setSelectedDate: (date?: Date) => void
  onSubmit: (data: Task) => void
}

export const TaskFormComponent: React.FC<Props> = ({
  task,
  selectedDate,
  showDatePicker,
  setShowDatePicker,
  setSelectedDate,
  onSubmit,
}) => {
  const { control, handleSubmit, setValue } = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      dueDate: task?.dueDate ? new Date(task.dueDate) : undefined,
      status: task?.status || 'pending',
    },
  })

  const handleDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false)
    if (date) {
      setSelectedDate(date)
      setValue('dueDate', date)
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.header}>
        {task ? 'Edit Task' : 'Create New Task'}
      </Text>

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
        <Text style={styles.submitButtonText}>
          {task ? 'Update Task' : 'Add Task'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
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
