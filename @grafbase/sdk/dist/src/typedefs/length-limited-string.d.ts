import { RequireAtLeastOne } from 'type-fest';
import { FieldType } from '../typedefs';
import { UniqueDefinition } from './unique';
import { DefaultDefinition } from './default';
import { Enum } from '../enum';
import { StringDefinition } from './scalar';
import { SearchDefinition } from './search';
import { AuthRuleF } from '../auth';
import { AuthDefinition } from './auth';
import { CacheDefinition, FieldCacheParams } from './cache';
import { StringListDefinition } from './list';
import { MapDefinition } from './map';
export interface FieldLength {
    min?: number;
    max?: number;
}
export type LengthLimitedField = StringDefinition | StringListDefinition;
export declare class LengthLimitedStringDefinition {
    private fieldLength;
    private scalar;
    constructor(scalar: LengthLimitedField, fieldLength: RequireAtLeastOne<FieldLength, 'min' | 'max'>);
    /**
     * Make the field unique.
     *
     * @param scope - Additional fields to be added to the constraint.
     */
    unique(scope?: string[]): UniqueDefinition;
    /**
     * Make the field searchable.
     */
    search(): SearchDefinition;
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    default(val: string): DefaultDefinition;
    /**
     * Set the field optional.
     */
    optional(): LengthLimitedStringDefinition;
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
    fieldTypeVal(): FieldType | Enum<any, any>;
}
//# sourceMappingURL=length-limited-string.d.ts.map