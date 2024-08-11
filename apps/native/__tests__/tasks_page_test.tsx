import { useRouter } from 'expo-router'
import { render, fireEvent } from '@testing-library/react-native'

import TasksPage from '@app/app/tasks'

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}))

describe('TasksPage', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })

    jest.mock('@app/state/tasks.store', () => ({
      useTaskStore: jest.fn().mockReturnValue({
        tasks: [
          { id: '1', title: 'Task 1', description: 'Description 1' },
          { id: '2', title: 'Task 2', description: 'Description 2' },
        ],
      }),
    }))
  })

  it('navigates to task details page when a task is pressed', () => {
    const { getByText } = render(<TasksPage />)

    fireEvent.press(getByText('Task 1'))

    expect(mockPush).toHaveBeenCalledWith('/tasks/1')
  })

  it('navigates to the add new task page when the add button is pressed', () => {
    const { getByTestId } = render(<TasksPage />)
    fireEvent.press(getByTestId('add-task-button'))

    expect(mockPush).toHaveBeenCalledWith('/tasks/new-task')
  })
})
