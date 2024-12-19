interface Options {
  readonly workerPath: string
  readonly playwrightPath: string
  readonly threshold: number
}

export const measureMemory: (options: Options) => Promise<void>
