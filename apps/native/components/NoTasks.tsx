import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const NoTasks = () => {
  return (
    <View style={styles.container}>
      <View style={styles.messageWrapper}>
        <Text style={styles.message}>Click Below To Add More Tasks</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  messageWrapper: {
    borderWidth: 2,
    borderColor: '#555',
    borderStyle: 'dotted',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: '#555',
  },
})
