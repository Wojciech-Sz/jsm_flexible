"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Union = void 0;
var validation_1 = require("./validation");
/**
 * A builder to create a GraphQL union.
 */
var Union = /** @class */ (function () {
    function Union(name) {
        (0, validation_1.validateIdentifier)(name);
        this.name = name;
        this.types = [];
        this._kind = 'union';
    }
    /**
     * Push a new type to the union definition.
     *
     * @param type - The included type.
     */
    Union.prototype.type = function (type) {
        this.types.push(type.name);
        return this;
    };
    Object.defineProperty(Union.prototype, "kind", {
        get: function () {
            return this._kind;
        },
        enumerable: false,
        configurable: true
    });
    Union.prototype.toString = function () {
        var types = this.types.join(' | ');
        return "union ".concat(this.name, " = ").concat(types);
    };
    return Union;
}());
exports.Union = Union;
