import * as MeasureMemoryInternal from '../MeasureMemoryInternal/MeasureMemoryInternal.ts'
import * as MeasureTypeScriptMemory from '../MeasureTypeScriptMemory/MeasureTypeScriptMemory.ts'
import { parseArgs } from '../ParseArgs/ParseArgs.ts'
import { root } from '../Root/Root.ts'

export const measureMemory = async ({
  workerPath,
  playwrightPath,
  threshold,
  instantiations,
  instantiationsPath,
}: {
  workerPath: string
  playwrightPath: string
  threshold: number
  instantiations?: number
  instantiationsPath?: string
}) => {
  const options = parseArgs()
  if (instantiationsPath && instantiations) {
    await MeasureTypeScriptMemory.measureTypeScriptMemory({
      threshold: instantiations,
      folderPath: instantiationsPath,
    })
    return
  }
  await MeasureMemoryInternal.measureMemoryInternal({
    headless: options.headless,
    port: options.port,
    remoteDebuggingPort: '9222',
    workerPath,
    root,
    playwrightPath,
    threshold,
  })
}
