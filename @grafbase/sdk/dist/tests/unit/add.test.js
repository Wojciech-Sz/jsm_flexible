"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
var globals_1 = require("@jest/globals");
var utils_1 = require("../utils");
var g = index_1.graph.Standalone();
(0, globals_1.describe)('Add, define, scalar', function () {
    (0, globals_1.beforeEach)(function () { return g.clear(); });
    (0, globals_1.it)('correctly produces a schema built using scalar, define and add', function () {
        var produce = index_1.define.interface('Produce', {
            name: index_1.scalar.string()
        });
        var sweets = index_1.define.interface('Sweets', {
            name: index_1.scalar.string(),
            sweetness: index_1.scalar.int()
        });
        var fruit = index_1.define
            .type('Fruit', {
            isSeedless: index_1.scalar.boolean().optional(),
            ripenessIndicators: index_1.scalar.string().optional().list().optional()
        })
            .implements(produce)
            .implements(sweets);
        g.add(produce, sweets, fruit);
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ graph: g }))).toMatchInlineSnapshot("\n      \"interface Produce {\n        name: String!\n      }\n\n      interface Sweets {\n        name: String!\n        sweetness: Int!\n      }\n\n      type Fruit implements Produce & Sweets {\n        name: String!\n        sweetness: Int!\n        isSeedless: Boolean\n        ripenessIndicators: [String]\n      }\"\n    ");
    });
});
