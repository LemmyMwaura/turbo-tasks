import AsyncStorage from '@react-native-async-storage/async-storage'

const PREFIX = 'TASK_TRACKER'

/** Store Data to AsyncStorage */
export const storeData = async (key: string, data: unknown) => {
  try {
    await AsyncStorage.setItem(`${PREFIX}-${key}`, JSON.stringify(data))
  } catch (e) {
    console.error(e)
  }
}

/** Get Data from AsyncStorage */
export const getData = async (key: string) => {
  try {
    const res = await AsyncStorage.getItem(`${PREFIX}-${key}`)
    const data = res ? JSON.parse(res) : ''
    return data
  } catch (e) {
    console.error(e)
  }
}
