"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interface = void 0;
var field_1 = require("./field");
var validation_1 = require("./validation");
var Interface = /** @class */ (function () {
    function Interface(name) {
        (0, validation_1.validateIdentifier)(name);
        this._name = name;
        this._fields = [];
        this._kind = 'interface';
    }
    /**
     * Push a new field to the interface definition.
     *
     * @param name - The name of the field.
     * @param definition - The type and attirbutes of the field.
     */
    Interface.prototype.field = function (name, definition) {
        this.fields.push(new field_1.Field(name, definition));
        return this;
    };
    Object.defineProperty(Interface.prototype, "fields", {
        /**
         * All fields that belong to the interface.
         */
        get: function () {
            return this._fields;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interface.prototype, "kind", {
        get: function () {
            return this._kind;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interface.prototype, "name", {
        /**
         * The name of the interface.
         */
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Interface.prototype.toString = function () {
        var header = "interface ".concat(this.name, " {");
        var fields = this.fields.map(function (field) { return "  ".concat(field); }).join('\n');
        var footer = '}';
        return "".concat(header, "\n").concat(fields, "\n").concat(footer);
    };
    return Interface;
}());
exports.Interface = Interface;
