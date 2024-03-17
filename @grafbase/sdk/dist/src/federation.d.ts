export interface FederationParams {
    version: '2.3';
}
export declare class Federation {
    private version;
    constructor(params: FederationParams);
    toString(): string;
}
export interface FederationKeyParameters {
    resolvable?: boolean;
    select?: string;
}
export declare class FederationKey {
    private fields;
    private parameters;
    constructor(fields: string, parameters?: FederationKeyParameters);
    toString(): string;
}
//# sourceMappingURL=federation.d.ts.map