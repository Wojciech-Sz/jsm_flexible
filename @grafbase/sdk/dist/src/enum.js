"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enum = void 0;
var validation_1 = require("./validation");
var Enum = /** @class */ (function () {
    function Enum(name, variants) {
        (0, validation_1.validateIdentifier)(name);
        variants.forEach(function (variant) { return (0, validation_1.validateIdentifier)(variant); });
        this._name = name;
        this._variants = variants;
        this._kind = 'enum';
    }
    Object.defineProperty(Enum.prototype, "name", {
        /**
         * The name of the enum.
         */
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Enum.prototype, "variants", {
        /**
         * A list of variants in the enum.
         */
        get: function () {
            return this._variants;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Enum.prototype, "kind", {
        get: function () {
            return this._kind;
        },
        enumerable: false,
        configurable: true
    });
    Enum.prototype.toString = function () {
        var header = "enum ".concat(this.name, " {");
        var variants = this.variants
            .map(function (variant) { return "  ".concat(variant.toString()); })
            .join(',\n');
        var footer = '}';
        return "".concat(header, "\n").concat(variants, "\n").concat(footer);
    };
    return Enum;
}());
exports.Enum = Enum;
