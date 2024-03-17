"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationLimits = void 0;
// FIXME: Find a way to "reflect" the keys of the interface above.
var OPERATION_LIMITS_PARAMS_KEYS = [
    'aliases',
    'complexity',
    'depth',
    'height',
    'rootFields'
];
var OperationLimits = /** @class */ (function () {
    function OperationLimits(params) {
        this.params = params;
    }
    OperationLimits.prototype.toString = function () {
        var _this = this;
        var parameters = OPERATION_LIMITS_PARAMS_KEYS.map(function (key) {
            return _this.params[key] ? "".concat(key, ": ").concat(_this.params[key]) : null;
        })
            .filter(function (value) { return value != null; })
            .join(', ');
        if (parameters.length === 0) {
            return '';
        }
        else {
            return "extend schema\n  @operationLimits(".concat(parameters, ")\n\n");
        }
    };
    return OperationLimits;
}());
exports.OperationLimits = OperationLimits;
