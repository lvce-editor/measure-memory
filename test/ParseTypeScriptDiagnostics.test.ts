import { expect, test } from '@jest/globals'
import { parseTypeScriptDiagnostics } from '../src/parts/ParseTypeScriptDiagnostics/ParseTypeScriptDiagnostics.ts'

test('parseTypeScriptDiagnostics', () => {
  const output = `Files:                         574
Lines of Library:            22203
Lines of Definitions:        59487
Lines of TypeScript:         10882
Lines of JavaScript:             0
Lines of JSON:                   0
Lines of Other:                  0
Identifiers:                 86268
Symbols:                     79153
Types:                        8240
Instantiations:               6375
Memory used:               142892K`
  expect(parseTypeScriptDiagnostics(output)).toBe(6375)
})

test('parseTypeScriptDiagnostics - no match', () => {
  const output = 'invalid output'
  expect(parseTypeScriptDiagnostics(output)).toBe(0)
})
