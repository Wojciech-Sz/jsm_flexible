export type HeaderGenerator = (headers: Headers) => void;
export type HeaderValue = {
    type: 'static';
    value: string;
} | {
    type: 'forward';
    from: string;
};
/**
 * Header used in connector calls.
 */
export declare class Header {
    private name;
    private value;
    constructor(name: string, value: HeaderValue);
    toString(): string;
}
/**
 * An accumulator class to gather headers for a connector which supports
 * introspection headers.
 */
export declare class Headers {
    private _headers;
    private _introspectionHeaders;
    constructor();
    /**
     * All headers used in client requests.
     */
    get headers(): Header[];
    /**
     * All headers used in introspection requests.
     */
    get introspectionHeaders(): Header[];
    /**
     * Creates a header used in client requests.
     *
     * @deprecated Use set instead
     * @param name - The name of the header
     * @param value - The value of the header
     */
    static(name: string, value: string): void;
    /**
     * Creates a header used in client requests.
     *
     * @param name - The name of the header
     * @param value - The value for the header.  Either a hardcoded string or a header name to forward from.
     */
    set(name: string, value: string | {
        forward: string;
    }): void;
    /**
     * Creates a header used in introspection requests.
     *
     * @param name - The name of the header
     * @param value - The value of the header
     */
    introspection(name: string, value: string): void;
}
//# sourceMappingURL=header.d.ts.map