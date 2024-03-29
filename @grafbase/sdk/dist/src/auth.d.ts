import { FixedLengthArray } from 'type-fest';
import { JWKSAuth } from './auth/jwks';
import { JWTAuth, JWTAuthV2 } from './auth/jwt';
import { OpenIDAuth } from './auth/openid';
import { Authorizer } from './auth/authorizer';
/**
 * A list of authentication providers which can be used in the configuration.
 */
export type AuthProvider = OpenIDAuth | JWTAuth | JWKSAuth | Authorizer;
export type AuthProviderV2 = JWTAuthV2;
/**
 * A closure to define authentication rules.
 */
export type AuthRuleF = (rules: AuthRules) => any;
/**
 * A list of supported authenticated operations.
 */
export type AuthOperation = 'get' | 'list' | 'read' | 'create' | 'update' | 'delete' | 'introspection';
/**
 * A list of supported authentication strategies.
 */
export type AuthStrategy = 'public' | 'private' | AuthGroups;
/**
 * A builder to greate auth groups.
 */
export declare class AuthGroups {
    private groups;
    constructor(groups: string[]);
    toString(): string;
}
/**
 * A builder to create a rule to the auth attribute.
 */
export declare class AuthRule {
    private strategy;
    private operations;
    constructor(strategy: AuthStrategy);
    /** Allow the `get` operation for the given strategy. */
    get(): AuthRule;
    /** Allow the `list` operation for the given strategy. */
    list(): AuthRule;
    /** Allow the `read` operation for the given strategy. */
    read(): AuthRule;
    /** Allow the `create` operation for the given strategy. */
    create(): AuthRule;
    /** Allow the `update` operation for the given strategy. */
    update(): AuthRule;
    /** Allow the `delete` operation for the given strategy. */
    delete(): AuthRule;
    /** Allow the `introspection` operation for the given strategy. */
    introspection(): AuthRule;
    toString(): string;
    private operation;
}
/**
 * A builder to generate a set of rules to the auth attribute.
 */
export declare class AuthRules {
    private rules;
    constructor();
    /**
     * Allow public access.
     */
    public(): AuthRule;
    /**
     * Allow access to any signed-in user.
     */
    private(): AuthRule;
    /**
     * Allow access to users of a group.
     *
     * @param groups - A list of groups with access.
     */
    groups(groups: string[]): AuthRule;
    toString(): string;
}
type RequireAtLeastOne<T> = {
    [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];
export type AuthParams = RequireAtLeastOne<{
    providers?: FixedLengthArray<AuthProvider, 1>;
    rules?: AuthRuleF;
}>;
export declare class Authentication {
    private providers?;
    private rules;
    constructor(params: AuthParams);
    toString(): string;
}
export type AuthParamsV2 = RequireAtLeastOne<{
    providers?: FixedLengthArray<AuthProviderV2, 1>;
}>;
export declare class AuthenticationV2 {
    private providers?;
    constructor(params: AuthParamsV2);
    toString(): string;
}
export {};
//# sourceMappingURL=auth.d.ts.map