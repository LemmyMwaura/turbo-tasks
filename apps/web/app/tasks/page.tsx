'use client'

import React from 'react'
import { useGetTasks } from '../hooks/useFetchHooks'
import TaskList from '@app/components/TaskList'

export default function TaskPage() {
  const { data: tasks, isLoading, error } = useGetTasks()

  if (isLoading) return <p>Loading...</p>

  if (error) return <div>{JSON.stringify(error)}</div>

  return <div>{tasks && <TaskList tasks={tasks} />}</div>
}
