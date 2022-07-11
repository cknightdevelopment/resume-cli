import { ReplaySubject } from 'rxjs';
import { EventEmitter } from '@angular/core';

interface ReplayEventEmitterOptions {
  buffer: number;
}

class ReplayEventEmitter<T> extends ReplaySubject<T> {}

const defaultOptions = {
  buffer: null
} as ReplayEventEmitterOptions;

export function createReplayEventEmitter<T>(
  emitter: EventEmitter<T>,
  options: ReplayEventEmitterOptions = defaultOptions
): ReplayEventEmitter<T> {
  const replaySubject = new ReplaySubject<T>(options.buffer);
  emitter.subscribe(replaySubject);
  return replaySubject;
}

export function toReplayEventEmitter<T>(
  component: T,
  key: keyof T,
  options: ReplayEventEmitterOptions = defaultOptions
): void {
  const replaySubject = new ReplaySubject<T>(options.buffer);
  // eslint-disable-next-line dot-notation, @typescript-eslint/dot-notation
  replaySubject['emit'] = replaySubject.next;
  component[key] = replaySubject as any;
}

export function makeEventEmittersReplayable(component: any) {
  for (const key in component) {
    if (component.hasOwnProperty(key)) {
      const element = component[key];
      if (element && typeof element.emit === 'function') {
        toReplayEventEmitter(component, key);
      }
    }
  }
}
