"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceDefinition = void 0;
var list_1 = require("./list");
var auth_1 = require("./auth");
var resolver_1 = require("./resolver");
var map_1 = require("./map");
var join_1 = require("./join");
var deprecated_1 = require("./deprecated");
var inaccessible_1 = require("./inaccessible");
var shareable_1 = require("./shareable");
var override_1 = require("./override");
var provides_1 = require("./provides");
var ReferenceDefinition = /** @class */ (function () {
    function ReferenceDefinition(referencedType) {
        this.referencedType =
            typeof referencedType === 'string' ? referencedType : referencedType.name;
        this.isOptional = false;
    }
    /**
     * Set the field optional.
     */
    ReferenceDefinition.prototype.optional = function () {
        this.isOptional = true;
        return this;
    };
    /**
     * Allow multiple scalars to be used as values for the field.
     */
    ReferenceDefinition.prototype.list = function () {
        return new list_1.ListDefinition(this);
    };
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    ReferenceDefinition.prototype.auth = function (rules) {
        return new auth_1.AuthDefinition(this, rules);
    };
    /**
     * Set the field-level deprecated directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    ReferenceDefinition.prototype.deprecated = function (reason) {
        return new deprecated_1.DeprecatedDefinition(this, reason !== null && reason !== void 0 ? reason : null);
    };
    /**
     * Attach a resolver function to the field.
     *
     * @param name - The name of the resolver function file without the extension or directory.
     */
    ReferenceDefinition.prototype.resolver = function (name) {
        return new resolver_1.ResolverDefinition(this, name);
    };
    /**
     * Attach a join function to the field.
     *
     * @param select - The field selection string to join onto this field
     */
    ReferenceDefinition.prototype.join = function (select) {
        return new join_1.JoinDefinition(this, select);
    };
    /**
     * Sets the name of the field in the database, if different than the name of the field.
     */
    ReferenceDefinition.prototype.mapped = function (name) {
        return new map_1.MapDefinition(this, name);
    };
    /**
     * Set the field-level inaccessible directive.
     */
    ReferenceDefinition.prototype.inaccessible = function () {
        return new inaccessible_1.InaccessibleDefinition(this);
    };
    /**
     * Set the field-level shareable directive.
     */
    ReferenceDefinition.prototype.shareable = function () {
        return new shareable_1.ShareableDefinition(this);
    };
    /**
     * Set the field-level override directive.
     */
    ReferenceDefinition.prototype.override = function (from) {
        return new override_1.OverrideDefinition(this, from);
    };
    /**
     * Set the field-level provides directive.
     */
    ReferenceDefinition.prototype.provides = function (fields) {
        return new provides_1.ProvidesDefinition(this, fields);
    };
    ReferenceDefinition.prototype.toString = function () {
        var required = this.isOptional ? '' : '!';
        return "".concat(this.referencedType).concat(required);
    };
    return ReferenceDefinition;
}());
exports.ReferenceDefinition = ReferenceDefinition;
