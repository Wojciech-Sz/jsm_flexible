import { EnumDefinition } from './typedefs/enum';
import { InputDefinition } from './typedefs/input';
import { ListDefinition } from './typedefs/list';
import { ScalarDefinition } from './typedefs/scalar';
export type InputFields = Record<string, InputFieldShape>;
export type InputFieldShape = ScalarDefinition | ListDefinition | EnumDefinition<any, any> | InputDefinition;
/**
 * A GraphQL Input Object defines a set of input fields, used in queries and mutations.
 */
export declare class Input {
    private _name;
    private _kind;
    private fields;
    constructor(name: string);
    /**
     * The name of the input.
     */
    get name(): string;
    get kind(): 'input';
    /**
     * Pushes a field to the input definition.
     *
     * @param name - The name of the field.
     * @param definition - The type definition.
     */
    field(name: string, definition: InputFieldShape): this;
    toString(): string;
}
//# sourceMappingURL=input_type.d.ts.map