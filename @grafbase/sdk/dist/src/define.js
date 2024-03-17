"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enum_1 = require("./enum");
var input_type_1 = require("./input_type");
var interface_1 = require("./interface");
var query_1 = require("./query");
var type_1 = require("./type");
var enum_2 = require("./typedefs/enum");
var input_1 = require("./typedefs/input");
var reference_1 = require("./typedefs/reference");
var union_1 = require("./union");
exports.default = {
    /**
     * Creates a new object type.
     *
     * @param name - The name of the type.
     * @param fields - The fields to be included.
     */
    type: function (name, fields) {
        return Object.entries(fields).reduce(function (type, _a) {
            var name = _a[0], definition = _a[1];
            return type.field(name, definition);
        }, new type_1.Type(name));
    },
    /**
     * Creates a new interface.
     *
     * @param name - The name of the interface.
     * @param fields - The fields to be included.
     */
    interface: function (name, fields) {
        return Object.entries(fields).reduce(function (iface, _a) {
            var name = _a[0], definition = _a[1];
            return iface.field(name, definition);
        }, new interface_1.Interface(name));
    },
    /**
     * Creates a new union.
     *
     * @param name - The name of the union.
     * @param types - The types to be included.
     */
    union: function (name, types) {
        return Object.entries(types).reduce(function (model, _a) {
            var _ = _a[0], type = _a[1];
            return model.type(type);
        }, new union_1.Union(name));
    },
    /**
     * Creates a new query
     *
     * @param name - The name of the query.
     * @param definition - The query definition.
     */
    query: function (name, definition) {
        var query = new query_1.Query(name, definition.returns, definition.resolver, false);
        if (definition.args != null) {
            Object.entries(definition.args).forEach(function (_a) {
                var name = _a[0], type = _a[1];
                return query.argument(name, type);
            });
        }
        return query;
    },
    /**
     * Creates a new mutation.
     *
     * @param name - The name of the mutation.
     * @param fields - The mutation definition.
     */
    mutation: function (name, definition) {
        var mutation = new query_1.Query(name, definition.returns, definition.resolver, true);
        if (definition.args != null) {
            Object.entries(definition.args).forEach(function (_a) {
                var name = _a[0], type = _a[1];
                return mutation.argument(name, type);
            }, mutation);
        }
        return mutation;
    },
    /**
     * Creates a new input.
     *
     * @param name = The name of the input.
     * @param fields = The input definition.
     */
    input: function (name, definition) {
        var input = new input_type_1.Input(name);
        Object.entries(definition).forEach(function (_a) {
            var name = _a[0], type = _a[1];
            input.field(name, type);
        });
        return input;
    },
    /**
     * Creates a new enum.
     *
     * @param name - The name of the enum.
     * @param variants - A list of variants of the enum.
     */
    enum: function (name, variants) {
        return new enum_1.Enum(name, variants);
    },
    /**
     * Create a new reference field, referencing a type.
     *
     * @param type - A type to be referred.
     */
    ref: function (type) { return new reference_1.ReferenceDefinition(type); },
    /**
     * Create a new enum field.
     *
     * @param definition - An enum to be referred.
     */
    enumRef: function (definition) {
        return new enum_2.EnumDefinition(definition);
    },
    /**
     * Create a new field from an input object reference.
     *
     * @param input - The input object reference.
     */
    inputRef: function (input) { return new input_1.InputDefinition(input); }
};
