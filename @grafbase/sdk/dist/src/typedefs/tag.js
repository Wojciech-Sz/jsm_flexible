"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagDefinition = void 0;
var auth_1 = require("./auth");
var cache_1 = require("./cache");
var utils_1 = require("../utils");
var resolver_1 = require("./resolver");
var join_1 = require("./join");
var inaccessible_1 = require("./inaccessible");
var shareable_1 = require("./shareable");
var override_1 = require("./override");
var provides_1 = require("./provides");
var TagDefinition = /** @class */ (function () {
    function TagDefinition(field, name) {
        this.field = field;
        this.name = name;
    }
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    TagDefinition.prototype.auth = function (rules) {
        return new auth_1.AuthDefinition(this, rules);
    };
    /**
     * Attach a resolver function to the field.
     *
     * @param name - The name of the resolver function file without the extension or directory.
     */
    TagDefinition.prototype.resolver = function (name) {
        return new resolver_1.ResolverDefinition(this, name);
    };
    /**
     * Attach a join function to the field.
     *
     * @param select - The field selection string to join onto this field
     */
    TagDefinition.prototype.join = function (select) {
        return new join_1.JoinDefinition(this, select);
    };
    /**
     * Adds a tag to this field
     *
     * @param tag - The tag to add
     */
    TagDefinition.prototype.tag = function (tag) {
        return new TagDefinition(this, tag);
    };
    /**
     * Set the field-level cache directive.
     *
     * @param params - The cache definition parameters.
     */
    TagDefinition.prototype.cache = function (params) {
        return new cache_1.CacheDefinition(this, new cache_1.FieldLevelCache(params));
    };
    /**
     * Set the field-level inaccessible directive.
     */
    TagDefinition.prototype.inaccessible = function () {
        return new inaccessible_1.InaccessibleDefinition(this);
    };
    /**
     * Set the field-level shareable directive.
     */
    TagDefinition.prototype.shareable = function () {
        return new shareable_1.ShareableDefinition(this);
    };
    /**
     * Set the field-level override directive.
     */
    TagDefinition.prototype.override = function (from) {
        return new override_1.OverrideDefinition(this, from);
    };
    /**
     * Set the field-level provides directive.
     */
    TagDefinition.prototype.provides = function (fields) {
        return new provides_1.ProvidesDefinition(this, fields);
    };
    TagDefinition.prototype.toString = function () {
        return "".concat(this.field, " @tag(name: \"").concat((0, utils_1.escapeString)(this.name), "\")");
    };
    return TagDefinition;
}());
exports.TagDefinition = TagDefinition;
