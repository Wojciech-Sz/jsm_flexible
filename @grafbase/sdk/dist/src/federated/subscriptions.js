"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FederatedSubgraphSubscription = exports.FederatedGraphSubscriptions = exports.SubscriptionTransport = void 0;
var SubscriptionTransport;
(function (SubscriptionTransport) {
    SubscriptionTransport[SubscriptionTransport["GraphQlOverWebsockets"] = 0] = "GraphQlOverWebsockets";
})(SubscriptionTransport || (exports.SubscriptionTransport = SubscriptionTransport = {}));
/**
 * An accumulator class to gather headers for a federated graph
 */
var FederatedGraphSubscriptions = /** @class */ (function () {
    function FederatedGraphSubscriptions() {
        this.subgraphs = {};
    }
    /**
     * Returns a builder for setting a specific subgraphs headers
     *
     * @param name - The name of the subgraph
     */
    FederatedGraphSubscriptions.prototype.subgraph = function (name) {
        var _a;
        (_a = this.subgraphs)[name] || (_a[name] = new FederatedSubgraphSubscription());
        return this.subgraphs[name];
    };
    FederatedGraphSubscriptions.prototype.toString = function () {
        var subgraphs = Object.keys(this.subgraphs).length !== 0
            ? Object.entries(this.subgraphs).map(function (_a) {
                var name = _a[0], settings = _a[1];
                return settings.websocketUrl
                    ? "\n  @subgraph(name: \"".concat(name, "\", websocketUrl: \"").concat(settings.websocketUrl, "\")")
                    : '';
            })
            : '';
        return "".concat(subgraphs);
    };
    return FederatedGraphSubscriptions;
}());
exports.FederatedGraphSubscriptions = FederatedGraphSubscriptions;
var FederatedSubgraphSubscription = /** @class */ (function () {
    function FederatedSubgraphSubscription() {
        this._websocketUrl = null;
    }
    Object.defineProperty(FederatedSubgraphSubscription.prototype, "websocketUrl", {
        get: function () {
            return this._websocketUrl;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets a header to be sent to this subgraph
     *
     * @param name - The name of the header
     * @param value - The value for the header.  Either a hardcoded string or a header name to forward from.
     */
    FederatedSubgraphSubscription.prototype.transport = function (transport, options) {
        // Transport does nothing for now because we only support websockets.
        if (options === null || options === void 0 ? void 0 : options.url) {
            this._websocketUrl = options.url;
        }
        return this;
    };
    return FederatedSubgraphSubscription;
}());
exports.FederatedSubgraphSubscription = FederatedSubgraphSubscription;
