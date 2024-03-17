import { Type } from './type';
/**
 * A builder to create a GraphQL union.
 */
export declare class Union {
    private name;
    private _kind;
    private types;
    constructor(name: string);
    /**
     * Push a new type to the union definition.
     *
     * @param type - The included type.
     */
    type(type: Type): Union;
    get kind(): 'union';
    toString(): string;
}
//# sourceMappingURL=union.d.ts.map