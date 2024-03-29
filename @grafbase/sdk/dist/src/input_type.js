"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
var validation_1 = require("./validation");
/**
 * A GraphQL Input Object defines a set of input fields, used in queries and mutations.
 */
var Input = /** @class */ (function () {
    function Input(name) {
        (0, validation_1.validateIdentifier)(name);
        this._name = name;
        this._kind = 'input';
        this.fields = [];
    }
    Object.defineProperty(Input.prototype, "name", {
        /**
         * The name of the input.
         */
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "kind", {
        get: function () {
            return this._kind;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Pushes a field to the input definition.
     *
     * @param name - The name of the field.
     * @param definition - The type definition.
     */
    Input.prototype.field = function (name, definition) {
        this.fields.push(new InputField(name, definition));
        return this;
    };
    Input.prototype.toString = function () {
        var header = "input ".concat(this.name, " {");
        var fields = this.fields.map(function (f) { return "  ".concat(f); }).join('\n');
        var footer = '}';
        return "".concat(header, "\n").concat(fields, "\n").concat(footer);
    };
    return Input;
}());
exports.Input = Input;
var InputField = /** @class */ (function () {
    function InputField(name, shape) {
        (0, validation_1.validateIdentifier)(name);
        this.name = name;
        this.shape = shape;
    }
    InputField.prototype.toString = function () {
        return "".concat(this.name, ": ").concat(this.shape);
    };
    return InputField;
}());
