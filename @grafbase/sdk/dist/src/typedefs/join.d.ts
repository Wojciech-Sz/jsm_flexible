import { AuthRuleF } from '../auth';
import { AuthDefinition } from './auth';
import { CacheDefinition, FieldCacheParams } from './cache';
import { DefaultDefinition } from './default';
import { ReferenceDefinition } from './reference';
import { ScalarDefinition } from './scalar';
import { EnumDefinition } from './enum';
import { TagDefinition } from './tag';
import { InaccessibleDefinition } from './inaccessible';
import { ShareableDefinition } from './shareable';
import { OverrideDefinition } from './override';
import { ProvidesDefinition } from './provides';
import { DeprecatedDefinition } from './deprecated';
/**
 * A list of field types that can hold a `@join` attribute.
 */
export type Joinable = ScalarDefinition | DefaultDefinition | ReferenceDefinition | CacheDefinition | EnumDefinition<any, any> | TagDefinition | InaccessibleDefinition | ShareableDefinition | OverrideDefinition | ProvidesDefinition | DeprecatedDefinition;
export declare class JoinDefinition {
    private field;
    private select;
    constructor(field: Joinable, select: string);
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
    toString(): string;
}
//# sourceMappingURL=join.d.ts.map