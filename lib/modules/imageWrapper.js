'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var createImageWrapper = exports.createImageWrapper = function createImageWrapper(classPath) {
    return function (size, images) {
        var scalings = [];

        for (var scaling in images) {
            scalings.push('"uri' + scaling + '": ' + images[scaling] + ',');
        }

        return 'var AdaptiveImage = require( ' + classPath + ' );\nmodule.exports = new AdaptiveImage({\n    ' + scalings.join('') + '\n    width: ' + size.width + ',\n    height: ' + size.height + '\n});';
    };
};