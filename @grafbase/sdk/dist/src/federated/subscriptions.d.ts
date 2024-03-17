export declare enum SubscriptionTransport {
    GraphQlOverWebsockets = 0
}
export interface SubscriptionTransportOptions {
    url: string;
}
/**
 * An accumulator class to gather headers for a federated graph
 */
export declare class FederatedGraphSubscriptions {
    private subgraphs;
    constructor();
    /**
     * Returns a builder for setting a specific subgraphs headers
     *
     * @param name - The name of the subgraph
     */
    subgraph(name: string): FederatedSubgraphSubscription;
    toString(): string;
}
export declare class FederatedSubgraphSubscription {
    private _websocketUrl;
    constructor();
    get websocketUrl(): string | null;
    /**
     * Sets a header to be sent to this subgraph
     *
     * @param name - The name of the header
     * @param value - The value for the header.  Either a hardcoded string or a header name to forward from.
     */
    transport(transport: SubscriptionTransport, options?: SubscriptionTransportOptions): FederatedSubgraphSubscription;
}
//# sourceMappingURL=subscriptions.d.ts.map