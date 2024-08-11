import React from 'react'

import { useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'

export const TakeMeHome = () => {
  const router = useRouter()

  const takeMeHome = () => {
    router.push('/tasks')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Task not found</Text>
      <TouchableOpacity style={styles.homeButton} onPress={takeMeHome}>
        <Text style={styles.homeButtonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'rgba(245, 224, 220, 0.8)',
  },
  errorText: {
    fontSize: 18,
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 50,
  },
  homeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
