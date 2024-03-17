/**
 * Defines a cached type with fields.
 */
export interface StructuredCacheRuleType {
    name: string;
    fields?: string[];
}
/**
 * Defines a type to be cached. Can be a single type, multiple types
 * or more granularly types with specific fields.
 */
export type CachedTypes = string | string[] | StructuredCacheRuleType[];
/**
 * Defines the invalidation strategy on mutations for the cache.
 * - 'entity' will invalidate all cache values that return an entity with an
 *   `id`.
 * - `type` will invalidate all cache values that have type in them
 * - `list` will invalidate all cache values that have lists of the type in them
 * - `{ field: string }` will invalidate all cache values that return an entity
 *   with the given field in them
 */
export type MutationInvalidation = 'type' | 'entity' | 'list' | {
    field: string;
};
/**
 * Defines the access scope for the cache.
 * - 'apikey' will use the request's api_key details as part of the cache key.
 * - `public` will allow any authenticated request access to the cache key.
 * - `{ claim: string }` will use the `claim` value from the request's jwt as part of the cache key.
 * - `{ header: string }` will use the `header` value from the request as part of the cache key.
 */
export type AccessScope = 'apikey' | 'public' | {
    claim: string;
} | {
    header: string;
};
/**
 * Defines a single global cache rule.
 */
export interface CacheRuleParam {
    types: CachedTypes;
    maxAge: number;
    staleWhileRevalidate?: number;
    mutationInvalidation?: MutationInvalidation;
    scopes?: AccessScope[];
}
/**
 * Defines global cache rules.
 */
export interface CacheParams {
    rules: CacheRuleParam[];
}
export declare class GlobalCache {
    private params;
    constructor(params: CacheParams);
    toString(): string;
}
export declare function renderMutationInvalidation(val: MutationInvalidation): string;
export declare function renderAccessScope(scope: AccessScope): string;
//# sourceMappingURL=cache.d.ts.map