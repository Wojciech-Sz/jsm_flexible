/**
 * Defines operation limits.
 */
export interface OperationLimitsParams {
    aliases?: number;
    complexity?: number;
    depth?: number;
    height?: number;
    rootFields?: number;
}
export declare class OperationLimits {
    private params;
    constructor(params: OperationLimitsParams);
    toString(): string;
}
//# sourceMappingURL=operation-limits.d.ts.map