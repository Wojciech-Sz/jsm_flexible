import { FederatedGraph, FederatedGraphInput, Graph } from './grafbase-schema';
export interface StandaloneInput {
    subgraph: boolean;
}
/**
 * A builder for a Grafbase schema definition.
 */
export declare const graph: {
    Federated: (input?: FederatedGraphInput) => FederatedGraph;
    Standalone: (input?: StandaloneInput) => Graph;
};
//# sourceMappingURL=graph.d.ts.map