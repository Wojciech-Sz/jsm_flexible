"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeString = void 0;
var escapeString = function (str) {
    return str.replace(/[\\"']/g, '\\$&');
};
exports.escapeString = escapeString;
