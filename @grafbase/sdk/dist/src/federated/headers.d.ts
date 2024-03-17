import { Header } from '../connector/header';
/**
 * An accumulator class to gather headers for a federated graph
 */
export declare class FederatedGraphHeaders {
    private defaultHeaders;
    private subgraphs;
    constructor();
    /**
     * Sets a default header to be sent to all subgraphs
     *
     * @param name - The name of the header
     * @param value - The value for the header.  Either a hardcoded string or a header name to forward from.
     */
    set(name: string, value: string | {
        forward: string;
    }): void;
    /**
     * Returns a builder for setting a specific subgraphs headers
     *
     * @param name - The name of the subgraph
     */
    subgraph(name: string): FederatedSubgraphHeaders;
    toString(): string;
}
export declare class FederatedSubgraphHeaders {
    private headers;
    constructor(headers: Header[]);
    /**
     * Sets a header to be sent to this subgraph
     *
     * @param name - The name of the header
     * @param value - The value for the header.  Either a hardcoded string or a header name to forward from.
     */
    set(name: string, value: string | {
        forward: string;
    }): FederatedSubgraphHeaders;
}
//# sourceMappingURL=headers.d.ts.map