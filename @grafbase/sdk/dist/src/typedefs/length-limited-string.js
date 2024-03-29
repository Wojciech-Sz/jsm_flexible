"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LengthLimitedStringDefinition = void 0;
var unique_1 = require("./unique");
var default_1 = require("./default");
var search_1 = require("./search");
var auth_1 = require("./auth");
var cache_1 = require("./cache");
var map_1 = require("./map");
var LengthLimitedStringDefinition = /** @class */ (function () {
    function LengthLimitedStringDefinition(scalar, fieldLength) {
        this.fieldLength = fieldLength;
        this.scalar = scalar;
    }
    /**
     * Make the field unique.
     *
     * @param scope - Additional fields to be added to the constraint.
     */
    LengthLimitedStringDefinition.prototype.unique = function (scope) {
        return new unique_1.UniqueDefinition(this, scope);
    };
    /**
     * Make the field searchable.
     */
    LengthLimitedStringDefinition.prototype.search = function () {
        return new search_1.SearchDefinition(this);
    };
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    LengthLimitedStringDefinition.prototype.default = function (val) {
        return new default_1.DefaultDefinition(this, val);
    };
    /**
     * Set the field optional.
     */
    LengthLimitedStringDefinition.prototype.optional = function () {
        this.scalar.optional();
        return this;
    };
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    LengthLimitedStringDefinition.prototype.auth = function (rules) {
        return new auth_1.AuthDefinition(this, rules);
    };
    /**
     * Set the field-level cache directive.
     *
     * @param params - The cache definition parameters.
     */
    LengthLimitedStringDefinition.prototype.cache = function (params) {
        return new cache_1.CacheDefinition(this, new cache_1.FieldLevelCache(params));
    };
    /**
     * Sets the name of the field in the database, if different than the name of the field.
     */
    LengthLimitedStringDefinition.prototype.mapped = function (name) {
        return new map_1.MapDefinition(this, name);
    };
    LengthLimitedStringDefinition.prototype.toString = function () {
        var length = this.fieldLength;
        if (length.min != null && length.max != null) {
            return "".concat(this.scalar, " @length(min: ").concat(length.min, ", max: ").concat(length.max, ")");
        }
        else if (length.min != null) {
            return "".concat(this.scalar, " @length(min: ").concat(length.min, ")");
        }
        else {
            return "".concat(this.scalar, " @length(max: ").concat(length.max, ")");
        }
    };
    LengthLimitedStringDefinition.prototype.fieldTypeVal = function () {
        return this.scalar.fieldType;
    };
    return LengthLimitedStringDefinition;
}());
exports.LengthLimitedStringDefinition = LengthLimitedStringDefinition;
