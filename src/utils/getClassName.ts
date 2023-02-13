type ClassName =
  | {
      [a: string]: boolean
    }
  | string
  | undefined

export const getClassName = (args: ClassName[]) => {
  let cl = ""
  args.forEach(arg => {
    if (typeof arg === "string") {
      cl += arg + " "
    }
    if (typeof arg === "object") {
      Object.entries(arg).forEach(entry => {
        if (entry[1]) {
          cl += entry[0] + " "
        }
      })
    }
  })
  return cl.trim()
}
