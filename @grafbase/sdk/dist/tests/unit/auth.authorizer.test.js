"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
var globals_1 = require("@jest/globals");
var utils_1 = require("../utils");
var g = index_1.graph.Standalone();
(0, globals_1.describe)('Authorizer auth provider', function () {
    (0, globals_1.beforeEach)(function () { return g.clear(); });
    (0, globals_1.it)('renders a provider with private access', function () {
        var narf = index_1.auth.Authorizer({
            name: 'narf'
        });
        var cfg = (0, index_1.config)({
            schema: g,
            auth: {
                providers: [narf],
                rules: function (rules) {
                    rules.private();
                }
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @auth(\n          providers: [\n            { type: authorizer, name: \"narf\" }\n          ]\n          rules: [\n            { allow: private }\n          ]\n        )\"\n    ");
    });
});
