"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDefinition = void 0;
var auth_1 = require("../auth");
var cache_1 = require("./cache");
var search_1 = require("./search");
var unique_1 = require("./unique");
var map_1 = require("./map");
var AuthDefinition = /** @class */ (function () {
    function AuthDefinition(field, rules) {
        var authRules = new auth_1.AuthRules();
        rules(authRules);
        this.authRules = authRules;
        this.field = field;
    }
    /**
     * Make the field searchable.
     */
    AuthDefinition.prototype.search = function () {
        return new search_1.SearchDefinition(this);
    };
    /**
     * Make the field unique.
     *
     * @param scope - Additional fields to be added to the constraint.
     */
    AuthDefinition.prototype.unique = function (scope) {
        return new unique_1.UniqueDefinition(this, scope);
    };
    /**
     * Set the field-level cache directive.
     *
     * @param params - The cache definition parameters.
     */
    AuthDefinition.prototype.cache = function (params) {
        return new cache_1.CacheDefinition(this, new cache_1.FieldLevelCache(params));
    };
    /**
     * Sets the name of the field in the database, if different than the name of the field.
     */
    AuthDefinition.prototype.mapped = function (name) {
        return new map_1.MapDefinition(this, name);
    };
    AuthDefinition.prototype.toString = function () {
        // In field definition, concatenate all rules into one row.
        var rules = this.authRules.toString().replace(/\s\s+/g, ' ');
        return "".concat(this.field, " @auth(rules: ").concat(rules, ")");
    };
    return AuthDefinition;
}());
exports.AuthDefinition = AuthDefinition;
