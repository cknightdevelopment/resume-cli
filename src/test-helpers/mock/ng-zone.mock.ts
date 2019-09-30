export class NgZoneMock {
  run(func: () => void) {
    func();
  }
}
