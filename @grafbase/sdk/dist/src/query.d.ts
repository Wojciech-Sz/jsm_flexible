import { DefaultDefinition, DefaultFieldShape, DefaultValueType } from './typedefs/default';
import { EnumDefinition } from './typedefs/enum';
import { InputDefinition } from './typedefs/input';
import { ListDefinition } from './typedefs/list';
import { ReferenceDefinition } from './typedefs/reference';
import { ScalarDefinition } from './typedefs/scalar';
/** The possible types of an input parameters of a query. */
export type InputType = ScalarDefinition | ListDefinition | InputDefinition | InputDefaultDefinition | EnumDefinition<any, any>;
/** The possible types of an output parameters of a query. */
export type OutputType = ScalarDefinition | ListDefinition | ReferenceDefinition;
/**
 * Defaults are rendered differently in input types, which we do in this specialization
 */
export declare class InputDefaultDefinition extends DefaultDefinition {
    constructor(scalar: DefaultFieldShape, defaultValue: DefaultValueType);
    toString(): string;
}
/**
 * Parameters to create a new query definition.
 */
export interface QueryInput {
    args?: Record<string, InputType>;
    returns: OutputType;
    resolver: string;
}
/**
 * An input argument shape of a query.
 */
export declare class QueryArgument {
    private name;
    private type;
    constructor(name: string, type: InputType);
    toString(): string;
}
/**
 * An edge resolver query definition.
 */
export declare class Query {
    private name;
    private _kind;
    private arguments;
    private returns;
    private resolver;
    constructor(name: string, returnType: OutputType, resolverName: string, mutation: boolean);
    get kind(): 'mutation' | 'query';
    /**
     * Push a new input argument to the query.
     *
     * @param name - The name of the input parameter.
     * @param type - The type of the input parameter.
     */
    argument(name: string, type: InputType): Query;
    toString(): string;
}
//# sourceMappingURL=query.d.ts.map