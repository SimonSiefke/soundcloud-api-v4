export async function lazyLoadModules(store: any, dynamicModules: object) {
  // @ts-ignore
  for (const [moduleName, moduleFunction] of Object.entries(dynamicModules)) {
    // eslint-disable-next-line no-await-in-loop
    const importedModule = (await moduleFunction()).default
    store.registerModule(moduleName as any, importedModule as any)
  }
}
