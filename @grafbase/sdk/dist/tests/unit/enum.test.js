"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
var globals_1 = require("@jest/globals");
var utils_1 = require("../utils");
var g = index_1.graph.Standalone();
(0, globals_1.describe)('Enum generator', function () {
    (0, globals_1.beforeEach)(function () {
        g.clear();
    });
    (0, globals_1.it)('generates an enum from an array of strings', function () {
        var e = g.enum('Fruits', ['Apples', 'Oranges']);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(e)).toMatchInlineSnapshot("\n      \"enum Fruits {\n        Apples,\n        Oranges\n      }\"\n    ");
    });
    (0, globals_1.it)('generates an enum field', function () {
        var e = g.enum('Fruits', ['Apples', 'Oranges']);
        g.type('Basket', {
            fruitType: g.enumRef(e)
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"enum Fruits {\n        Apples,\n        Oranges\n      }\n\n      type Basket {\n        fruitType: Fruits!\n      }\"\n    ");
    });
    (0, globals_1.it)('prevents using of whitespaced identifier as the name', function () {
        (0, globals_1.expect)(function () { return g.enum('white space', ['Foo', 'Bar']); }).toThrow('Given name "white space" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('prevents using of number-prefixed identifier as the name', function () {
        (0, globals_1.expect)(function () { return g.enum('0User', ['Foo', 'Bar']); }).toThrow('Given name "0User" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('prevents using of weird characters identifier as the name', function () {
        (0, globals_1.expect)(function () { return g.enum('!@#$%^&*()+|~`=-', ['Foo', 'Bar']); }).toThrow('Given name "!@#$%^&*()+|~`=-" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('prevents using of whitespaced identifier as a variant name', function () {
        (0, globals_1.expect)(function () { return g.enum('A', ['white space']); }).toThrow('Given name "white space" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('prevents using of number-prefixed identifier as a variant name', function () {
        (0, globals_1.expect)(function () { return g.enum('A', ['0User']); }).toThrow('Given name "0User" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('prevents using of weird characters identifier as a variant name', function () {
        (0, globals_1.expect)(function () { return g.enum('A', ['!@#$%^&*()+|~`=-']); }).toThrow('Given name "!@#$%^&*()+|~`=-" is not a valid TypeScript identifier.');
    });
});
