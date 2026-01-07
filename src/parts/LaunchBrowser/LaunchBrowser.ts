export const launchBrowser = async (
  headless: boolean,
  remoteDebuggingPort: string,
  playwrightPath: string,
) => {
  const { chromium } = await import(playwrightPath)
  const browser = await chromium.launch({
    args: [`--remote-debugging-port=${remoteDebuggingPort}`],
    headless: headless,
  })

  const context = await browser.newContext()
  const page = await context.newPage()

  return {
    browser,
    page,
  }
}
