interface Options {
  readonly workerPath: string
  readonly playwrightPath: string
  readonly threshold: number
  readonly instantiations?: number
  readonly instantiationsPath?: string
}

export const measureMemory: (options: Options) => Promise<void>
