"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
var globals_1 = require("@jest/globals");
var utils_1 = require("../utils");
var g = index_1.graph.Standalone();
(0, globals_1.describe)('OpenAPI generator', function () {
    (0, globals_1.beforeEach)(function () { return g.clear(); });
    (0, globals_1.it)('generates the minimum possible OpenAPI datasource', function () {
        var stripe = index_1.connector.OpenAPI('Stripe', {
            schema: 'https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json'
        });
        g.datasource(stripe);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @openapi(\n          name: \"Stripe\"\n          namespace: true\n          schema: \"https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json\"\n        )\"\n    ");
    });
    (0, globals_1.it)('generates the minimum possible OpenAPI datasource, namespace false', function () {
        var stripe = index_1.connector.OpenAPI('Stripe', {
            schema: 'https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json'
        });
        g.datasource(stripe, { namespace: false });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @openapi(\n          name: \"Stripe\"\n          namespace: false\n          schema: \"https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json\"\n        )\"\n    ");
    });
    (0, globals_1.it)('generates the maximum possible OpenAPI datasource', function () {
        var stripe = index_1.connector.OpenAPI('Stripe', {
            schema: 'https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json',
            url: 'https://api.stripe.com',
            transforms: function (schema) {
                schema.queryNaming('OPERATION_ID');
                schema.exclude('Foo.Bar', 'Bar.Foo');
                schema.exclude('Foo.*.bar');
                schema.prefixTypes('AFancyPrefix');
            },
            headers: function (headers) {
                headers.static('Authorization', 'Bearer {{ env.STRIPE_API_KEY }}');
                headers.static('Method', 'POST');
                headers.introspection('foo', 'bar');
                headers.set('X-Features', 'Foo,Bar');
                headers.set('Foo', { forward: 'Bar' });
            }
        });
        g.datasource(stripe);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n\"extend schema\n  @openapi(\n    name: \"Stripe\"\n    namespace: true\n    url: \"https://api.stripe.com\"\n    schema: \"https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json\"\n    transforms: {\n      exclude: [\n        \"Foo.Bar\"\n        \"Bar.Foo\"\n        \"Foo.*.bar\"\n      ]\n      typePrefix: \"AFancyPrefix\"\n      queryNaming: OPERATION_ID\n    }\n    headers: [\n      { name: \"Authorization\", value: \"Bearer {{ env.STRIPE_API_KEY }}\" }\n      { name: \"Method\", value: \"POST\" }\n      { name: \"X-Features\", value: \"Foo,Bar\" }\n      { name: \"Foo\", forward: \"Bar\" }\n    ]\n    introspectionHeaders: [\n      { name: \"foo\", value: \"bar\" }\n    ]\n  )\"\n");
    });
    (0, globals_1.it)('combines multiple apis into one extension', function () {
        var stripe = index_1.connector.OpenAPI('Stripe', {
            schema: 'https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json'
        });
        var openai = index_1.connector.OpenAPI('OpenAI', {
            schema: 'https://raw.githubusercontent.com/openai/openai-openapi/master/openapi.yaml'
        });
        g.datasource(stripe);
        g.datasource(openai);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @openapi(\n          name: \"Stripe\"\n          namespace: true\n          schema: \"https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json\"\n        )\n        @openapi(\n          name: \"OpenAI\"\n          namespace: true\n          schema: \"https://raw.githubusercontent.com/openai/openai-openapi/master/openapi.yaml\"\n        )\"\n    ");
    });
});
