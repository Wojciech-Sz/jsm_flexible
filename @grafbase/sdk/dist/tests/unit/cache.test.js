"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
var globals_1 = require("@jest/globals");
var utils_1 = require("../utils");
var g = index_1.graph.Standalone();
(0, globals_1.describe)('Cache generator', function () {
    (0, globals_1.beforeEach)(function () { return g.clear(); });
    (0, globals_1.it)('renders single type global cache', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cfg;
        return __generator(this, function (_a) {
            g.type('A', {
                b: g.int().optional()
            });
            cfg = (0, index_1.config)({
                schema: g,
                cache: {
                    rules: [
                        {
                            types: 'Query',
                            maxAge: 60
                        }
                    ]
                }
            });
            (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @cache(rules: [\n          {\n            types: \"Query\",\n            maxAge: 60\n          }\n        ])\n\n      type A {\n        b: Int\n      }\"\n    ");
            return [2 /*return*/];
        });
    }); });
    (0, globals_1.it)('renders type invalidation strategy', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cfg;
        return __generator(this, function (_a) {
            g.type('A', {
                b: g.int().optional()
            });
            cfg = (0, index_1.config)({
                schema: g,
                cache: {
                    rules: [
                        {
                            types: 'Query',
                            maxAge: 60,
                            mutationInvalidation: 'type'
                        }
                    ]
                }
            });
            (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @cache(rules: [\n          {\n            types: \"Query\",\n            maxAge: 60,\n            mutationInvalidation: type\n          }\n        ])\n\n      type A {\n        b: Int\n      }\"\n    ");
            return [2 /*return*/];
        });
    }); });
    (0, globals_1.it)('renders entity invalidation strategy', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cfg;
        return __generator(this, function (_a) {
            g.type('A', {
                b: g.int().optional()
            });
            cfg = (0, index_1.config)({
                schema: g,
                cache: {
                    rules: [
                        {
                            types: 'Query',
                            maxAge: 60,
                            mutationInvalidation: 'entity'
                        }
                    ]
                }
            });
            (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @cache(rules: [\n          {\n            types: \"Query\",\n            maxAge: 60,\n            mutationInvalidation: entity\n          }\n        ])\n\n      type A {\n        b: Int\n      }\"\n    ");
            return [2 /*return*/];
        });
    }); });
    (0, globals_1.it)('renders list invalidation strategy', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cfg;
        return __generator(this, function (_a) {
            g.type('A', {
                b: g.int().optional()
            });
            cfg = (0, index_1.config)({
                schema: g,
                cache: {
                    rules: [
                        {
                            types: 'Query',
                            maxAge: 60,
                            mutationInvalidation: 'list'
                        }
                    ]
                }
            });
            (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @cache(rules: [\n          {\n            types: \"Query\",\n            maxAge: 60,\n            mutationInvalidation: list\n          }\n        ])\n\n      type A {\n        b: Int\n      }\"\n    ");
            return [2 /*return*/];
        });
    }); });
    (0, globals_1.it)('renders custom field invalidation strategy', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cfg;
        return __generator(this, function (_a) {
            g.type('A', {
                b: g.int().optional()
            });
            cfg = (0, index_1.config)({
                schema: g,
                cache: {
                    rules: [
                        {
                            types: 'Query',
                            maxAge: 60,
                            mutationInvalidation: { field: 'name' }
                        }
                    ]
                }
            });
            (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @cache(rules: [\n          {\n            types: \"Query\",\n            maxAge: 60,\n            mutationInvalidation: { field: \"name\" }\n          }\n        ])\n\n      type A {\n        b: Int\n      }\"\n    ");
            return [2 /*return*/];
        });
    }); });
    (0, globals_1.it)('renders multi-type global cache', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cfg;
        return __generator(this, function (_a) {
            g.type('A', {
                b: g.int().optional()
            });
            cfg = (0, index_1.config)({
                schema: g,
                cache: {
                    rules: [
                        {
                            types: ['Query', 'Schwuery'],
                            maxAge: 60,
                            staleWhileRevalidate: 60
                        }
                    ]
                }
            });
            (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @cache(rules: [\n          {\n            types: [\"Query\", \"Schwuery\"],\n            maxAge: 60,\n            staleWhileRevalidate: 60\n          }\n        ])\n\n      type A {\n        b: Int\n      }\"\n    ");
            return [2 /*return*/];
        });
    }); });
    (0, globals_1.it)('renders complex multi-type global cache', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cfg;
        return __generator(this, function (_a) {
            g.type('A', {
                b: g.int().optional()
            });
            cfg = (0, index_1.config)({
                schema: g,
                cache: {
                    rules: [
                        {
                            types: [
                                { name: 'User' },
                                { name: 'Address', fields: ['street', 'city'] }
                            ],
                            maxAge: 60,
                            staleWhileRevalidate: 60
                        }
                    ]
                }
            });
            (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @cache(rules: [\n          {\n            types: [{\n              name: \"User\"\n            }, {\n              name: \"Address\",\n              fields: [\"street\",\"city\"]\n            }],\n            maxAge: 60,\n            staleWhileRevalidate: 60\n          }\n        ])\n\n      type A {\n        b: Int\n      }\"\n    ");
            return [2 /*return*/];
        });
    }); });
    (0, globals_1.it)('renders global cache rule with access scopes', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cfg;
        return __generator(this, function (_a) {
            g.type('A', {
                b: g.int().optional()
            });
            cfg = (0, index_1.config)({
                schema: g,
                cache: {
                    rules: [
                        {
                            types: [
                                { name: 'User' },
                                { name: 'Address', fields: ['street', 'city'] }
                            ],
                            maxAge: 60,
                            scopes: ['apikey', { claim: 'my_claim' }]
                        }
                    ]
                }
            });
            (0, globals_1.expect)((0, utils_1.renderGraphQL)(cfg)).toMatchInlineSnapshot("\n      \"extend schema\n        @cache(rules: [\n          {\n            types: [{\n              name: \"User\"\n            }, {\n              name: \"Address\",\n              fields: [\"street\",\"city\"]\n            }],\n            maxAge: 60,\n            scopes: [apikey, { claim: \"my_claim\" }]\n          }\n        ])\n\n      type A {\n        b: Int\n      }\"\n    ");
            return [2 /*return*/];
        });
    }); });
});
