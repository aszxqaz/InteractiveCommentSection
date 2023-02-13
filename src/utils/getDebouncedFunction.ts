export const getDebouncedCallback = (
  timemap: Record<string, number>,
  delay: number,
  callback: () => void
) => {
  const id = Math.random()
  return () => {
    const now = new Date().getTime()
    const prevtime = timemap?.[id] || 0
    if (now - prevtime > delay) {
      timemap[id] = now
      callback()
    }
  }
}
