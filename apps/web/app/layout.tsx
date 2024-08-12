import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@app/utils/cn'
import { Toaster } from '@app/ui/Toast'

import { TaskStoreProvider } from '../providers/task.store'
import '../styles/global.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Lemmy Mwaura',
    default: 'Turbo Tasks | Lemmy Mwaura',
  },
  description: 'Task Tracker',
}

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn('antialiased', fontHeading.variable, fontBody.variable)}
      >
        <TaskStoreProvider>
          <main> {children}</main>
          <Toaster />
        </TaskStoreProvider>
      </body>
    </html>
  )
}
