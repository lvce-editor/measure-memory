import { threshold, workerPath } from '../Config/Config.ts'
import { MemoryLimitExceededError } from '../Errors/Errors.ts'
import { getMemoryUsageWs } from '../GetMemoryUsageWs/GetMemoryUsageWs.ts'
import { launchBrowser } from '../LaunchBrowser/LaunchBrowser.ts'
import { parseArgs } from '../ParseArgs/ParseArgs.ts'
import { playwrightPath } from '../PlaywrightPath/PlaywrightPath.ts'
import { root } from '../Root/Root.ts'
import { startServer } from '../Server/Server.ts'
import { waitForWorkerReady } from '../WaitForWorkerReady/WaitForWorkerReady.ts'

export const measureMemory = async () => {
  if (process.platform === 'win32') {
    // not supported
    return
  }
  const options = parseArgs()

  const server = await startServer(options.port, workerPath, root)

  const remoteDebuggingPort = '9222'

  const { page, browser } = await launchBrowser(
    options.headless,
    remoteDebuggingPort,
    playwrightPath,
  )

  try {
    await page.goto(`http://localhost:${options.port}`)
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
