"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Headers = exports.Header = void 0;
/**
 * Header used in connector calls.
 */
var Header = /** @class */ (function () {
    function Header(name, value) {
        this.name = name;
        this.value = value;
    }
    Header.prototype.toString = function () {
        var valueStr = this.value.type === 'static'
            ? "value: \"".concat(this.value.value, "\"")
            : "forward: \"".concat(this.value.from, "\"");
        return "{ name: \"".concat(this.name, "\", ").concat(valueStr, " }");
    };
    return Header;
}());
exports.Header = Header;
/**
 * An accumulator class to gather headers for a connector which supports
 * introspection headers.
 */
var Headers = /** @class */ (function () {
    function Headers() {
        this._headers = [];
        this._introspectionHeaders = [];
    }
    Object.defineProperty(Headers.prototype, "headers", {
        /**
         * All headers used in client requests.
         */
        get: function () {
            return this._headers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Headers.prototype, "introspectionHeaders", {
        /**
         * All headers used in introspection requests.
         */
        get: function () {
            return this._introspectionHeaders;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Creates a header used in client requests.
     *
     * @deprecated Use set instead
     * @param name - The name of the header
     * @param value - The value of the header
     */
    Headers.prototype.static = function (name, value) {
        this.headers.push(new Header(name, { type: 'static', value: value }));
    };
    /**
     * Creates a header used in client requests.
     *
     * @param name - The name of the header
     * @param value - The value for the header.  Either a hardcoded string or a header name to forward from.
     */
    Headers.prototype.set = function (name, value) {
        if (typeof value === 'string') {
            this.headers.push(new Header(name, { type: 'static', value: value }));
        }
        else {
            this.headers.push(new Header(name, { type: 'forward', from: value.forward }));
        }
    };
    /**
     * Creates a header used in introspection requests.
     *
     * @param name - The name of the header
     * @param value - The value of the header
     */
    Headers.prototype.introspection = function (name, value) {
        this.introspectionHeaders.push(new Header(name, { type: 'static', value: value }));
    };
    return Headers;
}());
exports.Headers = Headers;
