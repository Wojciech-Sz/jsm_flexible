import { AuthRuleF, AuthRules } from './auth';
import { Field } from './field';
import { TypeCacheParams, TypeLevelCache } from './typedefs/cache';
export declare class Model {
    private _name;
    protected fields: Field[];
    protected authRules?: AuthRules;
    protected cacheDirective?: TypeLevelCache;
    constructor(name: string);
    /**
     * Get the name of the model.
     */
    get name(): string;
    /**
     * Set the per-model `@auth` directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    auth(rules: AuthRuleF): this;
    /**
     * Set the per-model `@cache` directive.
     *
     * @param params - The cache definition parameters.
     */
    cache(params: TypeCacheParams): this;
}
//# sourceMappingURL=model.d.ts.map