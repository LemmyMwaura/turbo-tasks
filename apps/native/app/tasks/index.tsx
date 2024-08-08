import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { useState } from 'react'
import { Stack } from 'expo-router'

export default function TasksPage() {
  const [tasks, setTask] = useState([])

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'TASK' }} />

      <View>
        <Text style={styles.header}>Today's Tasks</Text>
      </View>

      <View>
        <Text style={styles.items}>{/* tasks go here */}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 36,
  },
  items: {},
})
