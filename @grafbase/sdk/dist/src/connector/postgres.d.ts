export interface PostgresParams {
    url: string;
}
export declare class PartialPostgresAPI {
    private name;
    private url;
    constructor(name: string, params: PostgresParams);
    finalize(namespace?: boolean): PostgresAPI;
}
export declare class PostgresAPI {
    private name;
    private url;
    private namespace?;
    constructor(name: string, url: string, namespace?: boolean);
    toString(): string;
}
//# sourceMappingURL=postgres.d.ts.map