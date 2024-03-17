"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
var globals_1 = require("@jest/globals");
var utils_1 = require("../utils");
var g = index_1.graph.Standalone();
(0, globals_1.describe)('MongoDB generator', function () {
    var mongoParams = {
        url: 'https://data.mongodb-api.com/app/data-test/endpoint/data/v1',
        apiKey: 'SOME_KEY',
        dataSource: 'data',
        database: 'tables'
    };
    (0, globals_1.beforeEach)(function () { return g.clear(); });
    (0, globals_1.it)('generates the minimum possible MongoDB datasource', function () {
        var mongo = index_1.connector.MongoDB('Test', mongoParams);
        g.datasource(mongo);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @mongodb(\n          namespace: true\n          name: \"Test\"\n          url: \"https://data.mongodb-api.com/app/data-test/endpoint/data/v1\"\n          apiKey: \"SOME_KEY\"\n          dataSource: \"data\"\n          database: \"tables\"\n        )\"\n    ");
    });
    (0, globals_1.it)('generates the minimum possible MongoDB datasource, namespace: false', function () {
        var mongo = index_1.connector.MongoDB('Test', mongoParams);
        g.datasource(mongo, { namespace: false });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @mongodb(\n          namespace: false\n          name: \"Test\"\n          url: \"https://data.mongodb-api.com/app/data-test/endpoint/data/v1\"\n          apiKey: \"SOME_KEY\"\n          dataSource: \"data\"\n          database: \"tables\"\n        )\"\n    ");
    });
    (0, globals_1.it)('generates a simple model', function () {
        var mongo = index_1.connector.MongoDB('Test', mongoParams);
        g.datasource(mongo);
        mongo
            .model('User', {
            id: g.id().unique().mapped('_id'),
            field: g.string()
        })
            .collection('users');
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @mongodb(\n          namespace: true\n          name: \"Test\"\n          url: \"https://data.mongodb-api.com/app/data-test/endpoint/data/v1\"\n          apiKey: \"SOME_KEY\"\n          dataSource: \"data\"\n          database: \"tables\"\n        )\n\n      type User @model(connector: \"Test\", collection: \"users\") {\n        id: ID! @unique @map(name: \"_id\")\n        field: String!\n      }\"\n    ");
    });
    (0, globals_1.it)('expects a valid identifier as a name', function () {
        (0, globals_1.expect)(function () { return index_1.connector.MongoDB('Nest Test', mongoParams); }).toThrow('Given name "Nest Test" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('generates a simple model with a nested type', function () {
        var mongo = index_1.connector.MongoDB('Test', mongoParams);
        g.datasource(mongo);
        var address = g.type('Address', {
            street: g.string().mapped('street_name')
        });
        mongo
            .model('User', {
            address: g.ref(address)
        })
            .collection('users');
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @mongodb(\n          namespace: true\n          name: \"Test\"\n          url: \"https://data.mongodb-api.com/app/data-test/endpoint/data/v1\"\n          apiKey: \"SOME_KEY\"\n          dataSource: \"data\"\n          database: \"tables\"\n        )\n\n      type Address {\n        street: String! @map(name: \"street_name\")\n      }\n\n      type User @model(connector: \"Test\", collection: \"users\") {\n        address: Address!\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a simple model with no specified collection', function () {
        var mongo = index_1.connector.MongoDB('Test', mongoParams);
        mongo.model('User', {
            id: g.id().unique().mapped('_id'),
            field: g.string()
        });
        g.datasource(mongo);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @mongodb(\n          namespace: true\n          name: \"Test\"\n          url: \"https://data.mongodb-api.com/app/data-test/endpoint/data/v1\"\n          apiKey: \"SOME_KEY\"\n          dataSource: \"data\"\n          database: \"tables\"\n        )\n\n      type User @model(connector: \"Test\", collection: \"User\") {\n        id: ID! @unique @map(name: \"_id\")\n        field: String!\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a decimal field', function () {
        var mongo = index_1.connector.MongoDB('Test', mongoParams);
        mongo
            .model('User', {
            id: g.id().unique().mapped('_id'),
            field: g.decimal()
        })
            .collection('users');
        g.datasource(mongo);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @mongodb(\n          namespace: true\n          name: \"Test\"\n          url: \"https://data.mongodb-api.com/app/data-test/endpoint/data/v1\"\n          apiKey: \"SOME_KEY\"\n          dataSource: \"data\"\n          database: \"tables\"\n        )\n\n      type User @model(connector: \"Test\", collection: \"users\") {\n        id: ID! @unique @map(name: \"_id\")\n        field: Decimal!\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a bytes field', function () {
        var mongo = index_1.connector.MongoDB('Test', mongoParams);
        mongo
            .model('User', {
            id: g.id().unique().mapped('_id'),
            field: g.bytes()
        })
            .collection('users');
        g.datasource(mongo);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @mongodb(\n          namespace: true\n          name: \"Test\"\n          url: \"https://data.mongodb-api.com/app/data-test/endpoint/data/v1\"\n          apiKey: \"SOME_KEY\"\n          dataSource: \"data\"\n          database: \"tables\"\n        )\n\n      type User @model(connector: \"Test\", collection: \"users\") {\n        id: ID! @unique @map(name: \"_id\")\n        field: Bytes!\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a bigint field', function () {
        var mongo = index_1.connector.MongoDB('Test', mongoParams);
        mongo
            .model('User', {
            id: g.id().unique().mapped('_id'),
            field: g.bigint()
        })
            .collection('users');
        g.datasource(mongo);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @mongodb(\n          namespace: true\n          name: \"Test\"\n          url: \"https://data.mongodb-api.com/app/data-test/endpoint/data/v1\"\n          apiKey: \"SOME_KEY\"\n          dataSource: \"data\"\n          database: \"tables\"\n        )\n\n      type User @model(connector: \"Test\", collection: \"users\") {\n        id: ID! @unique @map(name: \"_id\")\n        field: BigInt!\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a model with auth', function () {
        var mongo = index_1.connector.MongoDB('Test', mongoParams);
        mongo
            .model('User', {
            id: g.id().unique().mapped('_id'),
            field: g.string()
        })
            .collection('users')
            .auth(function (rules) {
            rules.private();
        });
        g.datasource(mongo);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @mongodb(\n          namespace: true\n          name: \"Test\"\n          url: \"https://data.mongodb-api.com/app/data-test/endpoint/data/v1\"\n          apiKey: \"SOME_KEY\"\n          dataSource: \"data\"\n          database: \"tables\"\n        )\n\n      type User @model(connector: \"Test\", collection: \"users\") @auth(\n          rules: [\n            { allow: private }\n          ]) {\n        id: ID! @unique @map(name: \"_id\")\n        field: String!\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a model with cache', function () {
        var mongo = index_1.connector.MongoDB('Test', mongoParams);
        mongo
            .model('User', {
            id: g.id().unique().mapped('_id'),
            field: g.string()
        })
            .collection('users')
            .cache({ maxAge: 30 });
        g.datasource(mongo);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @mongodb(\n          namespace: true\n          name: \"Test\"\n          url: \"https://data.mongodb-api.com/app/data-test/endpoint/data/v1\"\n          apiKey: \"SOME_KEY\"\n          dataSource: \"data\"\n          database: \"tables\"\n        )\n\n      type User @model(connector: \"Test\", collection: \"users\") @cache(maxAge: 30) {\n        id: ID! @unique @map(name: \"_id\")\n        field: String!\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a two datasources with separate models', function () {
        var test = index_1.connector.MongoDB('Test', mongoParams);
        var another = index_1.connector.MongoDB('Another', {
            url: 'https://data.mongodb-api.com/app/data-jest/endpoint/data/v1',
            apiKey: 'OTHER_KEY',
            dataSource: 'bar',
            database: 'something'
        });
        test
            .model('User', {
            id: g.id().unique().mapped('_id')
        })
            .collection('users');
        another
            .model('Post', {
            id: g.id().unique().mapped('_id')
        })
            .collection('posts');
        g.datasource(test);
        g.datasource(another);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend schema\n        @mongodb(\n          namespace: true\n          name: \"Test\"\n          url: \"https://data.mongodb-api.com/app/data-test/endpoint/data/v1\"\n          apiKey: \"SOME_KEY\"\n          dataSource: \"data\"\n          database: \"tables\"\n        )\n        @mongodb(\n          namespace: true\n          name: \"Another\"\n          url: \"https://data.mongodb-api.com/app/data-jest/endpoint/data/v1\"\n          apiKey: \"OTHER_KEY\"\n          dataSource: \"bar\"\n          database: \"something\"\n        )\n\n      type User @model(connector: \"Test\", collection: \"users\") {\n        id: ID! @unique @map(name: \"_id\")\n      }\n\n      type Post @model(connector: \"Another\", collection: \"posts\") {\n        id: ID! @unique @map(name: \"_id\")\n      }\"\n    ");
    });
});
