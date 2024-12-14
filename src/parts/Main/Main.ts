import * as MeasureMemory from '../MeasureMemory/MeasureMemory.ts'
import { parseArgs } from '../ParseArgs/ParseArgs.ts'
import { root } from '../Root/Root.ts'

export const main = async () => {
  const options = parseArgs()
  await MeasureMemory.measureMemory({
    headless: options.headless,
    port: options.port,
    remoteDebuggingPort: '9222',
    workerPath: 'TODO',
    playwrightPath: 'TODO',
    root,
  })
}
