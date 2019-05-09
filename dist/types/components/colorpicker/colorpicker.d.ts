import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class Colorpicker {
    el: HTMLElement;
    opened: boolean;
    hasFocus: boolean;
    /**
     * Image palette for the colorpicker. You can use any color palette as you want.
     * For example: https://www.color-hex.com/color-palettes/
     */
    image: string;
    /**
     * Value as a string represent the color in hexadecimal with #.
     */
    value: string;
    /**
     * Emitted when the input loses focus.
     */
    soonBlur: EventEmitter<void>;
    /**
     * Emitted when the input has focus.
     */
    soonFocus: EventEmitter<void>;
    /**
     * Emitted when the value has changed.
     */
    soonChange: EventEmitter<any>;
    /**
     * Method to manually close the color palette.
     */
    soonClose(): void;
    /**
     * Method to manually open the color palette.
     */
    soonOpen(): void;
    valueChange(): void;
    imageChange(newImage: string): void;
    handleEnter(): void;
    handleESC(): void;
    componentDidLoad(): void;
    private onBlur;
    private onFocus;
    hasValue(): boolean;
    hostData(): {
        role: string;
        tabIndex: number;
        interactive: boolean;
        class: {
            'has-value': boolean;
            'has-focus': boolean;
        };
    };
    render(): JSX.Element[];
    private _initColor;
    private _setColor;
    private _initCanvas;
    /**
     * Convert rgb to hex
     */
    private _rgbToHex;
}
