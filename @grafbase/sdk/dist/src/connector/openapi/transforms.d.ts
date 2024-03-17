import { SchemaTransform } from '../transforms';
export type OpenApiTransformsGenerator = (schema: OpenApiTransforms) => void;
export type OpenApiTransform = SchemaTransform | QueryNamingTransform;
export type OpenApiQueryNamingStrategy = 'OPERATION_ID' | 'SCHEMA_NAME';
/**
 * An accumulator class to gather transforms for an OpenAPI connector
 */
export declare class OpenApiTransforms {
    private _schemaTransforms;
    private _queryNaming;
    constructor();
    get transforms(): OpenApiTransform[];
    /**
     * Sets the query naming strategy for this OpenAPI connector
     */
    queryNaming(strategy: OpenApiQueryNamingStrategy): void;
    /**
     * Excludes one or more fields from the connectors schema
     *
     * @param name - The fields to exclude in dot notation
     *               e.g. `MyType.myField`, `MyType.*.someNestedField`, `{User,Account}.email`
     */
    exclude(...name: string[]): void;
    /**
     * Sets the prefix that will be applied to the name of all of this connectors
     * types.
     *
     * This defaults to the name of the connector if the connector is namespaced
     *
     * @param prefix - The prefix to use
     */
    prefixTypes(prefix: string): void;
}
/**
 * Header used in connector calls.
 */
export declare class QueryNamingTransform {
    private value;
    constructor(value: OpenApiQueryNamingStrategy);
    toString(): string;
}
//# sourceMappingURL=transforms.d.ts.map