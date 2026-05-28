/**
 * Clear sessionStorage.
 */
export const clearSessions = () => sessionStorage.clear()

/**
 * Removes an item from sessionStorage by key.
 *
 * @param key - The key of the item to remove.
 */
export const removeSession = (key: string) => sessionStorage.removeItem(key)

/**
 * Removes multiple sessionStorage items by keys.
 *
 * @param keys - Array of keys to remove.
 */
export const removeSessions = (keys: string[]) => keys.forEach(key => removeSession(key))

/**
 * Sets an item in sessionStorage after serializing it to JSON.
 *
 * @param key - The key under which to store the value.
 * @param value - The value to store (will be JSON-stringified).
 */
export const setSession = <T>(key: string, value: T) => sessionStorage.setItem(key, JSON.stringify(value))

/**
 * Sets multiple items in sessionStorage after serializing it to JSON.
 *
 * @param items - Array of session storage items to set.
 */
export const setSessions = <T extends Record<string, unknown>>(
  items: { [K in keyof T]: { key: K & string; value: T[K] } }[keyof T][],
) => {
  items.forEach(item => setSession(item.key, item.value))
}

/**
 * Retrieves and parses a JSON item from sessionStorage by key.
 *
 * @param key - The key of the item to retrieve.
 * @returns The parsed value from sessionStorage, or null if not found.
 */
export const getSession = <T>(key: string) => {
  const item = sessionStorage.getItem(key)
  try {
    if (item) return JSON.parse(item) as T
    return null
  } catch {
    return item as T
  }
}

/**
 * Retrieves and parses multiple JSON items from sessionStorage by key.
 *
 * @param keys - The keys of the items to retrieve.
 * @returns The parsed values from sessionStorage.
 */
export const getSessions = <T extends Record<string, unknown>, K extends keyof T = keyof T>(
  keys: readonly K[],
): { [P in K]: T[P] | null } => {
  return keys.reduce(
    (acc, key) => {
      acc[key] = getSession<T[K]>(key as string)
      return acc
    },
    {} as { [P in K]: T[P] | null },
  )
}
