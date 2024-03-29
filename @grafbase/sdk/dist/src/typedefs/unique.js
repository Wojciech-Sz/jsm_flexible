"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueDefinition = void 0;
var auth_1 = require("./auth");
var cache_1 = require("./cache");
var map_1 = require("./map");
var search_1 = require("./search");
var UniqueDefinition = /** @class */ (function () {
    function UniqueDefinition(scalar, scope) {
        this.scalar = scalar;
        this.compoundScope = scope;
    }
    /**
     * Make the field searchable.
     */
    UniqueDefinition.prototype.search = function () {
        return new search_1.SearchDefinition(this);
    };
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    UniqueDefinition.prototype.auth = function (rules) {
        return new auth_1.AuthDefinition(this, rules);
    };
    /**
     * Set the field-level cache directive.
     *
     * @param params - The cache definition parameters.
     */
    UniqueDefinition.prototype.cache = function (params) {
        return new cache_1.CacheDefinition(this, new cache_1.FieldLevelCache(params));
    };
    /**
     * Sets the name of the field in the database, if different than the name of the field.
     */
    UniqueDefinition.prototype.mapped = function (name) {
        return new map_1.MapDefinition(this, name);
    };
    UniqueDefinition.prototype.toString = function () {
        var _a;
        var scope = (_a = this.compoundScope) === null || _a === void 0 ? void 0 : _a.map(function (field) { return "\"".concat(field, "\""); }).join(', ');
        var scopeArray = scope ? "[".concat(scope, "]") : null;
        return scopeArray
            ? "".concat(this.scalar, " @unique(fields: ").concat(scopeArray, ")")
            : "".concat(this.scalar, " @unique");
    };
    return UniqueDefinition;
}());
exports.UniqueDefinition = UniqueDefinition;
