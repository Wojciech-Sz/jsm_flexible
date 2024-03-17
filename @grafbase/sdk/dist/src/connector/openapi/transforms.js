"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryNamingTransform = exports.OpenApiTransforms = void 0;
var transforms_1 = require("../transforms");
/**
 * An accumulator class to gather transforms for an OpenAPI connector
 */
var OpenApiTransforms = /** @class */ (function () {
    function OpenApiTransforms() {
        this._schemaTransforms = new transforms_1.SchemaTransforms();
        this._queryNaming = null;
    }
    Object.defineProperty(OpenApiTransforms.prototype, "transforms", {
        get: function () {
            var transforms = this._schemaTransforms.transforms;
            if (this._queryNaming != null) {
                transforms.push(new QueryNamingTransform(this._queryNaming));
            }
            return transforms;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets the query naming strategy for this OpenAPI connector
     */
    OpenApiTransforms.prototype.queryNaming = function (strategy) {
        this._queryNaming = strategy;
    };
    /**
     * Excludes one or more fields from the connectors schema
     *
     * @param name - The fields to exclude in dot notation
     *               e.g. `MyType.myField`, `MyType.*.someNestedField`, `{User,Account}.email`
     */
    OpenApiTransforms.prototype.exclude = function () {
        var _a;
        var name = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            name[_i] = arguments[_i];
        }
        (_a = this._schemaTransforms).exclude.apply(_a, name);
    };
    /**
     * Sets the prefix that will be applied to the name of all of this connectors
     * types.
     *
     * This defaults to the name of the connector if the connector is namespaced
     *
     * @param prefix - The prefix to use
     */
    OpenApiTransforms.prototype.prefixTypes = function (prefix) {
        this._schemaTransforms.prefixTypes(prefix);
    };
    return OpenApiTransforms;
}());
exports.OpenApiTransforms = OpenApiTransforms;
/**
 * Header used in connector calls.
 */
var QueryNamingTransform = /** @class */ (function () {
    function QueryNamingTransform(value) {
        this.value = value;
    }
    QueryNamingTransform.prototype.toString = function () {
        return "queryNaming: ".concat(this.value);
    };
    return QueryNamingTransform;
}());
exports.QueryNamingTransform = QueryNamingTransform;
