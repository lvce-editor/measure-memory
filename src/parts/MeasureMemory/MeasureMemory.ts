import * as MeasureMemoryInternal from '../MeasureMemoryInternal/MeasureMemoryInternal.ts'
import { parseArgs } from '../ParseArgs/ParseArgs.ts'
import { root } from '../Root/Root.ts'

export const measureMemory = async ({
  workerPath,
  playwrightPath,
  threshold,
}: {
  workerPath: string
  playwrightPath: string
  threshold: number
}) => {
  const options = parseArgs()
  await MeasureMemoryInternal.measureMemoryInternal({
    headless: options.headless,
    port: options.port,
    remoteDebuggingPort: '9222',
    workerPath,
    playwrightPath,
    root,
    threshold,
  })
}
