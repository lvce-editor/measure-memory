import type { Server } from 'node:http'
import { createApp } from '../CreateApp/CreateApp.ts'

export const startServer = async (
  port: number,
  workerPath: string,
  root: string,
): Promise<Server> => {
  const app = createApp(workerPath, root)

  const { promise, resolve } = Promise.withResolvers<void>()
  const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
    resolve()
  })
  await promise
  return server
}
