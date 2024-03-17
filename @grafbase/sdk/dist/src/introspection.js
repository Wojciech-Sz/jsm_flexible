"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Introspection = void 0;
var Introspection = /** @class */ (function () {
    function Introspection(params) {
        this.params = params;
    }
    Introspection.prototype.toString = function () {
        return "extend schema @introspection(enable: ".concat(this.params.enabled ? 'true' : 'false', ")\n\n");
    };
    return Introspection;
}());
exports.Introspection = Introspection;
