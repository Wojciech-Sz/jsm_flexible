"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FederationKey = exports.Federation = void 0;
var Federation = /** @class */ (function () {
    function Federation(params) {
        this.version = params.version;
    }
    Federation.prototype.toString = function () {
        return "\nextend schema @federation(version: \"".concat(this.version, "\")\n");
    };
    return Federation;
}());
exports.Federation = Federation;
var DefaultFederationParameters = {
    resolvable: true
};
var FederationKey = /** @class */ (function () {
    function FederationKey(fields, parameters) {
        parameters = parameters || {};
        this.fields = fields;
        this.parameters = __assign(__assign({}, DefaultFederationParameters), parameters);
    }
    FederationKey.prototype.toString = function () {
        var select = this.parameters.select
            ? " select: \"".concat(this.parameters.select, "\"")
            : '';
        return "@key(fields: \"".concat(this.fields, "\" resolvable: ").concat(this.parameters.resolvable).concat(select, ")");
    };
    return FederationKey;
}());
exports.FederationKey = FederationKey;
