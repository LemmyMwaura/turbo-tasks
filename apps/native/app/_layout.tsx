import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { Stack, useRouter } from 'expo-router'

import { useColorScheme } from '@repo/ui'

export function ErrorBoundary() {
  const router = useRouter()
  return router.push('/tasks')
}

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack />
    </ThemeProvider>
  )
}
