# Measure Memory

Measure WebWorker memory usage using Playwright.

## Install

```sh
npm install @lvce-editor/measure-memory
```

## Usage

```js
import { measureMemory } from '@lvce-editor/measure-memory'
import { playwrightPath, threshold, workerPath } from './config.ts'

const main = async () => {
  await measureMemory({
    playwrightPath: 'path-to-playwright.js',
    workerPath: 'path-to-webworker.js',
    threshold: 300_000,
  })
}

main()
```
