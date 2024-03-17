"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldExtension = exports.TypeExtension = exports.Type = void 0;
var field_1 = require("./field");
var cache_1 = require("./typedefs/cache");
var validation_1 = require("./validation");
var federation_1 = require("./federation");
/**
 * A composite type definition (e.g. not a model).
 */
var Type = /** @class */ (function () {
    function Type(name) {
        (0, validation_1.validateIdentifier)(name);
        this._name = name;
        this.fields = [];
        this.interfaces = [];
        this.keys = [];
        this._kind = 'type';
    }
    Object.defineProperty(Type.prototype, "name", {
        /**
         * The name of the type.
         */
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Type.prototype, "kind", {
        get: function () {
            return this._kind;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Pushes a field to the type definition.
     *
     * @param name - The name of the field.
     * @param definition - The type definition with optional attributes.
     */
    Type.prototype.field = function (name, definition) {
        this.fields.push(new field_1.Field(name, definition));
        return this;
    };
    /**
     * Pushes an interface implemented by the type.
     *
     * @param iface - The interface this type implements.
     */
    Type.prototype.implements = function (iface) {
        this.interfaces.push(iface);
        return this;
    };
    /**
     * Sets the type `@cache` directive.
     *
     * @param params - The cache definition parameters.
     */
    Type.prototype.cache = function (params) {
        this.cacheDirective = new cache_1.TypeLevelCache(params);
        return this;
    };
    /**
     * Marks this type as a federation entitiy with the given key
     *
     * @param fields The fields that make up this key, in FieldSet format
     * @param params The parameters for this key
     */
    Type.prototype.key = function (fields, params) {
        this.keys.push(new federation_1.FederationKey(fields, params));
        return this;
    };
    Type.prototype.toString = function () {
        var _a;
        var interfaces = this.interfaces.map(function (i) { return i.name; }).join(' & ');
        var cache = this.cacheDirective ? " ".concat(this.cacheDirective) : '';
        var keys = this.keys.length != 0
            ? " ".concat(this.keys.map(function (key) { return key.toString(); }).join(' '))
            : '';
        var impl = interfaces ? " implements ".concat(interfaces) : '';
        var header = "type ".concat(this.name).concat(cache).concat(keys).concat(impl, " {");
        var fields = distinct(((_a = this.interfaces.flatMap(function (i) { return i.fields; })) !== null && _a !== void 0 ? _a : []).concat(this.fields))
            .map(function (field) { return "  ".concat(field); })
            .join('\n');
        var footer = '}';
        return "".concat(header, "\n").concat(fields, "\n").concat(footer);
    };
    return Type;
}());
exports.Type = Type;
var TypeExtension = /** @class */ (function () {
    function TypeExtension(type) {
        if (type instanceof Type) {
            this.name = type.name;
        }
        else {
            (0, validation_1.validateIdentifier)(type);
            this.name = type;
        }
        this.queries = [];
        this.keys = [];
        this.fieldExtensions = [];
        this.fieldAdditions = [];
    }
    /**
     * Pushes a query to the extension.
     *
     * @param query - The query to be added.
     */
    TypeExtension.prototype.query = function (query) {
        this.queries.push(query);
        return this;
    };
    /**
     * Extends this type as a federation entity with the given key
     *
     * @param fields The fields that make up this key, in FieldSet format
     * @param params The parameters for this key
     */
    TypeExtension.prototype.key = function (fields, params) {
        this.keys.push(new federation_1.FederationKey(fields, params));
        return this;
    };
    /**
     * Extends a field of this type with additional federation directives
     *
     * @param field The name of the field to extend
     */
    TypeExtension.prototype.addField = function (name, definition) {
        this.fieldAdditions.push(new field_1.Field(name, definition));
    };
    /**
     * Extends a field of this type with additional federation directives
     *
     * @param field The name of the field to extend
     */
    TypeExtension.prototype.addFields = function (fields) {
        for (var _i = 0, _a = Object.entries(fields); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            this.addField(key, value);
        }
    };
    /**
     * Extends a field of this type with additional federation directives
     *
     * @param field The name of the field to extend
     */
    TypeExtension.prototype.extendField = function (field) {
        var fieldExtension = new FieldExtension(field);
        this.fieldExtensions.push(fieldExtension);
        return fieldExtension;
    };
    TypeExtension.prototype.toString = function () {
        var fields = this.queries
            .map(String)
            .concat(this.fieldAdditions.map(String))
            .map(function (field) { return "  ".concat(field); });
        var fieldsString = fields.length > 0 ? " {\n".concat(fields.join('\n'), "\n}") : '';
        var keys = this.keys.length > 0 ? this.keys.map(function (key) { return "\n  ".concat(key); }) : '';
        var fieldExtends = this.fieldExtensions.length > 0
            ? this.fieldExtensions.map(function (field) { return "\n  ".concat(field); })
            : '';
        return "extend type ".concat(this.name).concat(keys).concat(fieldExtends).concat(fieldsString);
    };
    return TypeExtension;
}());
exports.TypeExtension = TypeExtension;
var FieldExtension = /** @class */ (function () {
    function FieldExtension(name) {
        this.name = name;
        this.directives = [];
    }
    /**
     * Adds an inaccessible directive to the field.
     */
    FieldExtension.prototype.inaccessible = function () {
        this.directives.push("inaccesible: true");
        return this;
    };
    /**
     * Adds a shareable directive to the field.
     */
    FieldExtension.prototype.shareable = function () {
        this.directives.push("shareable: true");
        return this;
    };
    /**
     * Adds a override directive to the field.
     */
    FieldExtension.prototype.override = function (from) {
        this.directives.push("override: {from: \"".concat(from, "\"}"));
        return this;
    };
    /**
     * Adds a provides directive to the field.
     */
    FieldExtension.prototype.provides = function (fields) {
        this.directives.push("provides: {fields: \"".concat(fields, "\"}"));
        return this;
    };
    FieldExtension.prototype.toString = function () {
        var directives = this.directives
            .map(function (directive) { return "".concat(directive); })
            .join(', ');
        return "  @extendField(name: \"".concat(this.name, "\", ").concat(directives, ")");
    };
    return FieldExtension;
}());
exports.FieldExtension = FieldExtension;
function distinct(fields) {
    var found = new Set();
    return fields.filter(function (f) {
        if (found.has(f.name)) {
            return false;
        }
        else {
            found.add(f.name);
            return true;
        }
    });
}
