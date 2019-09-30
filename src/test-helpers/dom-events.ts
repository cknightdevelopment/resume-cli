import { DebugElement } from '@angular/core';

/**
 * Button events
 */
export const ButtonClickEvents = {
  left: { button: 0 },
  right: { button: 2 }
};

/**
 * Button events
 */
export enum KeyboardEventName {
  KEYDOWN = 'keydown'
}

/**
 * Simulate element click. Defaults to mouse left-button click event.
 */
export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): Event {
  const event = new Event('click', eventObj);
  if (el instanceof HTMLElement) {
    el.dispatchEvent(event);
  } else {
    el.triggerEventHandler('click', eventObj);
  }

  return event;
}

export function keydown(el: DebugElement | HTMLElement, name: KeyboardEventName, eventInit: KeyboardEventInit) {
  const event = new KeyboardEvent(name, eventInit);
  const spies = {
    preventDefault: spyOn(event, 'preventDefault').and.callThrough()
  };

  if (el instanceof HTMLElement) {
    el.dispatchEvent(event);
  } else {
    el.triggerEventHandler(name, event);
  }

  return spies;
}
