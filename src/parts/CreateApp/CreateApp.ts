import express from 'express'
import { join } from 'node:path'

export const createApp = (aboutWorkerPath: string, root: string) => {
  const app = express()

  // Serve worker file
  app.get('/dist/aboutWorkerMain.js', (req, res) => {
    res.sendFile(aboutWorkerPath)
  })

  // Serve index.html from root directory
  app.get('/', (req, res) => {
    res.sendFile(join(root, 'index.html'))
  })

  return app
}
