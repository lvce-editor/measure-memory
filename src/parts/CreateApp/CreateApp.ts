import { createReadStream } from 'node:fs'
import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from 'node:http'
import { join } from 'node:path'
import { pipeline } from 'node:stream/promises'

export const createApp = (aboutWorkerPath: string, root: string): Server => {
  const handleRequest = async (req: IncomingMessage, res: ServerResponse) => {
    switch (req.url) {
      case '/':
        await pipeline(createReadStream(join(root, 'index.html')), res)
        break
      case '/dist/aboutWorkerMain.js':
        await pipeline(createReadStream(aboutWorkerPath), res)
      default:
        res.statusCode = 404
        res.end('Not Found')
        break
    }
  }

  const app = createServer(handleRequest)

  return app
}
