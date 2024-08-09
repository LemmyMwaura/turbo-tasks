import { DEMOTASKS } from "@repo/ui"

const PREFIX = 'TASK_TRACKER'

/** Store Data to LocalStorage */
export const storeData = async (key: string, data: unknown) => {
  try {
    localStorage.setItem(`${PREFIX}-${key}`, JSON.stringify(data))
  } catch (e) {
    console.error(e)
  }
}

export const getData = async (key: string) => {
  try {
    const res = localStorage.getItem(`${PREFIX}-${key}`)
    const data = res ? JSON.parse(res) : []
    return data
  } catch (e) {
    console.error(e)
  }
}

export const seedData = () => {
  storeData('tasks', DEMOTASKS)
}
