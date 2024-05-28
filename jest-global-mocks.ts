import { jest } from '@jest/globals';

Object.defineProperty(window, 'CSS', { value: null });

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    display: 'none',
    appearance: ['-webkit-appearance'],
  }),
});

/**
 * ISSUE: https:
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
  value: () => ({
    enumerable: true,
    configurable: true,
  }),
});

HTMLCanvasElement.prototype.getContext = <
  typeof HTMLCanvasElement.prototype.getContext
>jest.fn();
