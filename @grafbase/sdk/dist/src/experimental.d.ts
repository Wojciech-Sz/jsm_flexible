/**
 * Defines the experimental config.
 */
export interface ExperimentalParams {
    kv?: boolean;
    ai?: boolean;
    codegen?: boolean;
}
export declare class Experimental {
    private params;
    constructor(params: ExperimentalParams);
    toString(): string;
}
//# sourceMappingURL=experimental.d.ts.map