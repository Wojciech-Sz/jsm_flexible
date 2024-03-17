import { AuthRuleF } from '../auth';
import { Enum, EnumShape } from '../enum';
import { AuthDefinition } from './auth';
import { CacheDefinition, FieldCacheParams } from './cache';
import { DefaultDefinition } from './default';
import { DeprecatedDefinition } from './deprecated';
import { InaccessibleDefinition } from './inaccessible';
import { JoinDefinition } from './join';
import { ListDefinition } from './list';
import { MapDefinition } from './map';
import { OverrideDefinition } from './override';
import { ProvidesDefinition } from './provides';
import { ResolverDefinition } from './resolver';
import { SearchDefinition } from './search';
import { ShareableDefinition } from './shareable';
import { UniqueDefinition } from './unique';
export declare class EnumDefinition<T extends string, U extends EnumShape<T>> {
    private enumName;
    private enumVariants;
    private isOptional;
    constructor(referencedEnum: Enum<T, U>);
    /**
     * Set the field optional.
     */
    optional(): this;
    /**
     * Allow multiple scalars to be used as values for the field.
     */
    list(): ListDefinition;
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
     * Make the field unique.
     *
     * @param scope - Additional fields to be added to the constraint.
     */
    unique(scope?: string[]): UniqueDefinition;
    /**
     * Set the default value of the field.
     *
     * @param value - The value written to the database.
     */
    default(value: U[number]): DefaultDefinition;
    /**
     * Set the field-level deprecated directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    deprecated(reason?: string): DeprecatedDefinition;
    /**
     * Attach a resolver function to the field.
     *
     * @param name - The name of the resolver function file without the extension or directory.
     */
    resolver(name: string): ResolverDefinition;
    /**
     * Attach a join function to the field.
     *
     * @param select - The field selection string to join onto this field
     */
    join(select: string): JoinDefinition;
    /**
     * Set the field-level cache directive.
     *
     * @param params - The cache definition parameters.
     */
    cache(params: FieldCacheParams): CacheDefinition;
    /**
     * Sets the name of the field in the database, if different than the name of the field.
     *
     * @param name - The mapped name
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
    fieldTypeVal(): Enum<T, U>;
}
//# sourceMappingURL=enum.d.ts.map