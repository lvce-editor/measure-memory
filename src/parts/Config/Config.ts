import { join } from 'node:path'
import { root } from '../Root/Root.ts'

export const threshold = 400_000

export const workerPath = join(root, '.tmp/dist/dist/aboutWorkerMain.js')
