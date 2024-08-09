import { Text, StyleSheet, View, ScrollView } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'

import { DEMOTASKS } from '@app/utils/seed.tasks'

export default function TaskDetailsPage() {
  const { taskId } = useLocalSearchParams<{ taskId: string }>()
  const task = DEMOTASKS.find((task) => task.id === taskId)

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
          title: `Task - ${task.id}`,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
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
          <Text style={styles.value}>{task.dueDate.toISOString()}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
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
})
