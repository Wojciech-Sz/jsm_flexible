"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationV2 = exports.Authentication = exports.AuthRules = exports.AuthRule = exports.AuthGroups = void 0;
/**
 * A builder to greate auth groups.
 */
var AuthGroups = /** @class */ (function () {
    function AuthGroups(groups) {
        this.groups = groups;
    }
    AuthGroups.prototype.toString = function () {
        var groups = this.groups.map(function (g) { return "\"".concat(g, "\""); }).join(', ');
        return "groups, groups: [".concat(groups, "]");
    };
    return AuthGroups;
}());
exports.AuthGroups = AuthGroups;
/**
 * A builder to create a rule to the auth attribute.
 */
var AuthRule = /** @class */ (function () {
    function AuthRule(strategy) {
        this.strategy = strategy;
        this.operations = [];
    }
    /** Allow the `get` operation for the given strategy. */
    AuthRule.prototype.get = function () {
        return this.operation('get');
    };
    /** Allow the `list` operation for the given strategy. */
    AuthRule.prototype.list = function () {
        return this.operation('list');
    };
    /** Allow the `read` operation for the given strategy. */
    AuthRule.prototype.read = function () {
        return this.operation('read');
    };
    /** Allow the `create` operation for the given strategy. */
    AuthRule.prototype.create = function () {
        return this.operation('create');
    };
    /** Allow the `update` operation for the given strategy. */
    AuthRule.prototype.update = function () {
        return this.operation('update');
    };
    /** Allow the `delete` operation for the given strategy. */
    AuthRule.prototype.delete = function () {
        return this.operation('delete');
    };
    /** Allow the `introspection` operation for the given strategy. */
    AuthRule.prototype.introspection = function () {
        return this.operation('introspection');
    };
    AuthRule.prototype.toString = function () {
        var allow = "allow: ".concat(this.strategy);
        var ops = this.operations.map(function (op) { return "".concat(op); }).join(', ');
        ops = ops ? ", operations: [".concat(ops, "]") : '';
        return "{ ".concat(allow).concat(ops, " }");
    };
    AuthRule.prototype.operation = function (op) {
        this.operations.push(op);
        return this;
    };
    return AuthRule;
}());
exports.AuthRule = AuthRule;
/**
 * A builder to generate a set of rules to the auth attribute.
 */
var AuthRules = /** @class */ (function () {
    function AuthRules() {
        this.rules = [];
    }
    /**
     * Allow public access.
     */
    AuthRules.prototype.public = function () {
        var rule = new AuthRule('public');
        this.rules.push(rule);
        return rule;
    };
    /**
     * Allow access to any signed-in user.
     */
    AuthRules.prototype.private = function () {
        var rule = new AuthRule('private');
        this.rules.push(rule);
        return rule;
    };
    /**
     * Allow access to users of a group.
     *
     * @param groups - A list of groups with access.
     */
    AuthRules.prototype.groups = function (groups) {
        var rule = new AuthRule(new AuthGroups(groups));
        this.rules.push(rule);
        return rule;
    };
    AuthRules.prototype.toString = function () {
        var rules = this.rules.map(function (rule) { return "      ".concat(rule); }).join('\n');
        if (rules) {
            rules = "[\n".concat(rules, "\n    ]");
        }
        else {
            rules = '';
        }
        return rules;
    };
    return AuthRules;
}());
exports.AuthRules = AuthRules;
var Authentication = /** @class */ (function () {
    function Authentication(params) {
        var _a;
        this.providers = params.providers;
        var rules = new AuthRules();
        (_a = params.rules) === null || _a === void 0 ? void 0 : _a.call(params, rules);
        this.rules = rules;
    }
    Authentication.prototype.toString = function () {
        var providers = this.providers
            ? this.providers.map(String).join('\n      ')
            : '';
        if (providers) {
            providers = "\n    providers: [\n      ".concat(providers, "\n    ]");
        }
        var rules = this.rules.toString();
        if (rules) {
            rules = "\n    rules: ".concat(rules);
        }
        return "extend schema\n  @auth(".concat(providers).concat(rules, "\n  )");
    };
    return Authentication;
}());
exports.Authentication = Authentication;
var AuthenticationV2 = /** @class */ (function () {
    function AuthenticationV2(params) {
        this.providers = params.providers;
    }
    AuthenticationV2.prototype.toString = function () {
        var providers = this.providers
            ? this.providers.map(String).join('\n      ')
            : '';
        if (providers) {
            providers = "\n    providers: [\n      ".concat(providers, "\n    ]");
        }
        return "extend schema\n  @authz(".concat(providers, "\n  )");
    };
    return AuthenticationV2;
}());
exports.AuthenticationV2 = AuthenticationV2;
