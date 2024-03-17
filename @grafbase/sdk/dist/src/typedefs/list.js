"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateListDefinition = exports.BooleanListDefinition = exports.NumberListDefinition = exports.StringListDefinition = exports.BigIntListDefinition = exports.BytesListDefinition = exports.DecimalListDefinition = exports.ListDefinition = void 0;
var auth_1 = require("../auth");
var default_1 = require("./default");
var search_1 = require("./search");
var length_limited_string_1 = require("./length-limited-string");
var map_1 = require("./map");
var utils_1 = require("../utils");
var ListDefinition = /** @class */ (function () {
    function ListDefinition(fieldDefinition) {
        this.fieldDefinition = fieldDefinition;
        this.isOptional = false;
        this.otherDirectives = [];
    }
    /**
     * Make the field optional.
     */
    ListDefinition.prototype.optional = function () {
        this.isOptional = true;
        return this;
    };
    /**
     * Make the field searchable.
     */
    ListDefinition.prototype.search = function () {
        return new search_1.SearchDefinition(this);
    };
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    ListDefinition.prototype.auth = function (rules) {
        var authRules = new auth_1.AuthRules();
        rules(authRules);
        this.authRules = authRules;
        return this;
    };
    /**
     * Attach a resolver function to the field.
     *
     * @param name - The name of the resolver function file without the extension or directory.
     */
    ListDefinition.prototype.resolver = function (name) {
        this.resolverName = name;
        return this;
    };
    /**
     * Attach a join function to the field.
     *
     * @param select - The field selection string to join onto this field
     */
    ListDefinition.prototype.join = function (select) {
        this.joinSelect = select;
        return this;
    };
    /**
     * Sets the name of the field in the database, if different than the name of the field.
     *
     * @param name - The mapped name
     */
    ListDefinition.prototype.mapped = function (name) {
        return new map_1.MapDefinition(this, name);
    };
    /**
     * Adds a tag to this field
     *
     * @param tag - The tag to add
     */
    ListDefinition.prototype.tag = function (name) {
        this.otherDirectives.push("@tag(name: ".concat((0, utils_1.escapeString)(name), ")"));
        return this;
    };
    /**
     * Set the field-level inaccessible directive.
     */
    ListDefinition.prototype.inaccessible = function () {
        this.otherDirectives.push("@inaccessible");
        return this;
    };
    /**
     * Set the field-level shareable directive.
     */
    ListDefinition.prototype.shareable = function () {
        this.otherDirectives.push("@shareable");
        return this;
    };
    /**
     * Set the field-level override directive.
     */
    ListDefinition.prototype.override = function (from) {
        this.otherDirectives.push("@override(from: ".concat(from, ")"));
        return this;
    };
    /**
     * Set the field-level provides directive.
     */
    ListDefinition.prototype.provides = function (fields) {
        this.otherDirectives.push("@provides(fields: ".concat(fields, ")"));
        return this;
    };
    ListDefinition.prototype.toString = function () {
        var required = this.isOptional ? '' : '!';
        var rules = this.authRules
            ? " @auth(rules: ".concat(this.authRules.toString().replace(/\s\s+/g, ' '), ")")
            : '';
        var resolver = this.resolverName
            ? " @resolver(name: \"".concat(this.resolverName, "\")")
            : '';
        var join = this.joinSelect ? " @join(select: \"".concat(this.joinSelect, "\")") : '';
        var otherDirectives = this.otherDirectives.length != 0
            ? " ".concat(this.otherDirectives.join(' '))
            : '';
        return "[".concat(this.fieldDefinition, "]").concat(required).concat(rules).concat(resolver).concat(join).concat(otherDirectives);
    };
    return ListDefinition;
}());
exports.ListDefinition = ListDefinition;
var ListWithDefaultDefinition = /** @class */ (function (_super) {
    __extends(ListWithDefaultDefinition, _super);
    function ListWithDefaultDefinition(fieldDefinition) {
        var _this = _super.call(this, fieldDefinition) || this;
        _this._fieldType = fieldDefinition.fieldType;
        return _this;
    }
    ListWithDefaultDefinition.prototype.toString = function () {
        var _this = this;
        var defaultValue = this.defaultValue != null
            ? " @default(value: [".concat(this.defaultValue
                .map(function (v) { return (0, default_1.renderDefault)(v, _this._fieldType); })
                .join(', '), "])")
            : '';
        return "".concat(_super.prototype.toString.call(this)).concat(defaultValue);
    };
    return ListWithDefaultDefinition;
}(ListDefinition));
var DecimalListDefinition = /** @class */ (function (_super) {
    __extends(DecimalListDefinition, _super);
    function DecimalListDefinition(fieldDefinition) {
        return _super.call(this, fieldDefinition) || this;
    }
    Object.defineProperty(DecimalListDefinition.prototype, "fieldType", {
        /**
         * The type of the field
         */
        get: function () {
            return this._fieldType;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    DecimalListDefinition.prototype.default = function (val) {
        this.defaultValue = val;
        return this;
    };
    return DecimalListDefinition;
}(ListWithDefaultDefinition));
exports.DecimalListDefinition = DecimalListDefinition;
var BytesListDefinition = /** @class */ (function (_super) {
    __extends(BytesListDefinition, _super);
    function BytesListDefinition(fieldDefinition) {
        return _super.call(this, fieldDefinition) || this;
    }
    Object.defineProperty(BytesListDefinition.prototype, "fieldType", {
        /**
         * The type of the field
         */
        get: function () {
            return this._fieldType;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    BytesListDefinition.prototype.default = function (val) {
        this.defaultValue = val;
        return this;
    };
    return BytesListDefinition;
}(ListWithDefaultDefinition));
exports.BytesListDefinition = BytesListDefinition;
var BigIntListDefinition = /** @class */ (function (_super) {
    __extends(BigIntListDefinition, _super);
    function BigIntListDefinition(fieldDefinition) {
        return _super.call(this, fieldDefinition) || this;
    }
    Object.defineProperty(BigIntListDefinition.prototype, "fieldType", {
        /**
         * The type of the field
         */
        get: function () {
            return this._fieldType;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    BigIntListDefinition.prototype.default = function (val) {
        this.defaultValue = val;
        return this;
    };
    return BigIntListDefinition;
}(ListWithDefaultDefinition));
exports.BigIntListDefinition = BigIntListDefinition;
var StringListDefinition = /** @class */ (function (_super) {
    __extends(StringListDefinition, _super);
    function StringListDefinition(fieldDefinition) {
        return _super.call(this, fieldDefinition) || this;
    }
    Object.defineProperty(StringListDefinition.prototype, "fieldType", {
        /**
         * The type of the field
         */
        get: function () {
            return this._fieldType;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Specify a minimum or a maximum (or both) length of the field.
     *
     * @param fieldLength - Either `min`, `max` or both.
     */
    StringListDefinition.prototype.length = function (fieldLength) {
        return new length_limited_string_1.LengthLimitedStringDefinition(this, fieldLength);
    };
    /**
     * Sets the name of the field in the database, if different than the name of the field.
     *
     * @param name - The mapped name
     */
    StringListDefinition.prototype.map = function (name) {
        return new map_1.MapDefinition(this, name);
    };
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    StringListDefinition.prototype.default = function (val) {
        this.defaultValue = val;
        return this;
    };
    return StringListDefinition;
}(ListWithDefaultDefinition));
exports.StringListDefinition = StringListDefinition;
var NumberListDefinition = /** @class */ (function (_super) {
    __extends(NumberListDefinition, _super);
    function NumberListDefinition(fieldDefinition) {
        return _super.call(this, fieldDefinition) || this;
    }
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    NumberListDefinition.prototype.default = function (val) {
        this.defaultValue = val;
        return this;
    };
    return NumberListDefinition;
}(ListWithDefaultDefinition));
exports.NumberListDefinition = NumberListDefinition;
var BooleanListDefinition = /** @class */ (function (_super) {
    __extends(BooleanListDefinition, _super);
    function BooleanListDefinition(fieldDefinition) {
        return _super.call(this, fieldDefinition) || this;
    }
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    BooleanListDefinition.prototype.default = function (val) {
        this.defaultValue = val;
        return this;
    };
    return BooleanListDefinition;
}(ListWithDefaultDefinition));
exports.BooleanListDefinition = BooleanListDefinition;
var DateListDefinition = /** @class */ (function (_super) {
    __extends(DateListDefinition, _super);
    function DateListDefinition(fieldDefinition) {
        return _super.call(this, fieldDefinition) || this;
    }
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    DateListDefinition.prototype.default = function (val) {
        this.defaultValue = val;
        return this;
    };
    return DateListDefinition;
}(ListWithDefaultDefinition));
exports.DateListDefinition = DateListDefinition;
