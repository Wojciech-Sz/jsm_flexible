import { AuthRuleF } from '../auth';
import { AuthDefinition } from './auth';
import { CacheDefinition, FieldCacheParams } from './cache';
import { DefaultDefinition } from './default';
import { ReferenceDefinition } from './reference';
import { ScalarDefinition } from './scalar';
import { EnumDefinition } from './enum';
import { ResolverDefinition } from './resolver';
import { JoinDefinition } from './join';
import { TagDefinition } from './tag';
/**
 * A list of field types that can hold an `@override` attribute.
 */
export type Overridable = ScalarDefinition | DefaultDefinition | ReferenceDefinition | EnumDefinition<any, any> | TagDefinition;
export declare class OverrideDefinition {
    private field;
    private from;
    constructor(field: Overridable, from: string);
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
    toString(): string;
}
//# sourceMappingURL=override.d.ts.map