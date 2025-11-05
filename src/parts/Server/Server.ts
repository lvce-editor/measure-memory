import type { Server } from 'node:http'
import { createApp } from '../CreateApp/CreateApp.ts'

const listen = async (app: any, port: number): Promise<Server> => {
  const { promise, resolve } = Promise.withResolvers<void>()
  const server = app.listen(port, () => {
    resolve()
  })
  await promise
  return server
}

export const startServer = async (
  port: number,
  workerPath: string,
  root: string,
): Promise<Server> => {
  const app = createApp(workerPath, root)
  const server = await listen(app, port)
  console.log(`Server running at http://localhost:${port}`)
  return server
}
