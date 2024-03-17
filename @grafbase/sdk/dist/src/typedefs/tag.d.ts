import { AuthRuleF } from '../auth';
import { AuthDefinition } from './auth';
import { CacheDefinition, FieldCacheParams } from './cache';
import { DefaultDefinition } from './default';
import { ReferenceDefinition } from './reference';
import { ScalarDefinition } from './scalar';
import { EnumDefinition } from './enum';
import { ResolverDefinition } from './resolver';
import { JoinDefinition } from './join';
import { InaccessibleDefinition } from './inaccessible';
import { ShareableDefinition } from './shareable';
import { OverrideDefinition } from './override';
import { ProvidesDefinition } from './provides';
import { DeprecatedDefinition } from './deprecated';
/**
 * A list of field types that can hold a `@tag` attribute.
 */
export type Taggable = ScalarDefinition | DefaultDefinition | ReferenceDefinition | EnumDefinition<any, any> | TagDefinition | InaccessibleDefinition | ShareableDefinition | OverrideDefinition | ProvidesDefinition | DeprecatedDefinition;
export declare class TagDefinition {
    private field;
    private name;
    constructor(field: Taggable, name: string);
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    auth(rules: AuthRuleF): AuthDefinition;
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
     * Adds a tag to this field
     *
     * @param tag - The tag to add
     */
    tag(tag: string): TagDefinition;
    /**
     * Set the field-level cache directive.
     *
     * @param params - The cache definition parameters.
     */
    cache(params: FieldCacheParams): CacheDefinition;
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
//# sourceMappingURL=tag.d.ts.map