'use strict';

function AdaptiveImage(img) {
    this.data = img;
}

AdaptiveImage.prototype = {
    get uri() {
        if (typeof window !== 'undefined' && typeof window.devicePixelRatio !== 'undefined') {
            if (window.devicePixelRatio > 2 && this.data['uri@3x']) {
                return this.data['uri@3x'];
            } else if (window.devicePixelRatio > 1 && this.data['uri@2x']) {
                return this.data['uri@2x'];
            }
        }

        return this.data['uri@1x'] || this.data['uri@2x'] || this.data['uri@3x'];
    },
    get width() {
        return this.data.width;
    },
    get height() {
        return this.data.height;
    }
};

module.exports = AdaptiveImage;