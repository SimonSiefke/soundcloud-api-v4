const timeoutFallbackInMilliseconds = 1000

let handle: (fn: () => Promise<void>) => any
if ('requestIdleCallback' in window) {
  // @ts-ignore
  handle = (fn: () => Promise<void>) => requestIdleCallback(fn)
} else {
  handle = (fn: () => Promise<void>) =>
    setTimeout(fn, timeoutFallbackInMilliseconds)
}

const IdleComponent = (fn: any) => () =>
  new Promise(resolve => {
    handle(async () => resolve(await fn()))
  }) as Promise<any>

export default IdleComponent
