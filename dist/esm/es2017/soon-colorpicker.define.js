
// SoonColorpicker: Custom Elements Define Library, ES Module/es2017 Target

import { defineCustomElement } from './soon-colorpicker.core.js';
import {
  Colorpicker
} from './soon-colorpicker.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    Colorpicker
  ], opts);
}
