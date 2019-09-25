/**
 * Checks to see if the module has already been loaded
 */
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import core modules in the AppModule only.`);
  }
}
