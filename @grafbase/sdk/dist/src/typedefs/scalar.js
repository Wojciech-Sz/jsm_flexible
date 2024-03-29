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
exports.ObjectDefinition = exports.DateDefinition = exports.BooleanDefinition = exports.NumberDefinition = exports.StringDefinition = exports.BigIntDefinition = exports.BytesDefinition = exports.DecimalDefinition = exports.ScalarDefinition = void 0;
var enum_1 = require("../enum");
var list_1 = require("./list");
var default_1 = require("./default");
var length_limited_string_1 = require("./length-limited-string");
var search_1 = require("./search");
var unique_1 = require("./unique");
var auth_1 = require("./auth");
var resolver_1 = require("./resolver");
var cache_1 = require("./cache");
var map_1 = require("./map");
var join_1 = require("./join");
var deprecated_1 = require("./deprecated");
var inaccessible_1 = require("./inaccessible");
var shareable_1 = require("./shareable");
var override_1 = require("./override");
var provides_1 = require("./provides");
var tag_1 = require("./tag");
var ScalarDefinition = /** @class */ (function () {
    function ScalarDefinition(fieldType) {
        this._fieldType = fieldType;
        this.isOptional = false;
    }
    Object.defineProperty(ScalarDefinition.prototype, "fieldType", {
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
     * Make the field optional.
     */
    ScalarDefinition.prototype.optional = function () {
        this.isOptional = true;
        return this;
    };
    /**
     * Make the field unique.
     *
     * @param scope - Additional fields to be added to the constraint.
     */
    ScalarDefinition.prototype.unique = function (scope) {
        return new unique_1.UniqueDefinition(this, scope);
    };
    /**
     * Make the field searchable.
     */
    ScalarDefinition.prototype.search = function () {
        return new search_1.SearchDefinition(this);
    };
    /**
     * Allow multiple scalars to be used as values for the field.
     */
    ScalarDefinition.prototype.list = function () {
        return new list_1.ListDefinition(this);
    };
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    ScalarDefinition.prototype.auth = function (rules) {
        return new auth_1.AuthDefinition(this, rules);
    };
    /**
     * Set the field-level deprecated directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    ScalarDefinition.prototype.deprecated = function (reason) {
        return new deprecated_1.DeprecatedDefinition(this, reason !== null && reason !== void 0 ? reason : null);
    };
    /**
     * Attach a resolver function to the field.
     *
     * @param name - The name of the resolver function file without the extension or directory.
     */
    ScalarDefinition.prototype.resolver = function (name) {
        return new resolver_1.ResolverDefinition(this, name);
    };
    /**
     * Attach a join function to the field.
     *
     * @param select - The field selection string to join onto this field
     */
    ScalarDefinition.prototype.join = function (select) {
        return new join_1.JoinDefinition(this, select);
    };
    /**
     * Set the field-level cache directive.
     *
     * @param params - The cache definition parameters.
     */
    ScalarDefinition.prototype.cache = function (params) {
        return new cache_1.CacheDefinition(this, new cache_1.FieldLevelCache(params));
    };
    /**
     * Sets the name of the field in the database, if different than the name of the field.
     *
     * Only supported on MongoDB.
     */
    ScalarDefinition.prototype.mapped = function (name) {
        return new map_1.MapDefinition(this, name);
    };
    /**
     * Set the field-level inaccessible directive.
     */
    ScalarDefinition.prototype.inaccessible = function () {
        return new inaccessible_1.InaccessibleDefinition(this);
    };
    /**
     * Set the field-level shareable directive.
     */
    ScalarDefinition.prototype.shareable = function () {
        return new shareable_1.ShareableDefinition(this);
    };
    /**
     * Set the field-level override directive.
     */
    ScalarDefinition.prototype.override = function (from) {
        return new override_1.OverrideDefinition(this, from);
    };
    /**
     * Set the field-level provides directive.
     */
    ScalarDefinition.prototype.provides = function (fields) {
        return new provides_1.ProvidesDefinition(this, fields);
    };
    /**
     * Adds a tag to this field
     *
     * @param tag - The tag to add
     */
    ScalarDefinition.prototype.tag = function (tag) {
        return new tag_1.TagDefinition(this, tag);
    };
    ScalarDefinition.prototype.fieldTypeVal = function () {
        return this.fieldType;
    };
    ScalarDefinition.prototype.toString = function () {
        var required = this.isOptional ? '' : '!';
        var fieldType;
        if (this.fieldType instanceof enum_1.Enum) {
            fieldType = this.fieldType.name;
        }
        else {
            fieldType = this.fieldType.toString();
        }
        return "".concat(fieldType).concat(required);
    };
    return ScalarDefinition;
}());
exports.ScalarDefinition = ScalarDefinition;
var DecimalDefinition = /** @class */ (function (_super) {
    __extends(DecimalDefinition, _super);
    function DecimalDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    DecimalDefinition.prototype.default = function (value) {
        return new default_1.DefaultDefinition(this, value);
    };
    /**
     * Allow multiple scalars to be used as values for the field.
     */
    DecimalDefinition.prototype.list = function () {
        return new list_1.DecimalListDefinition(this);
    };
    return DecimalDefinition;
}(ScalarDefinition));
exports.DecimalDefinition = DecimalDefinition;
var BytesDefinition = /** @class */ (function (_super) {
    __extends(BytesDefinition, _super);
    function BytesDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    BytesDefinition.prototype.default = function (value) {
        return new default_1.DefaultDefinition(this, value);
    };
    /**
     * Allow multiple scalars to be used as values for the field.
     */
    BytesDefinition.prototype.list = function () {
        return new list_1.BytesListDefinition(this);
    };
    return BytesDefinition;
}(ScalarDefinition));
exports.BytesDefinition = BytesDefinition;
var BigIntDefinition = /** @class */ (function (_super) {
    __extends(BigIntDefinition, _super);
    function BigIntDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    BigIntDefinition.prototype.default = function (value) {
        return new default_1.DefaultDefinition(this, value);
    };
    /**
     * Allow multiple scalars to be used as values for the field.
     */
    BigIntDefinition.prototype.list = function () {
        return new list_1.BigIntListDefinition(this);
    };
    return BigIntDefinition;
}(ScalarDefinition));
exports.BigIntDefinition = BigIntDefinition;
var StringDefinition = /** @class */ (function (_super) {
    __extends(StringDefinition, _super);
    function StringDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    StringDefinition.prototype.default = function (value) {
        return new default_1.DefaultDefinition(this, value);
    };
    /**
     * Specify a minimum or a maximum (or both) length of the field.
     *
     * @param fieldLength - Either `min`, `max` or both.
     */
    StringDefinition.prototype.length = function (fieldLength) {
        return new length_limited_string_1.LengthLimitedStringDefinition(this, fieldLength);
    };
    /**
     * Allow multiple scalars to be used as values for the field.
     */
    StringDefinition.prototype.list = function () {
        return new list_1.StringListDefinition(this);
    };
    return StringDefinition;
}(ScalarDefinition));
exports.StringDefinition = StringDefinition;
var NumberDefinition = /** @class */ (function (_super) {
    __extends(NumberDefinition, _super);
    function NumberDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    NumberDefinition.prototype.default = function (value) {
        return new default_1.DefaultDefinition(this, value);
    };
    /**
     * Allow multiple scalars to be used as values for the field.
     */
    NumberDefinition.prototype.list = function () {
        return new list_1.NumberListDefinition(this);
    };
    return NumberDefinition;
}(ScalarDefinition));
exports.NumberDefinition = NumberDefinition;
var BooleanDefinition = /** @class */ (function (_super) {
    __extends(BooleanDefinition, _super);
    function BooleanDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    BooleanDefinition.prototype.default = function (value) {
        return new default_1.DefaultDefinition(this, value);
    };
    /**
     * Allow multiple scalars to be used as values for the field.
     */
    BooleanDefinition.prototype.list = function () {
        return new list_1.BooleanListDefinition(this);
    };
    return BooleanDefinition;
}(ScalarDefinition));
exports.BooleanDefinition = BooleanDefinition;
var DateDefinition = /** @class */ (function (_super) {
    __extends(DateDefinition, _super);
    function DateDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    DateDefinition.prototype.default = function (value) {
        return new default_1.DefaultDefinition(this, value);
    };
    /**
     * Allow multiple scalars to be used as values for the field.
     */
    DateDefinition.prototype.list = function () {
        return new list_1.DateListDefinition(this);
    };
    return DateDefinition;
}(ScalarDefinition));
exports.DateDefinition = DateDefinition;
var ObjectDefinition = /** @class */ (function (_super) {
    __extends(ObjectDefinition, _super);
    function ObjectDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    ObjectDefinition.prototype.default = function (value) {
        return new default_1.DefaultDefinition(this, value);
    };
    return ObjectDefinition;
}(ScalarDefinition));
exports.ObjectDefinition = ObjectDefinition;
