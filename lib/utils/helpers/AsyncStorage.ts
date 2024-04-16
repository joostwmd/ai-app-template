import AsyncStorage from "@react-native-async-storage/async-storage"
import { JobRecordTest } from "@utils/user/methods/test/types"

export const getJobIds = async (): Promise<string[]> => {
  try {
    const data = await AsyncStorage.getItem("job_ids")
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("Error retrieving data from AsyncStorage:", error)
    throw error
  }
}

export const getData = async (key: string): Promise<JobRecordTest> => {
  try {
    const data = await AsyncStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error retrieving data from AsyncStorage:", error)
    throw error
  }
}

export const setData = async (key: string, value: any): Promise<void> => {
  try {
    const data = JSON.stringify(value)
    await AsyncStorage.setItem(key, data)
  } catch (error) {
    console.error("Error setting data in AsyncStorage:", error)
    throw error
  }
}

export const deleteData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.error("Error deleting data from AsyncStorage:", error)
    throw error
  }
}
