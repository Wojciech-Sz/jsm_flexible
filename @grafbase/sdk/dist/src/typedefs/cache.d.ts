import { AuthRuleF } from '../auth';
import { AccessScope, MutationInvalidation } from '../cache';
import { AuthDefinition } from './auth';
import { DefaultDefinition } from './default';
import { DeprecatedDefinition } from './deprecated';
import { EnumDefinition } from './enum';
import { InaccessibleDefinition } from './inaccessible';
import { JoinDefinition } from './join';
import { LengthLimitedStringDefinition } from './length-limited-string';
import { MapDefinition } from './map';
import { OverrideDefinition } from './override';
import { ProvidesDefinition } from './provides';
import { ResolverDefinition } from './resolver';
import { ScalarDefinition } from './scalar';
import { SearchDefinition } from './search';
import { ShareableDefinition } from './shareable';
import { TagDefinition } from './tag';
import { UniqueDefinition } from './unique';
export type Cacheable = ScalarDefinition | AuthDefinition | DefaultDefinition | ResolverDefinition | LengthLimitedStringDefinition | SearchDefinition | UniqueDefinition | EnumDefinition<any, any> | JoinDefinition | TagDefinition | InaccessibleDefinition | ShareableDefinition | OverrideDefinition | ProvidesDefinition | DeprecatedDefinition;
export interface TypeCacheParams {
    maxAge: number;
    staleWhileRevalidate?: number;
    mutationInvalidation?: MutationInvalidation;
    scopes?: AccessScope[];
}
export interface FieldCacheParams {
    maxAge: number;
    staleWhileRevalidate?: number;
    scopes?: AccessScope[];
}
export declare class TypeLevelCache {
    private params;
    constructor(params: TypeCacheParams);
    toString(): string;
}
export declare class FieldLevelCache {
    private params;
    constructor(params: FieldCacheParams);
    toString(): string;
}
export declare class CacheDefinition {
    private attribute;
    private field;
    constructor(field: Cacheable, attribute: FieldLevelCache);
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    auth(rules: AuthRuleF): AuthDefinition;
    /**
     * Make the field searchable.
     */
    search(): SearchDefinition;
    /**
     * Sets the name of the field in the database, if different than the name of the field.
     *
     * @param name - The mapped name
     */
    mapped(name: string): MapDefinition;
    toString(): string;
}
//# sourceMappingURL=cache.d.ts.map