import { WorkerInitializationError } from '../Errors/Errors.ts'
import * as WorkerState from '../WorkerState/WorkerState.ts'

const waitForState = async (page: any, value: number, state: number): Promise<number> => {
  // @ts-ignore
  await page.waitForFunction((expected: number) => globalThis.__workerDidLaunch === expected, value, {
    timeout: 5000,
  })
  return state
}

export const waitForWorkerReady = async (page: any): Promise<void> => {
  const workerState = await Promise.race([
    waitForState(page, 1, WorkerState.Launched),
    waitForState(page, 2, WorkerState.Error),
  ])

  if (workerState === WorkerState.Error) {
    throw new WorkerInitializationError('Worker failed to initialize')
  }
}
