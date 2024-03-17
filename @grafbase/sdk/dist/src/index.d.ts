import { GraphConfig, GraphConfigInput, DeprecatedGraphConfigInput, FederatedGraphConfig, FederatedGraphConfigInput } from './config';
import { OpenAPIParams, PartialOpenAPI } from './connector/openapi';
import { GraphQLParams, PartialGraphQLAPI } from './connector/graphql';
import { OpenIDAuth, OpenIDParams } from './auth/openid';
import { JWTAuth, JWTParams, JWTAuthV2, JWTParamsV2 } from './auth/jwt';
import { JWKSAuth, JWKSParams } from './auth/jwks';
import { RequireAtLeastOne } from 'type-fest';
import { Authorizer, AuthorizerParams } from './auth/authorizer';
import { MongoDBParams, PartialMongoDBAPI } from './connector/mongodb';
import { PostgresParams, PartialPostgresAPI } from './connector/postgres';
import { graph } from './graph';
import scalar from './scalar';
import define from './define';
export { type ResolverContext as Context } from './resolver/context';
export { type ResolverFn } from './resolver/resolverFn';
export { type ResolverInfo as Info } from './resolver/info';
export { type VerifiedIdentity } from './authorizer/verifiedIdentity';
export { type AuthorizerContext } from './authorizer/context';
export { SubscriptionTransport } from './federated/subscriptions';
export { graph, scalar, define };
/** @deprecated use `graph.Standalone()` instead */
export declare const g: import("./grafbase-schema").Graph;
export type AtLeastOne<T> = [T, ...T[]];
/**
 * A constructor for a complete Grafbase configuration.
 */
export declare function config(input: GraphConfigInput): GraphConfig;
/** @deprecated use `graph` instead of `schema` */
export declare function config(input: DeprecatedGraphConfigInput): GraphConfig;
export declare function config(input: FederatedGraphConfigInput): FederatedGraphConfig;
export declare const connector: {
    /**
     * Create a new OpenAPI connector object.
     *
     * @param name - A unique name for the connector.
     * @param params - The configuration parameters.
     */
    OpenAPI: (name: string, params: OpenAPIParams) => PartialOpenAPI;
    /**
     * Create a new GraphQL connector object.
     *
     * @param name - A unique name for the connector.
     * @param params - The configuration parameters.
     */
    GraphQL: (name: string, params: GraphQLParams) => PartialGraphQLAPI;
    /**
     * Create a new MongoDB connector object.
     *
     * @param name - A unique name for the connector.
     * @param params - The configuration parameters.
     */
    MongoDB: (name: string, params: MongoDBParams) => PartialMongoDBAPI;
    /**
     * Create a new Postgres connector object.
     *
     * @param name - A unique name for the connector.
     * @param params - The configuration parameters.
     */
    Postgres: (name: string, params: PostgresParams) => PartialPostgresAPI;
};
export declare const auth: {
    /**
     * Create a new OpenID authenticator.
     *
     * @param params - The configuration parameters.
     */
    OpenIDConnect: (params: OpenIDParams) => OpenIDAuth;
    /**
     * Create a new JWT authenticator.
     *
     * @param params - The configuration parameters.
     */
    JWT: {
        (params: JWTParams): JWTAuth;
        (params: JWTParamsV2): JWTAuthV2;
    };
    /**
     * Create a new JWKS authenticator.
     *
     * @param params - The configuration parameters.
     */
    JWKS: (params: RequireAtLeastOne<JWKSParams, 'issuer' | 'jwksEndpoint'>) => JWKSAuth;
    /**
     * Create a new authorizer authenticator.
     *
     * @param params - The configuration parameters.
     */
    Authorizer: (params: AuthorizerParams) => Authorizer;
};
//# sourceMappingURL=index.d.ts.map