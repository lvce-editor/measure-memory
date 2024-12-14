import { threshold } from '../Config/Config.ts'
import { MemoryLimitExceededError } from '../Errors/Errors.ts'
import { getMemoryUsageWs } from '../GetMemoryUsageWs/GetMemoryUsageWs.ts'
import { launchBrowser } from '../LaunchBrowser/LaunchBrowser.ts'
import { startServer } from '../Server/Server.ts'
import { waitForWorkerReady } from '../WaitForWorkerReady/WaitForWorkerReady.ts'

export const measureMemory = async ({
  workerPath,
  port,
  headless,
  remoteDebuggingPort,
  root,
  playwrightPath,
}: {
  workerPath: string
  port: number
  headless: boolean
  remoteDebuggingPort: string
  root: string
  playwrightPath: string
}) => {
  if (process.platform === 'win32') {
    // not supported
    return
  }

  const server = await startServer(port, workerPath, root)

  const { page, browser } = await launchBrowser(
    headless,
    remoteDebuggingPort,
    playwrightPath,
  )

  try {
    await page.goto(`http://localhost:${port}`)
    await waitForWorkerReady(page)

    const memoryUsage = await getMemoryUsageWs(remoteDebuggingPort)
    console.log('[memory] Worker Memory Usage:', memoryUsage)
    if (memoryUsage.usedSize >= threshold) {
      throw new MemoryLimitExceededError(threshold, memoryUsage.usedSize)
    }
  } catch (error) {
    console.error('[memory] Measurement failed:', error)
    process.exit(1)
  } finally {
    server.close()
    await browser.close()
  }
}
