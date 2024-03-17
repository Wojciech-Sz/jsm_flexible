"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
var globals_1 = require("@jest/globals");
var utils_1 = require("../utils");
var g = index_1.graph.Standalone();
(0, globals_1.describe)('OpenAPI generator', function () {
    (0, globals_1.beforeEach)(function () { return g.clear(); });
    (0, globals_1.it)('generates the minimum possible Postgres datasource', function () {
        var postgres = index_1.connector.Postgres('Postgres', {
            url: 'postgres://postgres:grafbase@localhost:5432/postgres'
        });
        g.datasource(postgres);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @postgres(\n          name: \"Postgres\"\n          url: \"postgres://postgres:grafbase@localhost:5432/postgres\"\n          namespace: true\n        )\"\n    ");
    });
    (0, globals_1.it)('generates a Postgres datasource with negative namespace', function () {
        var postgres = index_1.connector.Postgres('Postgres', {
            url: 'postgres://postgres:grafbase@localhost:5432/postgres'
        });
        g.datasource(postgres, { namespace: false });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @postgres(\n          name: \"Postgres\"\n          url: \"postgres://postgres:grafbase@localhost:5432/postgres\"\n          namespace: false\n        )\"\n    ");
    });
    (0, globals_1.it)('generates a Postgres datasource with positive namespace', function () {
        var postgres = index_1.connector.Postgres('Postgres', {
            url: 'postgres://postgres:grafbase@localhost:5432/postgres'
        });
        g.datasource(postgres, { namespace: true });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @postgres(\n          name: \"Postgres\"\n          url: \"postgres://postgres:grafbase@localhost:5432/postgres\"\n          namespace: true\n        )\"\n    ");
    });
});
