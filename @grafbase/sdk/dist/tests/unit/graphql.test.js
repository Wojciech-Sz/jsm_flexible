"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
var globals_1 = require("@jest/globals");
var utils_1 = require("../utils");
var g = index_1.graph.Standalone();
(0, globals_1.describe)('GraphQL connector', function () {
    (0, globals_1.beforeEach)(function () { return g.clear(); });
    (0, globals_1.it)('generates the minimum possible GraphQL datasource', function () {
        var contentful = index_1.connector.GraphQL('Contentful', {
            url: 'https://graphql.contentful.com/content/v1/spaces/{{ env.CONTENTFUL_SPACE_ID }}/environments/{{ env.CONTENTFUL_ENVIRONMENT }}'
        });
        g.datasource(contentful);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @graphql(\n          name: \"Contentful\"\n          namespace: true\n          url: \"https://graphql.contentful.com/content/v1/spaces/{{ env.CONTENTFUL_SPACE_ID }}/environments/{{ env.CONTENTFUL_ENVIRONMENT }}\"\n        )\"\n    ");
    });
    (0, globals_1.it)('generates the minimum possible GraphQL datasource, namespace false', function () {
        var contentful = index_1.connector.GraphQL('Contentful', {
            url: 'https://graphql.contentful.com/content/v1/spaces/{{ env.CONTENTFUL_SPACE_ID }}/environments/{{ env.CONTENTFUL_ENVIRONMENT }}'
        });
        g.datasource(contentful, { namespace: false });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @graphql(\n          name: \"Contentful\"\n          namespace: false\n          url: \"https://graphql.contentful.com/content/v1/spaces/{{ env.CONTENTFUL_SPACE_ID }}/environments/{{ env.CONTENTFUL_ENVIRONMENT }}\"\n        )\"\n    ");
    });
    (0, globals_1.it)('generates the maximum possible GraphQL datasource', function () {
        var contentful = index_1.connector.GraphQL('Contentful', {
            url: 'https://graphql.contentful.com/content/v1/spaces/{{ env.CONTENTFUL_SPACE_ID }}/environments/{{ env.CONTENTFUL_ENVIRONMENT }}',
            headers: function (headers) {
                headers.static('Authorization', 'Bearer {{ env.STRIPE_API_KEY }}');
                headers.static('Method', 'POST');
                headers.introspection('Foo', 'BAR');
                headers.set('X-Features', 'Foo,Bar');
                headers.set('Foo', { forward: 'Bar' });
            },
            transforms: function (schema) {
                schema.exclude('Foo.Bar', 'Bar.Foo');
                schema.exclude('Foo.*.bar');
                schema.prefixTypes('AFancyPrefix');
            }
        });
        g.datasource(contentful, { namespace: true });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n\"extend schema\n  @graphql(\n    name: \"Contentful\"\n    namespace: true\n    url: \"https://graphql.contentful.com/content/v1/spaces/{{ env.CONTENTFUL_SPACE_ID }}/environments/{{ env.CONTENTFUL_ENVIRONMENT }}\"\n    headers: [\n      { name: \"Authorization\", value: \"Bearer {{ env.STRIPE_API_KEY }}\" }\n      { name: \"Method\", value: \"POST\" }\n      { name: \"X-Features\", value: \"Foo,Bar\" }\n      { name: \"Foo\", forward: \"Bar\" }\n    ]\n    introspectionHeaders: [\n      { name: \"Foo\", value: \"BAR\" }\n    ]\n    transforms: {\n      exclude: [\n        \"Foo.Bar\"\n        \"Bar.Foo\"\n        \"Foo.*.bar\"\n      ]\n      typePrefix: \"AFancyPrefix\"\n    }\n  )\"\n");
    });
    (0, globals_1.it)('combines multiple apis into one extension', function () {
        var contentful = index_1.connector.GraphQL('Contentful', {
            url: 'https://graphql.contentful.com/content/v1/spaces/{{ env.CONTENTFUL_SPACE_ID }}/environments/{{ env.CONTENTFUL_ENVIRONMENT }}'
        });
        var github = index_1.connector.GraphQL('GitHug', {
            url: 'https://api.github.com/graphql'
        });
        g.datasource(contentful);
        g.datasource(github);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @graphql(\n          name: \"Contentful\"\n          namespace: true\n          url: \"https://graphql.contentful.com/content/v1/spaces/{{ env.CONTENTFUL_SPACE_ID }}/environments/{{ env.CONTENTFUL_ENVIRONMENT }}\"\n        )\n        @graphql(\n          name: \"GitHug\"\n          namespace: true\n          url: \"https://api.github.com/graphql\"\n        )\"\n    ");
    });
});
