export const parseTypeScriptDiagnostics = (output: string): number => {
  const match = output.match(/Instantiations:\s+(\d+)/)
  if (!match) {
    return 0
  }
  return Number(match[1])
}
