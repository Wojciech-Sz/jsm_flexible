"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.QueryArgument = exports.InputDefaultDefinition = void 0;
var default_1 = require("./typedefs/default");
var validation_1 = require("./validation");
/**
 * Defaults are rendered differently in input types, which we do in this specialization
 */
var InputDefaultDefinition = /** @class */ (function (_super) {
    __extends(InputDefaultDefinition, _super);
    function InputDefaultDefinition(scalar, defaultValue) {
        return _super.call(this, scalar, defaultValue) || this;
    }
    InputDefaultDefinition.prototype.toString = function () {
        var defaultValue = (0, default_1.renderDefault)(this._defaultValue, this._scalar.fieldTypeVal());
        return "".concat(this._scalar, " = ").concat(defaultValue);
    };
    return InputDefaultDefinition;
}(default_1.DefaultDefinition));
exports.InputDefaultDefinition = InputDefaultDefinition;
/**
 * An input argument shape of a query.
 */
var QueryArgument = /** @class */ (function () {
    function QueryArgument(name, type) {
        (0, validation_1.validateIdentifier)(name);
        this.name = name;
        if ('scalar' in type && 'defaultValue' in type) {
            this.type = new InputDefaultDefinition(type.scalar, type.defaultValue);
        }
        else {
            this.type = type;
        }
    }
    QueryArgument.prototype.toString = function () {
        return "".concat(this.name, ": ").concat(this.type);
    };
    return QueryArgument;
}());
exports.QueryArgument = QueryArgument;
/**
 * An edge resolver query definition.
 */
var Query = /** @class */ (function () {
    function Query(name, returnType, resolverName, mutation) {
        (0, validation_1.validateIdentifier)(name);
        this.name = name;
        this.arguments = [];
        this.returns = returnType;
        this.resolver = resolverName;
        this._kind = mutation ? 'mutation' : 'query';
    }
    Object.defineProperty(Query.prototype, "kind", {
        get: function () {
            return this._kind;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Push a new input argument to the query.
     *
     * @param name - The name of the input parameter.
     * @param type - The type of the input parameter.
     */
    Query.prototype.argument = function (name, type) {
        this.arguments.push(new QueryArgument(name, type));
        return this;
    };
    Query.prototype.toString = function () {
        var args = this.arguments.map(String).join(', ');
        var argsStr = args ? "(".concat(args, ")") : '';
        return "".concat(this.name).concat(argsStr, ": ").concat(this.returns, " @resolver(name: \"").concat(this.resolver, "\")");
    };
    return Query;
}());
exports.Query = Query;
