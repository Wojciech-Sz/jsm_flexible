export type TransformsGenerator = (schema: SchemaTransforms) => void;
export type SchemaTransform = ExcludeTransform | TypePrefixTransform;
/**
 * An accumulator class to gather transforms for a connector that introspects
 * and generates its schema
 */
export declare class SchemaTransforms {
    private _excludes;
    private _prefixTypes;
    constructor();
    get transforms(): SchemaTransform[];
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
 * A transform that excludes types or fields from a connectors output
 */
export declare class ExcludeTransform {
    private values;
    constructor(values: string[]);
    toString(): string;
}
/**
 * A transform that sets the prefix to use for a connectors generated types
 */
export declare class TypePrefixTransform {
    private prefix;
    constructor(prefix: string);
    toString(): string;
}
//# sourceMappingURL=transforms.d.ts.map