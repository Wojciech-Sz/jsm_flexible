"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
var globals_1 = require("@jest/globals");
var utils_1 = require("../utils");
var g = index_1.graph.Standalone();
(0, globals_1.describe)('Interface generator', function () {
    (0, globals_1.beforeEach)(function () { return g.clear(); });
    (0, globals_1.it)('generates a simple interface', function () {
        var i = g.interface('Produce', {
            name: g.string(),
            quantity: g.int(),
            price: g.float(),
            nutrients: g.string().optional().list().optional()
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(i)).toMatchInlineSnapshot("\n      \"interface Produce {\n        name: String!\n        quantity: Int!\n        price: Float!\n        nutrients: [String]\n      }\"\n    ");
    });
    (0, globals_1.it)('prevents using of whitespaced identifier as the name', function () {
        (0, globals_1.expect)(function () { return g.interface('white space', { name: g.string() }); }).toThrow('Given name "white space" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('prevents using of number-prefixed identifier as the name', function () {
        (0, globals_1.expect)(function () { return g.interface('0User', { name: g.string() }); }).toThrow('Given name "0User" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('prevents using of weird characters identifier as the name', function () {
        (0, globals_1.expect)(function () { return g.interface('!@#$%^&*()+|~`=-', { name: g.string() }); }).toThrow('Given name "!@#$%^&*()+|~`=-" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('generates a type implementing an interface', function () {
        var produce = g.interface('Produce', {
            name: g.string(),
            quantity: g.int(),
            price: g.float(),
            nutrients: g.string().optional().list().optional()
        });
        g.type('Fruit', {
            isSeedless: g.boolean().optional(),
            ripenessIndicators: g.string().optional().list().optional()
        }).implements(produce);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"interface Produce {\n        name: String!\n        quantity: Int!\n        price: Float!\n        nutrients: [String]\n      }\n\n      type Fruit implements Produce {\n        name: String!\n        quantity: Int!\n        price: Float!\n        nutrients: [String]\n        isSeedless: Boolean\n        ripenessIndicators: [String]\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a type implementing multiple interfaces', function () {
        var produce = g.interface('Produce', {
            name: g.string()
        });
        var sweets = g.interface('Sweets', {
            name: g.string(),
            sweetness: g.int()
        });
        g.type('Fruit', {
            isSeedless: g.boolean().optional(),
            ripenessIndicators: g.string().optional().list().optional()
        })
            .implements(produce)
            .implements(sweets);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"interface Produce {\n        name: String!\n      }\n\n      interface Sweets {\n        name: String!\n        sweetness: Int!\n      }\n\n      type Fruit implements Produce & Sweets {\n        name: String!\n        sweetness: Int!\n        isSeedless: Boolean\n        ripenessIndicators: [String]\n      }\"\n    ");
    });
});
