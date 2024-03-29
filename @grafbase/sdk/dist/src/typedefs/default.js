"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDefault = exports.DefaultDefinition = void 0;
var enum_1 = require("../enum");
var typedefs_1 = require("../typedefs");
var auth_1 = require("./auth");
var cache_1 = require("./cache");
var unique_1 = require("./unique");
var map_1 = require("./map");
var inaccessible_1 = require("./inaccessible");
var shareable_1 = require("./shareable");
var override_1 = require("./override");
var provides_1 = require("./provides");
var DefaultDefinition = /** @class */ (function () {
    function DefaultDefinition(scalar, defaultValue) {
        this._defaultValue = defaultValue;
        this._scalar = scalar;
    }
    Object.defineProperty(DefaultDefinition.prototype, "defaultValue", {
        /**
         * The default value.
         */
        get: function () {
            return this._defaultValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DefaultDefinition.prototype, "scalar", {
        /**
         * The default type of the default value.
         */
        get: function () {
            return this._scalar;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Make the field unique.
     */
    DefaultDefinition.prototype.unique = function () {
        return new unique_1.UniqueDefinition(this);
    };
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    DefaultDefinition.prototype.auth = function (rules) {
        return new auth_1.AuthDefinition(this, rules);
    };
    /**
     * Set the field-level cache directive.
     *
     * @param params - The cache definition parameters.
     */
    DefaultDefinition.prototype.cache = function (params) {
        return new cache_1.CacheDefinition(this, new cache_1.FieldLevelCache(params));
    };
    /**
     * Sets the name of the field in the database, if different than the name of the field.
     */
    DefaultDefinition.prototype.mapped = function (name) {
        return new map_1.MapDefinition(this, name);
    };
    /**
     * Set the field-level inaccessible directive.
     */
    DefaultDefinition.prototype.inaccessible = function () {
        return new inaccessible_1.InaccessibleDefinition(this);
    };
    /**
     * Set the field-level shareable directive.
     */
    DefaultDefinition.prototype.shareable = function () {
        return new shareable_1.ShareableDefinition(this);
    };
    /**
     * Set the field-level override directive.
     */
    DefaultDefinition.prototype.override = function (from) {
        return new override_1.OverrideDefinition(this, from);
    };
    /**
     * Set the field-level provides directive.
     */
    DefaultDefinition.prototype.provides = function (fields) {
        return new provides_1.ProvidesDefinition(this, fields);
    };
    DefaultDefinition.prototype.toString = function () {
        return "".concat(this._scalar, " @default(value: ").concat(renderDefault(this._defaultValue, this._scalar.fieldTypeVal()), ")");
    };
    return DefaultDefinition;
}());
exports.DefaultDefinition = DefaultDefinition;
function renderDefault(val, fieldType) {
    var pad2 = function (n) {
        return n < 10 ? "0".concat(n) : "".concat(n);
    };
    var pad4 = function (n) {
        if (n < 10) {
            return "000".concat(n);
        }
        else if (n < 100) {
            return "00".concat(n);
        }
        else if (n < 1000) {
            return "0".concat(n);
        }
        else {
            return "".concat(n);
        }
    };
    if (fieldType instanceof enum_1.Enum) {
        return val.toString();
    }
    else {
        switch (fieldType) {
            case typedefs_1.FieldType.String:
            case typedefs_1.FieldType.ID:
            case typedefs_1.FieldType.Email:
            case typedefs_1.FieldType.PhoneNumber:
            case typedefs_1.FieldType.IPAddress:
            case typedefs_1.FieldType.URL: {
                return "\"".concat(val, "\"");
            }
            case typedefs_1.FieldType.Date: {
                var year_1 = pad4(val.getUTCFullYear());
                var month_1 = pad2(val.getUTCMonth() + 1);
                var date_1 = pad2(val.getUTCDate());
                return "\"".concat(year_1, "-").concat(month_1, "-").concat(date_1, "\"");
            }
            case typedefs_1.FieldType.DateTime:
                var year = pad4(val.getUTCFullYear());
                var month = pad2(val.getUTCMonth() + 1);
                var date = pad2(val.getUTCDate());
                var hours = pad2(val.getUTCHours());
                var minutes = pad2(val.getUTCMinutes());
                var seconds = pad2(val.getUTCSeconds());
                return "\"".concat(year, "-").concat(month, "-").concat(date, "T").concat(hours, ":").concat(minutes, ":").concat(seconds, "Z\"");
            default: {
                return val.toString();
            }
        }
    }
}
exports.renderDefault = renderDefault;
