"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverrideDefinition = void 0;
var auth_1 = require("./auth");
var cache_1 = require("./cache");
var utils_1 = require("../utils");
var resolver_1 = require("./resolver");
var join_1 = require("./join");
var tag_1 = require("./tag");
var OverrideDefinition = /** @class */ (function () {
    function OverrideDefinition(field, from) {
        this.field = field;
        this.from = from;
    }
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    OverrideDefinition.prototype.auth = function (rules) {
        return new auth_1.AuthDefinition(this, rules);
    };
    /**
     * Attach a resolver function to the field.
     *
     * @param name - The name of the resolver function file without the extension or directory.
     */
    OverrideDefinition.prototype.resolver = function (name) {
        return new resolver_1.ResolverDefinition(this, name);
    };
    /**
     * Attach a join function to the field.
     *
     * @param select - The field selection string to join onto this field
     */
    OverrideDefinition.prototype.join = function (select) {
        return new join_1.JoinDefinition(this, select);
    };
    /**
     * Adds a tag to this field
     *
     * @param tag - The tag to add
     */
    OverrideDefinition.prototype.tag = function (tag) {
        return new tag_1.TagDefinition(this, tag);
    };
    /**
     * Set the field-level cache directive.
     *
     * @param params - The cache definition parameters.
     */
    OverrideDefinition.prototype.cache = function (params) {
        return new cache_1.CacheDefinition(this, new cache_1.FieldLevelCache(params));
    };
    OverrideDefinition.prototype.toString = function () {
        return "".concat(this.field, " @override(from: \"").concat((0, utils_1.escapeString)(this.from), "\")");
    };
    return OverrideDefinition;
}());
exports.OverrideDefinition = OverrideDefinition;
