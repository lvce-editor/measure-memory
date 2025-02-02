import { WorkerInitializationError } from '../Errors/Errors.ts'
import * as WorkerState from '../WorkerState/WorkerState.ts'

export const waitForWorkerReady = async (page: any): Promise<void> => {
  const workerState = await Promise.race([
    page
      // @ts-ignore
      .waitForFunction(() => globalThis.__workerDidLaunch === 1, { timeout: 5000 })
      .then(() => WorkerState.Launched),
    page
      // @ts-ignore
      .waitForFunction(() => globalThis.__workerDidLaunch === 2, { timeout: 5000 })
      .then(() => WorkerState.Error),
  ])

  if (workerState === WorkerState.Error) {
    throw new WorkerInitializationError('Worker failed to initialize')
  }
}
