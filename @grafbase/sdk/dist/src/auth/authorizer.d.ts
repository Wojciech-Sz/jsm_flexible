/**
 * Input parameters to define an authorizer auth provider.
 */
export interface AuthorizerParams {
    name: string;
}
/**
 * An authorizer for multi-tenant JWT verification with
 * more complex rules that require calling a JavaScript
 * function.
 *
 * The name parameter is the name of the file implementing
 * the needed function without the extension.
 * For example, if the name is 'foo', the file is in
 * `grafbase/auth/foo.js`.
 */
export declare class Authorizer {
    private name;
    constructor(params: AuthorizerParams);
    toString(): string;
}
//# sourceMappingURL=authorizer.d.ts.map