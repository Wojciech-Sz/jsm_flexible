"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
var globals_1 = require("@jest/globals");
var utils_1 = require("../utils");
(0, globals_1.describe)('Federation config', function () {
    (0, globals_1.it)('renders a graph directive that extends the schema', function () {
        var cfg = (0, index_1.config)({
            graph: index_1.graph.Federated()
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"\n      extend schema\n        @graph(type: federated)\n      \"\n    ");
    });
    (0, globals_1.it)('supports subgraph and default headers', function () {
        var cfg = (0, index_1.config)({
            graph: index_1.graph.Federated({
                headers: function (headers) {
                    headers.set('Foo', 'Bar');
                    headers.set('Forward', { forward: 'Source' });
                    headers
                        .subgraph('Product')
                        .set('Authorization', { forward: 'Authorization' })
                        .set('Bloop', 'Bleep');
                    headers.subgraph('Review').set('Bloop', 'Bleep');
                    headers.subgraph('Product').set('AnotherOne', 'Meep');
                }
            })
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"\n      extend schema\n        @graph(type: federated)\n        @allSubgraphs(headers: [{ name: \"Foo\", value: \"Bar\" }, { name: \"Forward\", forward: \"Source\" }])\n        @subgraph(name: \"Product\", headers: [{ name: \"Authorization\", forward: \"Authorization\" }, { name: \"Bloop\", value: \"Bleep\" }, { name: \"AnotherOne\", value: \"Meep\" }]),\n        @subgraph(name: \"Review\", headers: [{ name: \"Bloop\", value: \"Bleep\" }])\n      \"\n    ");
    });
    (0, globals_1.it)('supports subscription settings', function () {
        var cfg = (0, index_1.config)({
            graph: index_1.graph.Federated({
                subscriptions: function (subscriptions) {
                    subscriptions
                        .subgraph('Product')
                        .transport(index_1.SubscriptionTransport.GraphQlOverWebsockets, {
                        url: 'http://example.com'
                    });
                }
            })
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"\n      extend schema\n        @graph(type: federated)\n        @subgraph(name: \"Product\", websocketUrl: \"http://example.com\")\n      \"\n    ");
    });
    (0, globals_1.it)('supports cache configuration', function () {
        var cfg = (0, index_1.config)({
            graph: index_1.graph.Federated({
                cache: {
                    rules: [
                        {
                            types: 'Query',
                            maxAge: 60
                        }
                    ]
                }
            })
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"\n      extend schema\n        @graph(type: federated)\n      extend schema\n        @cache(rules: [\n          {\n            types: \"Query\",\n            maxAge: 60\n          }\n        ])\n\n      \"\n    ");
    });
});
