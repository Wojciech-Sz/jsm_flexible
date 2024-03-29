import { Field } from './field';
import { ListDefinition } from './typedefs/list';
import { ScalarDefinition } from './typedefs/scalar';
/**
 * A collection of fields in an interface.
 */
export type InterfaceFields = Record<string, InterfaceFieldShape>;
/**
 * A combination of classes a field in an interface can be.
 */
export type InterfaceFieldShape = ScalarDefinition | ListDefinition;
export declare class Interface {
    private _name;
    private _fields;
    private _kind;
    constructor(name: string);
    /**
     * Push a new field to the interface definition.
     *
     * @param name - The name of the field.
     * @param definition - The type and attirbutes of the field.
     */
    field(name: string, definition: InterfaceFieldShape): Interface;
    /**
     * All fields that belong to the interface.
     */
    get fields(): Field[];
    get kind(): 'interface';
    /**
     * The name of the interface.
     */
    get name(): string;
    toString(): string;
}
//# sourceMappingURL=interface.d.ts.map