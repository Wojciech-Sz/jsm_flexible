"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvidesDefinition = void 0;
var auth_1 = require("./auth");
var cache_1 = require("./cache");
var utils_1 = require("../utils");
var resolver_1 = require("./resolver");
var join_1 = require("./join");
var tag_1 = require("./tag");
var ProvidesDefinition = /** @class */ (function () {
    function ProvidesDefinition(field, fields) {
        this.field = field;
        this.fields = fields;
    }
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    ProvidesDefinition.prototype.auth = function (rules) {
        return new auth_1.AuthDefinition(this, rules);
    };
    /**
     * Attach a resolver function to the field.
     *
     * @param name - The name of the resolver function file without the extension or directory.
     */
    ProvidesDefinition.prototype.resolver = function (name) {
        return new resolver_1.ResolverDefinition(this, name);
    };
    /**
     * Attach a join function to the field.
     *
     * @param select - The field selection string to join onto this field
     */
    ProvidesDefinition.prototype.join = function (select) {
        return new join_1.JoinDefinition(this, select);
    };
    /**
     * Adds a tag to this field
     *
     * @param tag - The tag to add
     */
    ProvidesDefinition.prototype.tag = function (tag) {
        return new tag_1.TagDefinition(this, tag);
    };
    /**
     * Set the field-level cache directive.
     *
     * @param params - The cache definition parameters.
     */
    ProvidesDefinition.prototype.cache = function (params) {
        return new cache_1.CacheDefinition(this, new cache_1.FieldLevelCache(params));
    };
    ProvidesDefinition.prototype.toString = function () {
        return "".concat(this.field, " @provides(fields: \"").concat((0, utils_1.escapeString)(this.fields), "\")");
    };
    return ProvidesDefinition;
}());
exports.ProvidesDefinition = ProvidesDefinition;
