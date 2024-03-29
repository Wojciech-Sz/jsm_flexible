import { AuthRuleF } from '../auth';
import { AuthDefinition } from './auth';
import { CacheDefinition, FieldCacheParams } from './cache';
import { DefaultDefinition } from './default';
import { EnumDefinition } from './enum';
import { LengthLimitedStringDefinition } from './length-limited-string';
import { MapDefinition } from './map';
import { ResolverDefinition } from './resolver';
import { ScalarDefinition } from './scalar';
import { SearchDefinition } from './search';
type UniqueScalarType = ScalarDefinition | DefaultDefinition | SearchDefinition | LengthLimitedStringDefinition | AuthDefinition | ResolverDefinition | CacheDefinition | EnumDefinition<any, any>;
export declare class UniqueDefinition {
    private compoundScope?;
    private scalar;
    constructor(scalar: UniqueScalarType, scope?: string[]);
    /**
     * Make the field searchable.
     */
    search(): SearchDefinition;
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    auth(rules: AuthRuleF): AuthDefinition;
    /**
     * Set the field-level cache directive.
     *
     * @param params - The cache definition parameters.
     */
    cache(params: FieldCacheParams): CacheDefinition;
    /**
     * Sets the name of the field in the database, if different than the name of the field.
     */
    mapped(name: string): MapDefinition;
    toString(): string;
}
export {};
//# sourceMappingURL=unique.d.ts.map