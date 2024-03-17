"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FederatedGraphConfig = exports.GraphConfig = void 0;
var auth_1 = require("./auth");
var cache_1 = require("./cache");
var operation_limits_1 = require("./operation-limits");
var experimental_1 = require("./experimental");
var introspection_1 = require("./introspection");
/**
 * Defines the complete Grafbase configuration.
 */
var GraphConfig = /** @class */ (function () {
    /** @deprecated use `graph` instead of `schema` */
    function GraphConfig(input) {
        this.graph = 'graph' in input ? input.graph : input.schema;
        if (input.auth) {
            this.auth = new auth_1.Authentication(input.auth);
        }
        if (input.operationLimits) {
            this.operationLimits = new operation_limits_1.OperationLimits(input.operationLimits);
        }
        if (input.cache) {
            this.cache = new cache_1.GlobalCache(input.cache);
        }
        if (input.experimental) {
            this.experimental = new experimental_1.Experimental(input.experimental);
        }
        if (input.introspection !== undefined) {
            this.introspection = new introspection_1.Introspection({ enabled: input.introspection });
        }
    }
    GraphConfig.prototype.toString = function () {
        var graph = this.graph.toString();
        var auth = this.auth ? this.auth.toString() : '';
        var operationLimits = this.operationLimits
            ? this.operationLimits.toString()
            : '';
        var cache = this.cache ? this.cache.toString() : '';
        var experimental = this.experimental ? this.experimental.toString() : '';
        var introspection = this.introspection
            ? this.introspection.toString()
            : process.env.GRAFBASE_ENV === 'dev'
                ? new introspection_1.Introspection({ enabled: true })
                : '';
        return "".concat(experimental).concat(auth).concat(operationLimits).concat(cache).concat(graph).concat(introspection);
    };
    return GraphConfig;
}());
exports.GraphConfig = GraphConfig;
var FederatedGraphConfig = /** @class */ (function () {
    function FederatedGraphConfig(input) {
        this.graph = input.graph;
        if (input.auth) {
            this.auth = new auth_1.AuthenticationV2(input.auth);
        }
        if (input.operationLimits) {
            this.operationLimits = new operation_limits_1.OperationLimits(input.operationLimits);
        }
        if (input.introspection !== undefined) {
            this.introspection = new introspection_1.Introspection({ enabled: input.introspection });
        }
    }
    FederatedGraphConfig.prototype.toString = function () {
        var graph = this.graph.toString();
        var auth = this.auth ? this.auth.toString() : '';
        var operationLimits = this.operationLimits
            ? this.operationLimits.toString()
            : '';
        var introspection = this.introspection
            ? this.introspection.toString()
            : process.env.GRAFBASE_ENV === 'dev'
                ? new introspection_1.Introspection({ enabled: true })
                : '';
        return "".concat(auth).concat(graph).concat(operationLimits).concat(introspection);
    };
    return FederatedGraphConfig;
}());
exports.FederatedGraphConfig = FederatedGraphConfig;
