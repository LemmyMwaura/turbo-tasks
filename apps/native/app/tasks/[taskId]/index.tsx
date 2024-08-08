import { Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

export default function TaskDetailsPage() {
  const { taskId } = useLocalSearchParams<{ taskId: string }>()

  return <Text>Tasks page {taskId} </Text>
}
