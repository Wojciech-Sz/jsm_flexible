"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
var globals_1 = require("@jest/globals");
var g = index_1.graph.Standalone();
(0, globals_1.describe)('Env var accessor', function () {
    (0, globals_1.beforeEach)(function () { return g.clear(); });
    (0, globals_1.it)('returns the value of the variable if set', function () {
        process.env.TEST_VAL = 'test';
        (0, globals_1.expect)(g.env('TEST_VAL')).toBe('test');
        delete process.env.TEST_VAL;
    });
    (0, globals_1.it)('throws if the variable is not set', function () {
        (0, globals_1.expect)(function () { return g.env('TEST_VAL'); }).toThrow('Environment variable TEST_VAL is not set');
    });
    (0, globals_1.it)('adds the variable to the SDL', function () {
        process.env.GITHUB_TOKEN = 'test_token';
        var github = index_1.connector.GraphQL('GitHub', {
            url: 'https://api.github.com/graphql',
            headers: function (headers) {
                headers.static('Authorization', "Bearer ".concat(g.env('GITHUB_TOKEN')));
            }
        });
        g.datasource(github);
        (0, globals_1.expect)((0, index_1.config)({ schema: g }).toString()).toMatchInlineSnapshot("\n      \"extend schema\n        @graphql(\n          name: \"GitHub\"\n          namespace: true\n          url: \"https://api.github.com/graphql\"\n          headers: [\n            { name: \"Authorization\", value: \"Bearer test_token\" }\n          ]\n        )\"\n    ");
        delete process.env.GITHUB_TOKEN;
    });
});
