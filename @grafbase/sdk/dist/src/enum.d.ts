/**
 * Defines how an input enum can look like. Either an array of
 * strings with at least one item, or a TypeScript enum definition.
 */
export type EnumShape<T> = [T, ...Array<T>];
export declare class Enum<T extends string, U extends EnumShape<T>> {
    private _name;
    private _variants;
    private _kind;
    constructor(name: string, variants: U);
    /**
     * The name of the enum.
     */
    get name(): string;
    /**
     * A list of variants in the enum.
     */
    get variants(): U;
    get kind(): 'enum';
    toString(): string;
}
//# sourceMappingURL=enum.d.ts.map