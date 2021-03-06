import { DebugElement } from '@angular/core';
import { CONSTANTS } from 'src/app/models/constants';

/**
 * Button events
 */
export const BUTTON_CLICK_EVENTS = {
  left: { button: 0, bubbles: true },
  right: { button: 2, bubbles: true }
};

/**
 * Button events
 */
export enum KeyboardEventName {
  KEYDOWN = 'keydown',
  KEYUP = 'keyup',
}

/**
 * Simulate element click. Defaults to mouse left-button click event.
 */
export function click(el: DebugElement | HTMLElement, eventObj: any = BUTTON_CLICK_EVENTS.left): Event {
  const event = new Event('click', {
    ...eventObj,
    bubbles: true
  });

  const htmlElement = getHTMLElement(el);
  htmlElement.dispatchEvent(event);

  return event;
}

/**
 * Trigger 'blur' event
 */
export function blur(el: DebugElement | HTMLElement): Event {
  const event = new Event('blur');

  const htmlElement = getHTMLElement(el);
  htmlElement.dispatchEvent(event);

  return event;
}

/**
 * Trigger 'change' event
 */
export function change(el: DebugElement | HTMLElement): Event {
  const event = new Event('change');

  const htmlElement = getHTMLElement(el);
  htmlElement.dispatchEvent(event);

  return event;
}

/**
 * Trigger 'focus' event
 */
export function focus(el: DebugElement | HTMLElement): Event {
  const event = new Event('focus');

  const htmlElement = getHTMLElement(el);
  htmlElement.dispatchEvent(event);

  return event;
}

/**
 * Trigger 'focusin' event
 */
export function focusin(el: DebugElement | HTMLElement): Event {
  const event = new Event('focusin');

  const htmlElement = getHTMLElement(el);
  htmlElement.dispatchEvent(event);

  return event;
}

/**
 * Trigger 'focusout' event
 */
export function focusout(el: DebugElement | HTMLElement): Event {
  const event = new Event('focusout');

  const htmlElement = getHTMLElement(el);
  htmlElement.dispatchEvent(event);

  return event;
}

/**
 * Trigger 'mouseenter' event
 */
export function mouseenter(el: DebugElement | HTMLElement): Event {
  const event = new Event('mouseenter');

  const htmlElement = getHTMLElement(el);
  htmlElement.dispatchEvent(event);

  return event;
}

/**
 * Trigger 'mouseleave' event
 */
export function mouseleave(el: DebugElement | HTMLElement): Event {
  const event = new Event('mouseleave');

  const htmlElement = getHTMLElement(el);
  htmlElement.dispatchEvent(event);

  return event;
}

/***
 * Trigger a keyboard event
 * @param el Element to trigger event on
 * @param name Name of event
 * @param eventInit Initial event data
 */
export function keyboard(el: DebugElement | HTMLElement | Document, name: KeyboardEventName, eventInit: KeyboardEventInit) {
  const event = new KeyboardEvent(name, eventInit);
  const spies = {
    preventDefault: spyOn(event, 'preventDefault').and.callThrough()
  };
  const htmlElement = getHTMLElement(el);

  htmlElement.dispatchEvent(event);
  return spies;
}

export function convertPropertyToGetterSetter<T>(obj: any, propertyName: keyof T, defaultValue?: any): void {
  const backingPropertyName = `___${propertyName}___`;

  Object.defineProperty(obj, backingPropertyName, {
    value: defaultValue,
    writable: true
  });
  Object.defineProperty(obj, propertyName, {
    get() { return this[backingPropertyName]; },
    set(value: any) { this[backingPropertyName] = value; },
  });
}

export function enableAllCommands() {
  CONSTANTS.CLI_OPTIONS.ACTIVE_COMMANDS.random = true;
  CONSTANTS.CLI_OPTIONS.ACTIVE_COMMANDS.help = true;
  CONSTANTS.CLI_OPTIONS.ACTIVE_COMMANDS.education = true;
  CONSTANTS.CLI_OPTIONS.ACTIVE_COMMANDS.skills = true;
  CONSTANTS.CLI_OPTIONS.ACTIVE_COMMANDS.links = true;
  CONSTANTS.CLI_OPTIONS.ACTIVE_COMMANDS.workhistory = true;
  CONSTANTS.CLI_OPTIONS.ACTIVE_COMMANDS.issue = true;
  CONSTANTS.CLI_OPTIONS.ACTIVE_COMMANDS.contact = true;
}

function getHTMLElement(el: DebugElement | HTMLElement | Document): HTMLElement {
  return el instanceof HTMLElement ? el : el instanceof Document ? el as any : el.nativeElement as HTMLElement;
}
