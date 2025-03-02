import { expect, test, jest } from '@jest/globals'
import { MemoryLimitExceededError } from '../src/parts/Errors/Errors.ts'

const mockExeca = {
  execa: jest.fn(),
}

jest.unstable_mockModule('execa', () => mockExeca)

const { measureTypeScriptMemory } = await import(
  '../src/parts/MeasureTypeScriptMemory/MeasureTypeScriptMemory.ts'
)

test('measureTypeScriptMemory - below threshold', async () => {
  // @ts-ignore
  mockExeca.execa.mockResolvedValue({
    stdout: `Files: 574
Instantiations: 5000`,
    stderr: '',
    exitCode: 0,
  })

  const instantiations = await measureTypeScriptMemory({
    folderPath: '.',
    threshold: 10_000,
  })
  expect(instantiations).toBe(5000)
})

test('measureTypeScriptMemory - exceeds threshold', async () => {
  // @ts-ignore
  mockExeca.execa.mockResolvedValue({
    stdout: `Files: 574
Instantiations: 6375`,
    stderr: '',
    exitCode: 0,
  })

  await expect(
    measureTypeScriptMemory({
      folderPath: '.',
      threshold: 1,
    })
  ).rejects.toThrow(MemoryLimitExceededError)
})
