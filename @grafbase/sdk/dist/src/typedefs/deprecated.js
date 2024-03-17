"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeprecatedDefinition = void 0;
var auth_1 = require("./auth");
var cache_1 = require("./cache");
var utils_1 = require("../utils");
var resolver_1 = require("./resolver");
var join_1 = require("./join");
var DeprecatedDefinition = /** @class */ (function () {
    function DeprecatedDefinition(field, reason) {
        this.field = field;
        this.reason = reason;
    }
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    DeprecatedDefinition.prototype.auth = function (rules) {
        return new auth_1.AuthDefinition(this, rules);
    };
    /**
     * Attach a resolver function to the field.
     *
     * @param name - The name of the resolver function file without the extension or directory.
     */
    DeprecatedDefinition.prototype.resolver = function (name) {
        return new resolver_1.ResolverDefinition(this, name);
    };
    /**
     * Attach a join function to the field.
     *
     * @param select - The field selection string to join onto this field
     */
    DeprecatedDefinition.prototype.join = function (select) {
        return new join_1.JoinDefinition(this, select);
    };
    /**
     * Set the field-level cache directive.
     *
     * @param params - The cache definition parameters.
     */
    DeprecatedDefinition.prototype.cache = function (params) {
        return new cache_1.CacheDefinition(this, new cache_1.FieldLevelCache(params));
    };
    DeprecatedDefinition.prototype.toString = function () {
        var reason = this.reason ? "(reason: \"".concat((0, utils_1.escapeString)(this.reason), "\")") : '';
        return "".concat(this.field, " @deprecated").concat(reason);
    };
    return DeprecatedDefinition;
}());
exports.DeprecatedDefinition = DeprecatedDefinition;
