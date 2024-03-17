import { AuthRuleF } from '../auth';
import { ReferenceDefinition } from './reference';
import { CacheDefinition, FieldCacheParams } from './cache';
import { DefaultDefinition } from './default';
import { LengthLimitedStringDefinition } from './length-limited-string';
import { ResolverDefinition } from './resolver';
import { ScalarDefinition } from './scalar';
import { SearchDefinition } from './search';
import { UniqueDefinition } from './unique';
import { EnumDefinition } from './enum';
import { MapDefinition } from './map';
import { JoinDefinition } from './join';
import { TagDefinition } from './tag';
import { InaccessibleDefinition } from './inaccessible';
import { ShareableDefinition } from './shareable';
import { OverrideDefinition } from './override';
import { ProvidesDefinition } from './provides';
import { DeprecatedDefinition } from './deprecated';
export type Authenticable = ScalarDefinition | UniqueDefinition | DefaultDefinition | SearchDefinition | ReferenceDefinition | LengthLimitedStringDefinition | CacheDefinition | ResolverDefinition | EnumDefinition<any, any> | JoinDefinition | TagDefinition | InaccessibleDefinition | ShareableDefinition | OverrideDefinition | ProvidesDefinition | DeprecatedDefinition;
export declare class AuthDefinition {
    private field;
    private authRules;
    constructor(field: Authenticable, rules: AuthRuleF);
    /**
     * Make the field searchable.
     */
    search(): SearchDefinition;
    /**
     * Make the field unique.
     *
     * @param scope - Additional fields to be added to the constraint.
     */
    unique(scope?: string[]): UniqueDefinition;
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
//# sourceMappingURL=auth.d.ts.map