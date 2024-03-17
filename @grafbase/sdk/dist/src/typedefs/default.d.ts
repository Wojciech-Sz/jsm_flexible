import { AuthRuleF } from '../auth';
import { Enum } from '../enum';
import { FieldType } from '../typedefs';
import { AuthDefinition } from './auth';
import { CacheDefinition, FieldCacheParams } from './cache';
import { LengthLimitedStringDefinition } from './length-limited-string';
import { ScalarDefinition } from './scalar';
import { UniqueDefinition } from './unique';
import { EnumDefinition } from './enum';
import { MapDefinition } from './map';
import { InaccessibleDefinition } from './inaccessible';
import { ShareableDefinition } from './shareable';
import { OverrideDefinition } from './override';
import { ProvidesDefinition } from './provides';
export type DefaultValueType = string | number | Date | object | boolean;
export type DefaultFieldShape = ScalarDefinition | LengthLimitedStringDefinition | EnumDefinition<any, any>;
export declare class DefaultDefinition {
    protected _defaultValue: DefaultValueType;
    protected _scalar: DefaultFieldShape;
    constructor(scalar: DefaultFieldShape, defaultValue: DefaultValueType);
    /**
     * The default value.
     */
    get defaultValue(): DefaultValueType;
    /**
     * The default type of the default value.
     */
    get scalar(): DefaultFieldShape;
    /**
     * Make the field unique.
     */
    unique(): UniqueDefinition;
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
    /**
     * Set the field-level inaccessible directive.
     */
    inaccessible(): InaccessibleDefinition;
    /**
     * Set the field-level shareable directive.
     */
    shareable(): ShareableDefinition;
    /**
     * Set the field-level override directive.
     */
    override(from: string): OverrideDefinition;
    /**
     * Set the field-level provides directive.
     */
    provides(fields: string): ProvidesDefinition;
    toString(): string;
}
export declare function renderDefault(val: any, fieldType: FieldType | Enum<any, any>): any;
//# sourceMappingURL=default.d.ts.map