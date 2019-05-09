/*! Built with http://stenciljs.com */
import { h } from '../soon-colorpicker.core.js';

class Colorpicker {
    constructor() {
        this.opened = false;
        this.hasFocus = false;
        this.value = null;
    }
    soonClose() {
        this.onBlur();
    }
    soonOpen() {
        this.opened = true;
        this.onFocus();
    }
    valueChange() {
        this._initColor();
    }
    imageChange(newImage) {
        if (newImage) {
            this._initCanvas();
        }
    }
    handleEnter() {
        this.soonOpen();
    }
    handleESC() {
        this.soonClose();
    }
    componentDidLoad() {
        this._initColor();
        this._initCanvas();
        this.el.addEventListener('focus', () => {
            this.onFocus();
        });
        this.el.addEventListener('blur', () => {
            this.onBlur();
        });
    }
    onBlur() {
        this.hasFocus = false;
        this.opened = false;
        this.soonBlur.emit();
    }
    onFocus() {
        this.hasFocus = true;
        this.soonFocus.emit();
    }
    hasValue() {
        return this.value !== null && this.value !== undefined && this.value !== '';
    }
    hostData() {
        return {
            role: 'colorpicker',
            tabIndex: 0,
            interactive: true,
            class: {
                'has-value': this.hasValue(),
                'has-focus': this.hasFocus
            }
        };
    }
    render() {
        return [h("div", { class: "color", onClick: () => (this.opened = true) }), h("canvas", { class: `selector ${this.opened ? 'opened' : ''}` })];
    }
    _initColor() {
        const color = this.el.shadowRoot.querySelector('.color');
        if (color) {
            if (this.value) {
                color.style.backgroundColor = this.value;
            }
            else {
                color.style.backgroundColor = '#fafbfd';
            }
        }
    }
    _setColor(color) {
        this.value = color;
        this.opened = false;
        const value = this.value;
        this.soonChange.emit({ value });
    }
    _initCanvas() {
        const canvas = this.el.shadowRoot.querySelector('.selector');
        const color = this.el.shadowRoot.querySelector('.color');
        canvas.width = 150;
        canvas.height = 150;
        let selectorImage = new Image();
        selectorImage.crossOrigin = 'Anonymous';
        selectorImage.onload = function () {
            canvas.width = selectorImage.width;
            canvas.height = selectorImage.height;
            canvas.getContext('2d').drawImage(selectorImage, 0, 0, selectorImage.width, selectorImage.height);
            canvas.style.left = '-' + (selectorImage.width / 2 - color.clientWidth / 2) + 'px';
        };
        selectorImage.src = this.image;
        canvas.onmousedown = (event) => {
            event.preventDefault();
            event.stopPropagation();
            var offset = event.target.getBoundingClientRect(), colorData = canvas.getContext('2d').getImageData(event.clientX - offset.left, event.clientY - offset.top, 1, 1).data;
            const colorPicked = this._rgbToHex('rgb(' + colorData[0] + ',' + colorData[1] + ',' + colorData[2] + ')');
            this._setColor(colorPicked);
        };
    }
    _rgbToHex(rgb) {
        var result = rgb.match(/\d+/g);
        function hex(x) {
            var digits = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');
            return isNaN(x) ? '00' : digits[(x - (x % 16)) / 16] + digits[x % 16];
        }
        return '#' + hex(result[0]) + hex(result[1]) + hex(result[2]);
    }
    static get is() { return "soon-colorpicker"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "hasFocus": {
            "state": true
        },
        "image": {
            "type": String,
            "attr": "image",
            "watchCallbacks": ["imageChange"]
        },
        "opened": {
            "state": true
        },
        "soonClose": {
            "method": true
        },
        "soonOpen": {
            "method": true
        },
        "value": {
            "type": String,
            "attr": "value",
            "mutable": true,
            "watchCallbacks": ["valueChange"]
        }
    }; }
    static get events() { return [{
            "name": "soonBlur",
            "method": "soonBlur",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "soonFocus",
            "method": "soonFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "soonChange",
            "method": "soonChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "keydown.enter",
            "method": "handleEnter"
        }, {
            "name": "keydown.escape",
            "method": "handleESC"
        }]; }
    static get style() { return ".sc-soon-colorpicker-h{display:inline-block;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--element-size,32px);height:var(--element-size,32px);border-radius:50%;padding:2px;background:#fff;-webkit-box-shadow:0 0 6px 0 rgba(0,0,0,.1);box-shadow:0 0 6px 0 rgba(0,0,0,.1);vertical-align:middle}.sc-soon-colorpicker-h   .color.sc-soon-colorpicker{display:block;width:calc(var(--element-size, 32px) - 4px);height:calc(var(--element-size, 32px) - 4px);border-radius:50%;background:#fafbfd;cursor:pointer}.sc-soon-colorpicker-h   .selector.sc-soon-colorpicker{position:absolute;visibility:hidden;opacity:0;-webkit-transform:scale(0);transform:scale(0);margin:auto;top:0;bottom:0;cursor:crosshair;-webkit-transition:all .2s ease-in-out;transition:all .2s ease-in-out;z-index:var(--element-zindex,9999)}.sc-soon-colorpicker-h   .selector.opened.sc-soon-colorpicker{visibility:visible;opacity:1;-webkit-transform:scale(1);transform:scale(1)}.sc-soon-colorpicker-h:focus{outline:none}"; }
}

export { Colorpicker as SoonColorpicker };
