"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinDefinition = void 0;
var auth_1 = require("./auth");
var cache_1 = require("./cache");
var JoinDefinition = /** @class */ (function () {
    function JoinDefinition(field, select) {
        this.field = field;
        this.select = select;
    }
    /**
     * Set the field-level auth directive.
     *
     * @param rules - A closure to build the authentication rules.
     */
    JoinDefinition.prototype.auth = function (rules) {
        return new auth_1.AuthDefinition(this, rules);
    };
    /**
     * Set the field-level cache directive.
     *
     * @param params - The cache definition parameters.
     */
    JoinDefinition.prototype.cache = function (params) {
        return new cache_1.CacheDefinition(this, new cache_1.FieldLevelCache(params));
    };
    JoinDefinition.prototype.toString = function () {
        return "".concat(this.field, " @join(select: \"").concat(this.select, "\")");
    };
    return JoinDefinition;
}());
exports.JoinDefinition = JoinDefinition;
