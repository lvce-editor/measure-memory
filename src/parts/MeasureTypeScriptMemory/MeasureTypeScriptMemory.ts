import { execa } from 'execa'
import { MemoryLimitExceededError } from '../Errors/Errors.ts'
import { parseTypeScriptDiagnostics } from '../ParseTypeScriptDiagnostics/ParseTypeScriptDiagnostics.ts'

export const measureTypeScriptMemory = async ({
  folderPath,
  threshold,
}: {
  folderPath: string
  threshold: number
}) => {
  const { stdout } = await execa(
    'npx',
    ['tsc', '--noEmit', '--extendedDiagnostics', '--tsBuildInfoFile', 'null'],
    {
      cwd: folderPath,
    }
  )

  const instantiations = parseTypeScriptDiagnostics(stdout)
  if (instantiations >= threshold) {
    throw new MemoryLimitExceededError(threshold, instantiations)
  }
  return instantiations
}
