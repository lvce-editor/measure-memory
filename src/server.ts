import { Server } from 'node:http'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createApp } from './createApp.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

export const startServer = async (port: number, aboutWorkerPath: string): Promise<Server> => {
  const app = createApp(aboutWorkerPath, root)

  const { promise, resolve } = Promise.withResolvers<void>()
  const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
    resolve()
  })
  await promise
  return server
}
