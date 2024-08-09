import { Task } from '../types/task.types'
import { v4 as uuid } from 'uuid'

export const DEMOTASKS: Task[] = [
  {
    id: uuid(),
    title: 'Implement User Authentication',
    description:
      'Develop and integrate user authentication using JWT for the application. Ensure users can sign up, log in, and log out securely.',
    dueDate: new Date('2024-08-12'),
    status: 'in-progress',
  },
  {
    id: uuid(),
    title: 'Design Database Schema',
    description:
      'Create the database schema for storing user data, tasks, and other relevant information. Ensure proper indexing and relationships between tables.',
    dueDate: new Date('2024-08-10'),
    status: 'pending',
  },
  {
    id: uuid(),
    title: 'Implement Task CRUD Operations',
    description:
      'Develop Create, Read, Update, and Delete (CRUD) operations for tasks in the application. Ensure data validation and error handling are properly implemented.',
    dueDate: new Date('2024-08-14'),
    status: 'pending',
  },
  {
    id: uuid(),
    title: 'Test and Debug API Endpoints',
    description:
      'Write unit tests for the API endpoints, covering all possible edge cases. Debug any issues found during testing.',
    dueDate: new Date('2024-08-13'),
    status: 'in-progress',
  },
  {
    id: uuid(),
    title: 'Optimize Application Performance',
    description:
      "Analyze and optimize the application's performance, focusing on reducing load times and improving responsiveness, especially in areas like database queries and API calls.",
    dueDate: new Date('2024-08-15'),
    status: 'pending',
  },
  {
    id: uuid(),
    title: 'Implement User Notifications',
    description:
      'Add a notification system to alert users about task deadlines, updates, and other important events within the application.',
    dueDate: new Date('2024-08-16'),
    status: 'completed',
  },
  {
    id: uuid(),
    title: 'Create User Dashboard',
    description:
      'Design and implement a user dashboard that displays an overview of their tasks, including summaries of tasks that are pending, in progress, and completed.',
    dueDate: new Date('2024-08-17'),
    status: 'in-progress',
  },
]
