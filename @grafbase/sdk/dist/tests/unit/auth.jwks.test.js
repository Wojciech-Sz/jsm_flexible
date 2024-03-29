"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
var globals_1 = require("@jest/globals");
var utils_1 = require("../utils");
var g = index_1.graph.Standalone();
(0, globals_1.describe)('OpenID auth provider', function () {
    (0, globals_1.beforeEach)(function () { return g.clear(); });
    (0, globals_1.it)('renders a provider with private access', function () {
        var derp = index_1.auth.JWKS({
            issuer: '{{ env.ISSUER_URL }}'
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
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: jwks, issuer: \"{{ env.ISSUER_URL }}\" }\n          ]\n          rules: [\n            { allow: private }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with jwksEndpoint', function () {
        var derp = index_1.auth.JWKS({
            jwksEndpoint: '{{ env.JWKS_ENDPOINT }}'
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
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: jwks, jwksEndpoint: \"{{ env.JWKS_ENDPOINT }}\" }\n          ]\n          rules: [\n            { allow: private }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with issuer and jwksEndpoint', function () {
        var derp = index_1.auth.JWKS({
            jwksEndpoint: '{{ env.JWKS_ENDPOINT }}',
            issuer: '{{ env.ISSUER }}'
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
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: jwks, issuer: \"{{ env.ISSUER }}\", jwksEndpoint: \"{{ env.JWKS_ENDPOINT }}\" }\n          ]\n          rules: [\n            { allow: private }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with custom clientId', function () {
        var derp = index_1.auth.JWKS({
            issuer: '{{ env.ISSUER_URL }}',
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
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: jwks, issuer: \"{{ env.ISSUER_URL }}\", clientId: \"some-id\" }\n          ]\n          rules: [\n            { allow: private }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with custom groupsClaim', function () {
        var derp = index_1.auth.JWKS({
            issuer: '{{ env.ISSUER_URL }}',
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
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: jwks, issuer: \"{{ env.ISSUER_URL }}\", groupsClaim: \"admin\" }\n          ]\n          rules: [\n            { allow: private }\n          ]\n        )\"\n    ");
    });
});
