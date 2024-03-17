"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FederatedSubgraphHeaders = exports.FederatedGraphHeaders = void 0;
var header_1 = require("../connector/header");
/**
 * An accumulator class to gather headers for a federated graph
 */
var FederatedGraphHeaders = /** @class */ (function () {
    function FederatedGraphHeaders() {
        this.defaultHeaders = [];
        this.subgraphs = {};
    }
    /**
     * Sets a default header to be sent to all subgraphs
     *
     * @param name - The name of the header
     * @param value - The value for the header.  Either a hardcoded string or a header name to forward from.
     */
    FederatedGraphHeaders.prototype.set = function (name, value) {
        if (typeof value === 'string') {
            this.defaultHeaders.push(new header_1.Header(name, { type: 'static', value: value }));
        }
        else {
            this.defaultHeaders.push(new header_1.Header(name, { type: 'forward', from: value.forward }));
        }
    };
    /**
     * Returns a builder for setting a specific subgraphs headers
     *
     * @param name - The name of the subgraph
     */
    FederatedGraphHeaders.prototype.subgraph = function (name) {
        var _a;
        (_a = this.subgraphs)[name] || (_a[name] = []);
        return new FederatedSubgraphHeaders(this.subgraphs[name]);
    };
    FederatedGraphHeaders.prototype.toString = function () {
        var defaultHeaders = this.defaultHeaders.length !== 0
            ? "\n  @allSubgraphs(headers: [".concat(this.defaultHeaders
                .map(String)
                .join(', '), "])")
            : '';
        var subgraphs = Object.keys(this.subgraphs).length !== 0
            ? Object.entries(this.subgraphs).map(function (_a) {
                var name = _a[0], headers = _a[1];
                return "\n  @subgraph(name: \"".concat(name, "\", headers: [").concat(headers
                    .map(String)
                    .join(', '), "])");
            })
            : '';
        return "".concat(defaultHeaders).concat(subgraphs);
    };
    return FederatedGraphHeaders;
}());
exports.FederatedGraphHeaders = FederatedGraphHeaders;
var FederatedSubgraphHeaders = /** @class */ (function () {
    function FederatedSubgraphHeaders(headers) {
        this.headers = headers;
    }
    /**
     * Sets a header to be sent to this subgraph
     *
     * @param name - The name of the header
     * @param value - The value for the header.  Either a hardcoded string or a header name to forward from.
     */
    FederatedSubgraphHeaders.prototype.set = function (name, value) {
        if (typeof value === 'string') {
            this.headers.push(new header_1.Header(name, { type: 'static', value: value }));
        }
        else {
            this.headers.push(new header_1.Header(name, { type: 'forward', from: value.forward }));
        }
        return this;
    };
    return FederatedSubgraphHeaders;
}());
exports.FederatedSubgraphHeaders = FederatedSubgraphHeaders;
