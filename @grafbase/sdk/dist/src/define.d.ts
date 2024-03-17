import { Enum } from './enum';
import { Input, InputFields } from './input_type';
import { Interface, InterfaceFields } from './interface';
import { Query, QueryInput } from './query';
import { Type, TypeFields } from './type';
import { EnumDefinition } from './typedefs/enum';
import { InputDefinition } from './typedefs/input';
import { ReferenceDefinition } from './typedefs/reference';
import { Union } from './union';
declare const _default: {
    /**
     * Creates a new object type.
     *
     * @param name - The name of the type.
     * @param fields - The fields to be included.
     */
    type: (name: string, fields: TypeFields) => Type;
    /**
     * Creates a new interface.
     *
     * @param name - The name of the interface.
     * @param fields - The fields to be included.
     */
    interface: (name: string, fields: InterfaceFields) => Interface;
    /**
     * Creates a new union.
     *
     * @param name - The name of the union.
     * @param types - The types to be included.
     */
    union: (name: string, types: Record<string, Type>) => Union;
    /**
     * Creates a new query
     *
     * @param name - The name of the query.
     * @param definition - The query definition.
     */
    query: (name: string, definition: QueryInput) => Query;
    /**
     * Creates a new mutation.
     *
     * @param name - The name of the mutation.
     * @param fields - The mutation definition.
     */
    mutation: (name: string, definition: QueryInput) => Query;
    /**
     * Creates a new input.
     *
     * @param name = The name of the input.
     * @param fields = The input definition.
     */
    input: (name: string, definition: InputFields) => Input;
    /**
     * Creates a new enum.
     *
     * @param name - The name of the enum.
     * @param variants - A list of variants of the enum.
     */
    enum: <T extends string, U extends [T, ...T[]]>(name: string, variants: U) => Enum<string, U>;
    /**
     * Create a new reference field, referencing a type.
     *
     * @param type - A type to be referred.
     */
    ref: (type: Type | string) => ReferenceDefinition;
    /**
     * Create a new enum field.
     *
     * @param definition - An enum to be referred.
     */
    enumRef: <T_1 extends string, U_1 extends [T_1, ...T_1[]]>(definition: Enum<T_1, U_1>) => EnumDefinition<T_1, U_1>;
    /**
     * Create a new field from an input object reference.
     *
     * @param input - The input object reference.
     */
    inputRef: (input: Input) => InputDefinition;
};
export default _default;
//# sourceMappingURL=define.d.ts.map