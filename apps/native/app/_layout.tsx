import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { Stack, useRouter } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useColorScheme } from '@repo/ui'

export function ErrorBoundary() {
  const router = useRouter()
  return router.push("/tasks")
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
