'use client'

import { Button } from '@app/ui/Button'
import { useRouter } from 'next/navigation'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const router = useRouter()

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, something went wrong!
        </h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
        <div className="flex flex-col gap-2 mt-6 justify-between">
          <Button variant="secondary" onClick={() => reset()}>
            Try again
          </Button>
          <Button onClick={() => router.push('/tasks')}>Go To HomePage</Button>
        </div>
      </div>
    </div>
  )
}
