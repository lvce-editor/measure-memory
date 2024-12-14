export const launchBrowser = async (
  headless: boolean,
  remoteDebuggingPort: string,
  playwrightPath: string,
) => {
  const { chromium } = await import(playwrightPath)
  const browser = await chromium.launch({
    headless: headless,
    args: [`--remote-debugging-port=${remoteDebuggingPort}`],
  })

  const context = await browser.newContext()
  const page = await context.newPage()

  return {
    page,
    browser,
  }
}
