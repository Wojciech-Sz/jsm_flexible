"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolverDefinition = void 0;
var auth_1 = require("./auth");
var cache_1 = require("./cache");
var ResolverDefinition = /** @class */ (function () {
    function ResolverDefinition(field, resolver) {
        this.field = field;
        this.resolver = resolver;
        this.requiresFields = null;
    }
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    ResolverDefinition.prototype.auth = function (rules) {
        return new auth_1.AuthDefinition(this, rules);
    };
    /**
     * Set the field-level cache directive.
     *
     * @param params - The cache definition parameters.
     */
    ResolverDefinition.prototype.cache = function (params) {
        return new cache_1.CacheDefinition(this, new cache_1.FieldLevelCache(params));
    };
    /**
     * Declares that this resolver requires certain fields to function correctly
     *
     * @param fields - The fields this resolver requires
     */
    ResolverDefinition.prototype.requires = function (fields) {
        this.requiresFields = fields;
        return this;
    };
    ResolverDefinition.prototype.toString = function () {
        var requires = this.requiresFields == null
            ? ''
            : " @requires(fields: \"".concat(this.requiresFields, "\")");
        return "".concat(this.field, " @resolver(name: \"").concat(this.resolver, "\")").concat(requires);
    };
    return ResolverDefinition;
}());
exports.ResolverDefinition = ResolverDefinition;
