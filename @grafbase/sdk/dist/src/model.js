"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var auth_1 = require("./auth");
var cache_1 = require("./typedefs/cache");
var validation_1 = require("./validation");
var Model = /** @class */ (function () {
    function Model(name) {
        (0, validation_1.validateIdentifier)(name);
        this._name = name;
        this.fields = [];
    }
    Object.defineProperty(Model.prototype, "name", {
        /**
         * Get the name of the model.
         */
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Set the per-model `@auth` directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    Model.prototype.auth = function (rules) {
        var authRules = new auth_1.AuthRules();
        rules(authRules);
        this.authRules = authRules;
        return this;
    };
    /**
     * Set the per-model `@cache` directive.
     *
     * @param params - The cache definition parameters.
     */
    Model.prototype.cache = function (params) {
        this.cacheDirective = new cache_1.TypeLevelCache(params);
        return this;
    };
    return Model;
}());
exports.Model = Model;
