"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderAccessScope = exports.renderMutationInvalidation = exports.GlobalCache = void 0;
var GlobalCache = /** @class */ (function () {
    function GlobalCache(params) {
        this.params = params;
    }
    GlobalCache.prototype.toString = function () {
        var rules = this.params.rules.map(function (rule) {
            var types = "\n      types: ".concat(renderTypes(rule.types));
            var maxAge = ",\n      maxAge: ".concat(rule.maxAge);
            var staleWhileRevalidate = rule.staleWhileRevalidate
                ? ",\n      staleWhileRevalidate: ".concat(rule.staleWhileRevalidate)
                : '';
            var mutationInvalidation = rule.mutationInvalidation
                ? ",\n      mutationInvalidation: ".concat(renderMutationInvalidation(rule.mutationInvalidation))
                : '';
            var scopes = rule.scopes
                ? ",\n      scopes: [".concat(rule.scopes
                    .map(function (scope) { return renderAccessScope(scope); })
                    .join(', '), "]")
                : '';
            return "    {".concat(types).concat(maxAge).concat(staleWhileRevalidate).concat(mutationInvalidation).concat(scopes, "\n    }");
        });
        return "extend schema\n  @cache(rules: [\n".concat(rules, "\n  ])\n\n");
    };
    return GlobalCache;
}());
exports.GlobalCache = GlobalCache;
function renderMutationInvalidation(val) {
    if (typeof val === 'object') {
        return "{ field: \"".concat(val.field, "\" }");
    }
    else {
        return val;
    }
}
exports.renderMutationInvalidation = renderMutationInvalidation;
function renderAccessScope(scope) {
    if (typeof scope === 'object') {
        var key = Object.keys(scope)[0];
        var value = Object.values(scope)[0];
        return "{ ".concat(key, ": \"").concat(value, "\" }");
    }
    else {
        return scope;
    }
}
exports.renderAccessScope = renderAccessScope;
function renderTypes(types) {
    if (typeof types === 'string') {
        return "\"".concat(types, "\"");
    }
    else {
        var inner = types
            .map(function (type) {
            if (typeof type === 'string') {
                return "\"".concat(type, "\"");
            }
            else {
                var fields = type.fields
                    ? type.fields.map(function (field) { return "\"".concat(field, "\""); }).join(',')
                    : '';
                fields = fields ? ",\n        fields: [".concat(fields, "]\n") : '\n';
                return "{\n        name: \"".concat(type.name, "\"").concat(fields, "      }");
            }
        })
            .join(', ');
        return "[".concat(inner, "]");
    }
}
