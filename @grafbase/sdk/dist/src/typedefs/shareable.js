"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareableDefinition = void 0;
var auth_1 = require("./auth");
var cache_1 = require("./cache");
var resolver_1 = require("./resolver");
var join_1 = require("./join");
var tag_1 = require("./tag");
var ShareableDefinition = /** @class */ (function () {
    function ShareableDefinition(field) {
        this.field = field;
    }
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    ShareableDefinition.prototype.auth = function (rules) {
        return new auth_1.AuthDefinition(this, rules);
    };
    /**
     * Attach a resolver function to the field.
     *
     * @param name - The name of the resolver function file without the extension or directory.
     */
    ShareableDefinition.prototype.resolver = function (name) {
        return new resolver_1.ResolverDefinition(this, name);
    };
    /**
     * Attach a join function to the field.
     *
     * @param select - The field selection string to join onto this field
     */
    ShareableDefinition.prototype.join = function (select) {
        return new join_1.JoinDefinition(this, select);
    };
    /**
     * Attach a join function to the field.
     *
     * @param select - The field selection string to join onto this field
     */
    ShareableDefinition.prototype.tag = function (tag) {
        return new tag_1.TagDefinition(this, tag);
    };
    /**
     * Set the field-level cache directive.
     *
     * @param params - The cache definition parameters.
     */
    ShareableDefinition.prototype.cache = function (params) {
        return new cache_1.CacheDefinition(this, new cache_1.FieldLevelCache(params));
    };
    ShareableDefinition.prototype.toString = function () {
        return "".concat(this.field, " @shareable");
    };
    return ShareableDefinition;
}());
exports.ShareableDefinition = ShareableDefinition;
