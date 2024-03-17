"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
var globals_1 = require("@jest/globals");
var utils_1 = require("../utils");
var g = index_1.graph.Standalone();
(0, globals_1.describe)('Query generator', function () {
    (0, globals_1.beforeEach)(function () { return g.clear(); });
    (0, globals_1.it)('generates a resolver with empty args', function () {
        g.query('greet', {
            returns: g.string(),
            resolver: 'hello'
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend type Query {\n        greet: String! @resolver(name: \"hello\")\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a resolver with required input and output', function () {
        g.query('greet', {
            args: { name: g.string() },
            returns: g.string(),
            resolver: 'hello'
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend type Query {\n        greet(name: String!): String! @resolver(name: \"hello\")\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a resolver with optional input', function () {
        g.query('greet', {
            args: { name: g.string().optional() },
            returns: g.string(),
            resolver: 'hello'
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend type Query {\n        greet(name: String): String! @resolver(name: \"hello\")\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a resolver with input default value', function () {
        g.query('greet', {
            args: { name: g.string().default('Bob') },
            returns: g.string(),
            resolver: 'hello'
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend type Query {\n        greet(name: String! = \"Bob\"): String! @resolver(name: \"hello\")\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a resolver with optional input and output', function () {
        g.query('greet', {
            args: { name: g.string().optional() },
            returns: g.string().optional(),
            resolver: 'hello'
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend type Query {\n        greet(name: String): String @resolver(name: \"hello\")\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a resolver with list input', function () {
        g.query('greet', {
            args: { name: g.string().list() },
            returns: g.string(),
            resolver: 'hello'
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend type Query {\n        greet(name: [String!]!): String! @resolver(name: \"hello\")\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a resolver with list output', function () {
        g.query('greet', {
            args: { name: g.string() },
            returns: g.string().list(),
            resolver: 'hello'
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend type Query {\n        greet(name: String!): [String!]! @resolver(name: \"hello\")\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a resolver with list output', function () {
        g.query('greet', {
            args: { name: g.string() },
            returns: g.string().list(),
            resolver: 'hello'
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend type Query {\n        greet(name: String!): [String!]! @resolver(name: \"hello\")\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a mutation resolver with required input and output', function () {
        var input = g.input('CheckoutSessionInput', { name: g.string() });
        var output = g.type('CheckoutSessionOutput', { successful: g.boolean() });
        g.mutation('checkout', {
            args: { input: g.inputRef(input) },
            returns: g.ref(output),
            resolver: 'checkout'
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"input CheckoutSessionInput {\n        name: String!\n      }\n\n      type CheckoutSessionOutput {\n        successful: Boolean!\n      }\n\n      extend type Mutation {\n        checkout(input: CheckoutSessionInput!): CheckoutSessionOutput! @resolver(name: \"checkout\")\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a mutation resolver with enum input and output', function () {
        var output = g.type('CheckoutSessionOutput', { successful: g.boolean() });
        var enm = g.enum('Foo', ['A', 'B']);
        g.mutation('checkout', {
            args: { input: g.enumRef(enm) },
            returns: g.ref(output),
            resolver: 'checkout'
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"enum Foo {\n        A,\n        B\n      }\n\n      type CheckoutSessionOutput {\n        successful: Boolean!\n      }\n\n      extend type Mutation {\n        checkout(input: Foo!): CheckoutSessionOutput! @resolver(name: \"checkout\")\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a query resolver with enum input and output', function () {
        var output = g.type('CheckoutSessionOutput', { successful: g.boolean() });
        var enm = g.enum('Foo', ['A', 'B']);
        g.query('checkout', {
            args: { input: g.enumRef(enm) },
            returns: g.ref(output),
            resolver: 'checkout'
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"enum Foo {\n        A,\n        B\n      }\n\n      type CheckoutSessionOutput {\n        successful: Boolean!\n      }\n\n      extend type Query {\n        checkout(input: Foo!): CheckoutSessionOutput! @resolver(name: \"checkout\")\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a query as part of the full SDL', function () {
        var enm = g.enum('Foo', ['Bar', 'Baz']);
        g.query('greet', {
            args: { name: g.string() },
            returns: g.string().list(),
            resolver: 'hello'
        });
        g.query('sweet', {
            args: { game: g.int().optional() },
            returns: g.enumRef(enm).list(),
            resolver: 'jello'
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"enum Foo {\n        Bar,\n        Baz\n      }\n\n      extend type Query {\n        greet(name: String!): [String!]! @resolver(name: \"hello\")\n        sweet(game: Int): [Foo!]! @resolver(name: \"jello\")\n      }\"\n    ");
    });
    (0, globals_1.it)('prevents using of whitespaced identifier as the name', function () {
        (0, globals_1.expect)(function () {
            return g.query('white space', {
                args: { name: g.string() },
                returns: g.string(),
                resolver: 'hello'
            });
        }).toThrow('Given name "white space" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('prevents using of number-prefixed identifier as the name', function () {
        (0, globals_1.expect)(function () {
            return g.query('0User', {
                args: { name: g.string() },
                returns: g.string(),
                resolver: 'hello'
            });
        }).toThrow('Given name "0User" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('prevents using of weird characters identifier as the name', function () {
        (0, globals_1.expect)(function () {
            return g.query('!@#$%^&*()+|~`=-', {
                args: { name: g.string() },
                returns: g.string(),
                resolver: 'hello'
            });
        }).toThrow('Given name "!@#$%^&*()+|~`=-" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('prevents using of whitespaced identifier an argument name', function () {
        (0, globals_1.expect)(function () {
            return g.query('Test', {
                args: { 'white space': g.string() },
                returns: g.string(),
                resolver: 'hello'
            });
        }).toThrow('Given name "white space" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('prevents using of number-prefixed identifier as an argument name', function () {
        (0, globals_1.expect)(function () {
            return g.query('Test', {
                args: { '0name': g.string() },
                returns: g.string(),
                resolver: 'hello'
            });
        }).toThrow('Given name "0name" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('prevents using of weird characters identifier as an argument name', function () {
        (0, globals_1.expect)(function () {
            return g.query('Test', {
                args: { '!@#$%^&*()+|~`=-': g.string() },
                returns: g.string(),
                resolver: 'hello'
            });
        }).toThrow('Given name "!@#$%^&*()+|~`=-" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('generates a basic input type', function () {
        g.input('Point2D', {
            x: g.float(),
            y: g.float()
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"input Point2D {\n        x: Float!\n        y: Float!\n      }\"\n    ");
    });
    (0, globals_1.it)('generates an input type with an enum field', function () {
        var color = g.enum('Color', ['Red', 'Green', 'Blue']);
        g.input('Data', {
            color: g.enumRef(color).optional()
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"enum Color {\n        Red,\n        Green,\n        Blue\n      }\n\n      input Data {\n        color: Color\n      }\"\n    ");
    });
    (0, globals_1.it)('generates an input type with a list field', function () {
        g.input('Data', {
            color: g.int().list()
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"input Data {\n        color: [Int!]!\n      }\"\n    ");
    });
    (0, globals_1.it)('generates an input type with a nested input field', function () {
        var nested = g.input('Nested', {
            x: g.boolean()
        });
        g.input('Data', {
            color: g.inputRef(nested)
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"input Nested {\n        x: Boolean!\n      }\n\n      input Data {\n        color: Nested!\n      }\"\n    ");
    });
    (0, globals_1.it)('generates an input type with a nested list input field', function () {
        var nested = g.input('Nested', {
            x: g.boolean()
        });
        g.input('Data', {
            color: g.inputRef(nested).list()
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"input Nested {\n        x: Boolean!\n      }\n\n      input Data {\n        color: [Nested!]!\n      }\"\n    ");
    });
});
