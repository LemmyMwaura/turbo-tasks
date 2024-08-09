'use client'

import React from 'react'
import { useGetTasks } from '@app/hooks/useFetchHooks'
import TaskList from '@app/components/TaskList'

import { seedData } from '../state/local.store'

export default function TaskPage() {
  // uncomment to seed data
  // seedData()

  const { data: tasks, isLoading, error } = useGetTasks()

  if (isLoading) return <p>Loading...</p>

  if (error) return <div>{JSON.stringify(error)}</div>

  return (
    <div>
      <div className="flex p-2 items-center w-full">
        <h4 className="m-auto font-bold text-2xl">Tasks</h4>
      </div>
      {tasks && <TaskList tasks={tasks} />}
    </div>
  )
}
