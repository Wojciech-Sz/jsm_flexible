"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypePrefixTransform = exports.ExcludeTransform = exports.SchemaTransforms = void 0;
/**
 * An accumulator class to gather transforms for a connector that introspects
 * and generates its schema
 */
var SchemaTransforms = /** @class */ (function () {
    function SchemaTransforms() {
        this._excludes = [];
        this._prefixTypes = null;
    }
    Object.defineProperty(SchemaTransforms.prototype, "transforms", {
        get: function () {
            var transforms = [];
            if (this._excludes.length != 0) {
                transforms.push(new ExcludeTransform(this._excludes));
            }
            if (this._prefixTypes !== null) {
                transforms.push(this._prefixTypes);
            }
            return transforms;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Excludes one or more fields from the connectors schema
     *
     * @param name - The fields to exclude in dot notation
     *               e.g. `MyType.myField`, `MyType.*.someNestedField`, `{User,Account}.email`
     */
    SchemaTransforms.prototype.exclude = function () {
        var _a;
        var name = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            name[_i] = arguments[_i];
        }
        (_a = this._excludes).push.apply(_a, name);
    };
    /**
     * Sets the prefix that will be applied to the name of all of this connectors
     * types.
     *
     * This defaults to the name of the connector if the connector is namespaced
     *
     * @param prefix - The prefix to use
     */
    SchemaTransforms.prototype.prefixTypes = function (prefix) {
        this._prefixTypes = new TypePrefixTransform(prefix);
    };
    return SchemaTransforms;
}());
exports.SchemaTransforms = SchemaTransforms;
/**
 * A transform that excludes types or fields from a connectors output
 */
var ExcludeTransform = /** @class */ (function () {
    function ExcludeTransform(values) {
        this.values = values;
    }
    ExcludeTransform.prototype.toString = function () {
        if (this.values.length == 0) {
            return '';
        }
        var excludes = this.values
            .map(function (exclude) { return "        \"".concat(exclude, "\""); })
            .join('\n');
        return "exclude: [\n".concat(excludes, "\n      ]");
    };
    return ExcludeTransform;
}());
exports.ExcludeTransform = ExcludeTransform;
/**
 * A transform that sets the prefix to use for a connectors generated types
 */
var TypePrefixTransform = /** @class */ (function () {
    function TypePrefixTransform(prefix) {
        this.prefix = prefix;
    }
    TypePrefixTransform.prototype.toString = function () {
        return "typePrefix: \"".concat(this.prefix, "\"");
    };
    return TypePrefixTransform;
}());
exports.TypePrefixTransform = TypePrefixTransform;
