import { AuthRuleF } from '../auth';
import { ReferenceDefinition } from './reference';
import { DefaultValueType } from './default';
import { BigIntDefinition, BooleanDefinition, BytesDefinition, DateDefinition, DecimalDefinition, NumberDefinition, ScalarDefinition, StringDefinition } from './scalar';
import { SearchDefinition } from './search';
import { FieldType } from '../typedefs';
import { EnumDefinition } from './enum';
import { InputDefinition } from './input';
import { RequireAtLeastOne } from 'type-fest';
import { FieldLength } from './length-limited-string';
import { LengthLimitedStringDefinition } from './length-limited-string';
import { MapDefinition } from './map';
export type ListScalarType = ScalarDefinition | ReferenceDefinition | EnumDefinition<any, any> | InputDefinition;
export declare class ListDefinition {
    private fieldDefinition;
    private isOptional;
    protected defaultValue?: DefaultValueType[];
    private authRules?;
    private resolverName?;
    private joinSelect?;
    private otherDirectives;
    constructor(fieldDefinition: ListScalarType);
    /**
     * Make the field optional.
     */
    optional(): ListDefinition;
    /**
     * Make the field searchable.
     */
    search(): SearchDefinition;
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    auth(rules: AuthRuleF): ListDefinition;
    /**
     * Attach a resolver function to the field.
     *
     * @param name - The name of the resolver function file without the extension or directory.
     */
    resolver(name: string): ListDefinition;
    /**
     * Attach a join function to the field.
     *
     * @param select - The field selection string to join onto this field
     */
    join(select: string): ListDefinition;
    /**
     * Sets the name of the field in the database, if different than the name of the field.
     *
     * @param name - The mapped name
     */
    mapped(name: string): MapDefinition;
    /**
     * Adds a tag to this field
     *
     * @param tag - The tag to add
     */
    tag(name: string): ListDefinition;
    /**
     * Set the field-level inaccessible directive.
     */
    inaccessible(): ListDefinition;
    /**
     * Set the field-level shareable directive.
     */
    shareable(): ListDefinition;
    /**
     * Set the field-level override directive.
     */
    override(from: string): ListDefinition;
    /**
     * Set the field-level provides directive.
     */
    provides(fields: string): ListDefinition;
    toString(): string;
}
declare class ListWithDefaultDefinition extends ListDefinition {
    protected _fieldType: FieldType;
    constructor(fieldDefinition: ScalarDefinition);
    toString(): string;
}
export declare class DecimalListDefinition extends ListWithDefaultDefinition {
    constructor(fieldDefinition: DecimalDefinition);
    /**
     * The type of the field
     */
    get fieldType(): FieldType;
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    default(val: string[]): this;
}
export declare class BytesListDefinition extends ListWithDefaultDefinition {
    constructor(fieldDefinition: BytesDefinition);
    /**
     * The type of the field
     */
    get fieldType(): FieldType;
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    default(val: string[]): this;
}
export declare class BigIntListDefinition extends ListWithDefaultDefinition {
    constructor(fieldDefinition: BigIntDefinition);
    /**
     * The type of the field
     */
    get fieldType(): FieldType;
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    default(val: string[]): this;
}
export declare class StringListDefinition extends ListWithDefaultDefinition {
    constructor(fieldDefinition: StringDefinition);
    /**
     * The type of the field
     */
    get fieldType(): FieldType;
    /**
     * Specify a minimum or a maximum (or both) length of the field.
     *
     * @param fieldLength - Either `min`, `max` or both.
     */
    length(fieldLength: RequireAtLeastOne<FieldLength, 'min' | 'max'>): LengthLimitedStringDefinition;
    /**
     * Sets the name of the field in the database, if different than the name of the field.
     *
     * @param name - The mapped name
     */
    map(name: string): MapDefinition;
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    default(val: string[]): StringListDefinition;
}
export declare class NumberListDefinition extends ListWithDefaultDefinition {
    constructor(fieldDefinition: NumberDefinition);
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    default(val: number[]): NumberListDefinition;
}
export declare class BooleanListDefinition extends ListWithDefaultDefinition {
    constructor(fieldDefinition: BooleanDefinition);
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    default(val: boolean[]): BooleanListDefinition;
}
export declare class DateListDefinition extends ListWithDefaultDefinition {
    constructor(fieldDefinition: DateDefinition);
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    default(val: Date[]): DateListDefinition;
}
export {};
//# sourceMappingURL=list.d.ts.map