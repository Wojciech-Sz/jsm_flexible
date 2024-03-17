import { AuthRuleF } from '../auth';
import { ListDefinition } from './list';
import { Type } from '../type';
import { AuthDefinition } from './auth';
import { ResolverDefinition } from './resolver';
import { MapDefinition } from './map';
import { JoinDefinition } from './join';
import { DeprecatedDefinition } from './deprecated';
import { InaccessibleDefinition } from './inaccessible';
import { ShareableDefinition } from './shareable';
import { OverrideDefinition } from './override';
import { ProvidesDefinition } from './provides';
export declare class ReferenceDefinition {
    private referencedType;
    private isOptional;
    constructor(referencedType: Type | string);
    /**
     * Set the field optional.
     */
    optional(): ReferenceDefinition;
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
//# sourceMappingURL=reference.d.ts.map