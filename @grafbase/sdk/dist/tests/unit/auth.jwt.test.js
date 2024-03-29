"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
var globals_1 = require("@jest/globals");
var utils_1 = require("../utils");
var g = index_1.graph.Standalone();
(0, globals_1.describe)('OpenID auth provider', function () {
    (0, globals_1.beforeEach)(function () { return g.clear(); });
    (0, globals_1.it)('renders a provider with private access', function () {
        var derp = index_1.auth.JWT({
            issuer: '{{ env.ISSUER_URL }}',
            secret: '{{ env.JWT_SECRET }}'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [derp],
                rules: function (rules) {
                    rules.private();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: jwt, issuer: \"{{ env.ISSUER_URL }}\", secret: \"{{ env.JWT_SECRET }}\" }\n          ]\n          rules: [\n            { allow: private }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with custom clientId', function () {
        var derp = index_1.auth.JWT({
            issuer: '{{ env.ISSUER_URL }}',
            secret: '{{ env.JWT_SECRET }}',
            clientId: 'some-id'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [derp],
                rules: function (rules) {
                    rules.private();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: jwt, issuer: \"{{ env.ISSUER_URL }}\", secret: \"{{ env.JWT_SECRET }}\", clientId: \"some-id\" }\n          ]\n          rules: [\n            { allow: private }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with custom groupsClaim', function () {
        var derp = index_1.auth.JWT({
            issuer: '{{ env.ISSUER_URL }}',
            secret: '{{ env.JWT_SECRET }}',
            groupsClaim: 'admin'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [derp],
                rules: function (rules) {
                    rules.private();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: jwt, issuer: \"{{ env.ISSUER_URL }}\", secret: \"{{ env.JWT_SECRET }}\", groupsClaim: \"admin\" }\n          ]\n          rules: [\n            { allow: private }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders JWT auth v2 for federated graph', function () {
        var cfg = (0, index_1.config)({
            graph: index_1.graph.Federated(),
            auth: {
                providers: [
                    index_1.auth.JWT({
                        jwks: {
                            url: 'https:://example.com/.well-known/jwks.json'
                        }
                    })
                ]
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @authz(\n          providers: [\n            { type: jwt, jwks: { url: \"https:://example.com/.well-known/jwks.json\" } }\n          ]\n        )\n      extend schema\n        @graph(type: federated)\n      \"\n    ");
    });
    (0, globals_1.it)('renders JWT auth v2 for federated graph with all options', function () {
        var cfg = (0, index_1.config)({
            graph: index_1.graph.Federated(),
            auth: {
                providers: [
                    index_1.auth.JWT({
                        name: 'my-jwt',
                        jwks: {
                            url: 'https:://example.com/.well-known/jwks.json',
                            issuer: 'https://example.com',
                            audience: 'me',
                            pollInterval: '60s'
                        },
                        header: {
                            name: 'Authorization',
                            valuePrefix: 'Bearer '
                        }
                    })
                ]
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @authz(\n          providers: [\n            { type: jwt, jwks: { url: \"https:://example.com/.well-known/jwks.json\", issuer: \"https://example.com\", audience: \"me\", pollInterval: \"60s\" }, header: { name: \"Authorization\", valuePrefix: \"Bearer \" }, name: \"my-jwt\" }\n          ]\n        )\n      extend schema\n        @graph(type: federated)\n      \"\n    ");
    });
});
