import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { DEMOTASKS } from '@app/utils/seed.tasks'

type Task = {
  id: number
  description: string
  title: string
  isCompleted: boolean
}

export default function TasksPage() {
  const [tasks, setTask] = useState<Task[]>(DEMOTASKS)
  const router = useRouter() // For navigation

  const onItemPressed = (task: Task) => {
    // newTasks[index] = { ...task, isCompleted: !task.isCompleted }
    // setTask(newTasks)
    router.push(`/tasks/${task.id}`)
  }

  const onAddTaskPressed = () => {
    router.push('/tasks/new-task')
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'TASK TRACKER',
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "rgba(245, 224, 220, 0.8)"
          }
        }}
      />

      <FlatList
        data={tasks}
        contentContainerStyle={styles.taskList}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onItemPressed(item)}
            style={styles.taskContainer}
          >
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDesc}>
              {item.description.substring(0, 100) + '...'}
            </Text>
          </Pressable>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={onAddTaskPressed}>
        <MaterialCommunityIcons name="plus" size={30} color="#FFF" />
      </TouchableOpacity>

      <StatusBar style="auto" />
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
  header: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  taskList: {
    gap: 20,
  },
  taskContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    minHeight: 40,
    gap: 10,
  },
  taskTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  taskDesc: {
    color: '#3f3f46',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#89b4fa',
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
})