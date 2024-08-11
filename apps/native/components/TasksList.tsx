import React from 'react'
import { FlatList, Pressable, Text, StyleSheet } from 'react-native'

import { Task } from '@app/types/task.types'

type Props = {
  tasks: Task[]
  handleItemPress: (task: Task) => void
}

export const TasksList: React.FC<Props> = ({ tasks, handleItemPress }) => {
  return (
    <FlatList
      data={tasks}
      contentContainerStyle={styles.taskList}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => handleItemPress(item)}
          style={styles.taskContainer}
        >
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDesc}>
            {item.description ? item.description.substring(0, 100) + '...' : ''}
          </Text>
        </Pressable>
      )}
      keyExtractor={(item) => item.id as string}
    />
  )
}

const styles = StyleSheet.create({
  taskList: {
    flexGrow: 1,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  taskDesc: {
    color: '#3f3f46',
  },
})
