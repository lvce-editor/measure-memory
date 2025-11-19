import type { IncomingMessage, Server, ServerResponse } from 'node:http'
import { createReadStream } from 'node:fs'
import { createServer } from 'node:http'
import { join } from 'node:path'
import { pipeline } from 'node:stream/promises'

export const createApp = (aboutWorkerPath: string, root: string): Server => {
  const handleRequest = async (req: IncomingMessage, res: ServerResponse) => {
    switch (req.url) {
      case '/':
        res.setHeader('Content-Type', 'text/html')
        await pipeline(createReadStream(join(root, 'index.html')), res)
        break
      case '/dist/aboutWorkerMain.js':
        res.setHeader('Content-Type', 'application/javascript')
        await pipeline(createReadStream(aboutWorkerPath), res)
        break
      default:
        res.statusCode = 404
        res.end('Not Found')
        break
    }
  }

  const app = createServer(handleRequest)

  return app
}
