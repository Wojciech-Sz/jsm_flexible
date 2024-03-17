"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
var globals_1 = require("@jest/globals");
var utils_1 = require("../utils");
var g = index_1.graph.Standalone();
(0, globals_1.describe)('OpenID auth provider', function () {
    (0, globals_1.beforeEach)(function () { return g.clear(); });
    (0, globals_1.it)('public access', function () {
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                rules: function (rules) {
                    rules.public();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          rules: [\n            { allow: public }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('public access with introspection operations', function () {
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                rules: function (rules) {
                    rules.public().introspection();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          rules: [\n            { allow: public, operations: [introspection] }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('public access with read and introspection operations', function () {
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                rules: function (rules) {
                    rules.public().read().introspection();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          rules: [\n            { allow: public, operations: [read, introspection] }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with private access', function () {
        var clerk = index_1.auth.OpenIDConnect({
            issuer: '{{ env.ISSUER_URL }}'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [clerk],
                rules: function (rules) {
                    rules.private();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: oidc, issuer: \"{{ env.ISSUER_URL }}\" }\n          ]\n          rules: [\n            { allow: private }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with custom clientId', function () {
        var clerk = index_1.auth.OpenIDConnect({
            issuer: '{{ env.ISSUER_URL }}',
            clientId: 'some-id'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [clerk],
                rules: function (rules) {
                    rules.private();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: oidc, issuer: \"{{ env.ISSUER_URL }}\", clientId: \"some-id\" }\n          ]\n          rules: [\n            { allow: private }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with custom groupsClaim', function () {
        var clerk = index_1.auth.OpenIDConnect({
            issuer: '{{ env.ISSUER_URL }}',
            groupsClaim: 'admin'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [clerk],
                rules: function (rules) {
                    rules.private();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: oidc, issuer: \"{{ env.ISSUER_URL }}\", groupsClaim: \"admin\" }\n          ]\n          rules: [\n            { allow: private }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with private access for get', function () {
        var clerk = index_1.auth.OpenIDConnect({
            issuer: '{{ env.ISSUER_URL }}'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [clerk],
                rules: function (rules) {
                    rules.private().get();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: oidc, issuer: \"{{ env.ISSUER_URL }}\" }\n          ]\n          rules: [\n            { allow: private, operations: [get] }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with private access for list', function () {
        var clerk = index_1.auth.OpenIDConnect({
            issuer: '{{ env.ISSUER_URL }}'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [clerk],
                rules: function (rules) {
                    rules.private().list();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: oidc, issuer: \"{{ env.ISSUER_URL }}\" }\n          ]\n          rules: [\n            { allow: private, operations: [list] }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with private access for read', function () {
        var clerk = index_1.auth.OpenIDConnect({
            issuer: '{{ env.ISSUER_URL }}'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [clerk],
                rules: function (rules) {
                    rules.private().read();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: oidc, issuer: \"{{ env.ISSUER_URL }}\" }\n          ]\n          rules: [\n            { allow: private, operations: [read] }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with private access for create', function () {
        var clerk = index_1.auth.OpenIDConnect({
            issuer: '{{ env.ISSUER_URL }}'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [clerk],
                rules: function (rules) {
                    rules.private().create();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: oidc, issuer: \"{{ env.ISSUER_URL }}\" }\n          ]\n          rules: [\n            { allow: private, operations: [create] }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with private access for update', function () {
        var clerk = index_1.auth.OpenIDConnect({
            issuer: '{{ env.ISSUER_URL }}'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [clerk],
                rules: function (rules) {
                    rules.private().update();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: oidc, issuer: \"{{ env.ISSUER_URL }}\" }\n          ]\n          rules: [\n            { allow: private, operations: [update] }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with private access for delete', function () {
        var clerk = index_1.auth.OpenIDConnect({
            issuer: '{{ env.ISSUER_URL }}'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [clerk],
                rules: function (rules) {
                    rules.private().delete();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: oidc, issuer: \"{{ env.ISSUER_URL }}\" }\n          ]\n          rules: [\n            { allow: private, operations: [delete] }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with private access for get, list and read', function () {
        var clerk = index_1.auth.OpenIDConnect({
            issuer: '{{ env.ISSUER_URL }}'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [clerk],
                rules: function (rules) {
                    rules.private().get().list().read();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: oidc, issuer: \"{{ env.ISSUER_URL }}\" }\n          ]\n          rules: [\n            { allow: private, operations: [get, list, read] }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with private access for read and introspection', function () {
        var clerk = index_1.auth.OpenIDConnect({
            issuer: '{{ env.ISSUER_URL }}'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [clerk],
                rules: function (rules) {
                    rules.private().read().introspection();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: oidc, issuer: \"{{ env.ISSUER_URL }}\" }\n          ]\n          rules: [\n            { allow: private, operations: [read, introspection] }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with groups access', function () {
        var clerk = index_1.auth.OpenIDConnect({
            issuer: '{{ env.ISSUER_URL }}'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [clerk],
                rules: function (rules) {
                    rules.groups(['backend', 'admin']);
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: oidc, issuer: \"{{ env.ISSUER_URL }}\" }\n          ]\n          rules: [\n            { allow: groups, groups: [\"backend\", \"admin\"] }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders a provider with groups access and custom operations', function () {
        var clerk = index_1.auth.OpenIDConnect({
            issuer: '{{ env.ISSUER_URL }}'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [clerk],
                rules: function (rules) {
                    rules.groups(['backend', 'admin']).delete();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: oidc, issuer: \"{{ env.ISSUER_URL }}\" }\n          ]\n          rules: [\n            { allow: groups, groups: [\"backend\", \"admin\"], operations: [delete] }\n          ]\n        )\"\n    ");
    });
    (0, globals_1.it)('renders multiple rules like a champ', function () {
        var clerk = index_1.auth.OpenIDConnect({
            issuer: '{{ env.ISSUER_URL }}'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [clerk],
                rules: function (rules) {
                    rules.private().read();
                    rules.groups(['backend', 'admin']).delete();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: oidc, issuer: \"{{ env.ISSUER_URL }}\" }\n          ]\n          rules: [\n            { allow: private, operations: [read] }\n            { allow: groups, groups: [\"backend\", \"admin\"], operations: [delete] }\n          ]\n        )\"\n    ");
    });
});
