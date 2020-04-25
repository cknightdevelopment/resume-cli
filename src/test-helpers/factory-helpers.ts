export function replaceArrayCustomizer(objValue: any, srcValue: any) {
  if (Array.isArray(objValue)) {
    return srcValue;
  }
}
