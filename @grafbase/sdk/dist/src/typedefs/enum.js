"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumDefinition = void 0;
var enum_1 = require("../enum");
var auth_1 = require("./auth");
var cache_1 = require("./cache");
var default_1 = require("./default");
var deprecated_1 = require("./deprecated");
var inaccessible_1 = require("./inaccessible");
var join_1 = require("./join");
var list_1 = require("./list");
var map_1 = require("./map");
var override_1 = require("./override");
var provides_1 = require("./provides");
var resolver_1 = require("./resolver");
var search_1 = require("./search");
var shareable_1 = require("./shareable");
var unique_1 = require("./unique");
var EnumDefinition = /** @class */ (function () {
    function EnumDefinition(referencedEnum) {
        this.enumName = referencedEnum.name;
        this.enumVariants = referencedEnum.variants;
        this.isOptional = false;
    }
    /**
     * Set the field optional.
     */
    EnumDefinition.prototype.optional = function () {
        this.isOptional = true;
        return this;
    };
    /**
     * Allow multiple scalars to be used as values for the field.
     */
    EnumDefinition.prototype.list = function () {
        return new list_1.ListDefinition(this);
    };
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    EnumDefinition.prototype.auth = function (rules) {
        return new auth_1.AuthDefinition(this, rules);
    };
    /**
     * Make the field searchable.
     */
    EnumDefinition.prototype.search = function () {
        return new search_1.SearchDefinition(this);
    };
    /**
     * Make the field unique.
     *
     * @param scope - Additional fields to be added to the constraint.
     */
    EnumDefinition.prototype.unique = function (scope) {
        return new unique_1.UniqueDefinition(this, scope);
    };
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    EnumDefinition.prototype.default = function (value) {
        return new default_1.DefaultDefinition(this, value);
    };
    /**
     * Set the field-level deprecated directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    EnumDefinition.prototype.deprecated = function (reason) {
        return new deprecated_1.DeprecatedDefinition(this, reason !== null && reason !== void 0 ? reason : null);
    };
    /**
     * Attach a resolver function to the field.
     *
     * @param name - The name of the resolver function file without the extension or directory.
     */
    EnumDefinition.prototype.resolver = function (name) {
        return new resolver_1.ResolverDefinition(this, name);
    };
    /**
     * Attach a join function to the field.
     *
     * @param select - The field selection string to join onto this field
     */
    EnumDefinition.prototype.join = function (select) {
        return new join_1.JoinDefinition(this, select);
    };
    /**
     * Set the field-level cache directive.
     *
     * @param params - The cache definition parameters.
     */
    EnumDefinition.prototype.cache = function (params) {
        return new cache_1.CacheDefinition(this, new cache_1.FieldLevelCache(params));
    };
    /**
     * Sets the name of the field in the database, if different than the name of the field.
     *
     * @param name - The mapped name
     */
    EnumDefinition.prototype.mapped = function (name) {
        return new map_1.MapDefinition(this, name);
    };
    /**
     * Set the field-level inaccessible directive.
     */
    EnumDefinition.prototype.inaccessible = function () {
        return new inaccessible_1.InaccessibleDefinition(this);
    };
    /**
     * Set the field-level shareable directive.
     */
    EnumDefinition.prototype.shareable = function () {
        return new shareable_1.ShareableDefinition(this);
    };
    /**
     * Set the field-level override directive.
     */
    EnumDefinition.prototype.override = function (from) {
        return new override_1.OverrideDefinition(this, from);
    };
    /**
     * Set the field-level provides directive.
     */
    EnumDefinition.prototype.provides = function (fields) {
        return new provides_1.ProvidesDefinition(this, fields);
    };
    EnumDefinition.prototype.toString = function () {
        var required = this.isOptional ? '' : '!';
        return "".concat(this.enumName).concat(required);
    };
    EnumDefinition.prototype.fieldTypeVal = function () {
        return new enum_1.Enum(this.enumName, this.enumVariants);
    };
    return EnumDefinition;
}());
exports.EnumDefinition = EnumDefinition;
