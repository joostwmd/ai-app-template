import * as SecureStore from "expo-secure-store"
const FIRST_INSTALLATION_DATE = "installation_date"

export async function getFirstInstallationDate(): Promise<string | null> {
  let date: string | null = SecureStore.getItem(FIRST_INSTALLATION_DATE)
  return date
}

export function setFirstInstallationDate(): void {
  const date = new Date().toISOString()
  SecureStore.setItem(FIRST_INSTALLATION_DATE, date)
}
