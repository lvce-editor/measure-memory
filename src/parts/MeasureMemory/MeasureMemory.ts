import * as MeasureMemoryInternal from '../MeasureMemoryInternal/MeasureMemoryInternal.ts'
import * as MeasureTypeScriptMemory from '../MeasureTypeScriptMemory/MeasureTypeScriptMemory.ts'
import { parseArgs } from '../ParseArgs/ParseArgs.ts'
import { root } from '../Root/Root.ts'

export const measureMemory = async ({
  instantiations,
  instantiationsPath,
  playwrightPath,
  threshold,
  workerPath,
}: {
  workerPath?: string
  playwrightPath?: string
  threshold?: number
  instantiations?: number
  instantiationsPath?: string
}) => {
  const options = parseArgs()
  if (instantiationsPath && instantiations) {
    await MeasureTypeScriptMemory.measureTypeScriptMemory({
      folderPath: instantiationsPath,
      threshold: instantiations,
    })
  }
  if (workerPath && playwrightPath && threshold) {
    await MeasureMemoryInternal.measureMemoryInternal({
      headless: options.headless,
      playwrightPath,
      port: options.port,
      remoteDebuggingPort: '9222',
      root,
      threshold,
      workerPath,
    })
  }
}
