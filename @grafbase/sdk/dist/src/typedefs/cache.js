"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheDefinition = exports.FieldLevelCache = exports.TypeLevelCache = void 0;
var cache_1 = require("../cache");
var auth_1 = require("./auth");
var map_1 = require("./map");
var search_1 = require("./search");
var TypeLevelCache = /** @class */ (function () {
    function TypeLevelCache(params) {
        this.params = params;
    }
    TypeLevelCache.prototype.toString = function () {
        var maxAge = "maxAge: ".concat(this.params.maxAge);
        var staleWhileRevalidate = this.params.staleWhileRevalidate
            ? ", staleWhileRevalidate: ".concat(this.params.staleWhileRevalidate)
            : '';
        var mutationInvalidation = this.params.mutationInvalidation
            ? ", mutationInvalidation: ".concat((0, cache_1.renderMutationInvalidation)(this.params.mutationInvalidation))
            : '';
        var scopes = this.params.scopes
            ? ", scopes: [".concat(this.params.scopes
                .map(function (scope) { return (0, cache_1.renderAccessScope)(scope); })
                .join(', '), "]")
            : '';
        return "@cache(".concat(maxAge).concat(staleWhileRevalidate).concat(mutationInvalidation).concat(scopes, ")");
    };
    return TypeLevelCache;
}());
exports.TypeLevelCache = TypeLevelCache;
var FieldLevelCache = /** @class */ (function () {
    function FieldLevelCache(params) {
        this.params = params;
    }
    FieldLevelCache.prototype.toString = function () {
        var maxAge = "maxAge: ".concat(this.params.maxAge);
        var staleWhileRevalidate = this.params.staleWhileRevalidate
            ? ", staleWhileRevalidate: ".concat(this.params.staleWhileRevalidate)
            : '';
        var scopes = this.params.scopes
            ? ", scopes: [".concat(this.params.scopes
                .map(function (scope) { return (0, cache_1.renderAccessScope)(scope); })
                .join(', '), "]")
            : '';
        return "@cache(".concat(maxAge).concat(staleWhileRevalidate).concat(scopes, ")");
    };
    return FieldLevelCache;
}());
exports.FieldLevelCache = FieldLevelCache;
var CacheDefinition = /** @class */ (function () {
    function CacheDefinition(field, attribute) {
        this.attribute = attribute;
        this.field = field;
    }
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    CacheDefinition.prototype.auth = function (rules) {
        return new auth_1.AuthDefinition(this, rules);
    };
    /**
     * Make the field searchable.
     */
    CacheDefinition.prototype.search = function () {
        return new search_1.SearchDefinition(this);
    };
    /**
     * Sets the name of the field in the database, if different than the name of the field.
     *
     * @param name - The mapped name
     */
    CacheDefinition.prototype.mapped = function (name) {
        return new map_1.MapDefinition(this, name);
    };
    CacheDefinition.prototype.toString = function () {
        return "".concat(this.field, " ").concat(this.attribute);
    };
    return CacheDefinition;
}());
exports.CacheDefinition = CacheDefinition;
