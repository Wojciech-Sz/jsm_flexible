import { AuthParams, AuthParamsV2 } from './auth';
import { CacheParams } from './cache';
import { FederatedGraph, Graph } from './grafbase-schema';
import { OperationLimitsParams } from './operation-limits';
import { ExperimentalParams } from './experimental';
/**
 * An interface to create the complete config definition.
 */
export interface GraphConfigInput {
    graph: Graph;
    auth?: AuthParams;
    cache?: CacheParams;
    operationLimits?: OperationLimitsParams;
    experimental?: ExperimentalParams;
    introspection?: boolean;
}
/**
 * @deprecated use `graph` instead of `schema`
 * An interface to create the complete config definition.
 */
export interface DeprecatedGraphConfigInput {
    /** @deprecated use `graph` instead */
    schema: Graph;
    auth?: AuthParams;
    operationLimits?: OperationLimitsParams;
    cache?: CacheParams;
    experimental?: ExperimentalParams;
    introspection?: boolean;
}
/**
 * An interface to create the federation config definition.
 */
export interface FederatedGraphConfigInput {
    graph: FederatedGraph;
    auth?: AuthParamsV2;
    operationLimits?: OperationLimitsParams;
    introspection?: boolean;
}
/**
 * Defines the complete Grafbase configuration.
 */
export declare class GraphConfig {
    private graph;
    private readonly auth?;
    private readonly cache?;
    private readonly operationLimits?;
    private readonly experimental?;
    private readonly introspection?;
    /** @deprecated use `graph` instead of `schema` */
    constructor(input: GraphConfigInput | DeprecatedGraphConfigInput);
    toString(): string;
}
export declare class FederatedGraphConfig {
    private graph;
    private readonly operationLimits?;
    private readonly auth?;
    private readonly introspection?;
    constructor(input: FederatedGraphConfigInput);
    toString(): string;
}
//# sourceMappingURL=config.d.ts.map