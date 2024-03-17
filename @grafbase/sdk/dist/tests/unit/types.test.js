"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
var globals_1 = require("@jest/globals");
var utils_1 = require("../utils");
var g = index_1.graph.Standalone();
(0, globals_1.describe)('Type generator', function () {
    (0, globals_1.beforeEach)(function () {
        g.clear();
    });
    (0, globals_1.it)('generates one with a single field', function () {
        var t = g.type('User', {
            name: g.string()
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(t)).toMatchInlineSnapshot("\n      \"type User {\n        name: String!\n      }\"\n    ");
    });
    (0, globals_1.it)('generates one with many fields', function () {
        var t = g.type('User', {
            name: g.string(),
            age: g.int().optional()
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(t)).toMatchInlineSnapshot("\n      \"type User {\n        name: String!\n        age: Int\n      }\"\n    ");
    });
    (0, globals_1.it)('generates one with cache', function () {
        var t = g
            .type('User', {
            name: g.string().cache({ maxAge: 10, staleWhileRevalidate: 20 })
        })
            .cache({ maxAge: 10, staleWhileRevalidate: 20 });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(t)).toMatchInlineSnapshot("\n      \"type User @cache(maxAge: 10, staleWhileRevalidate: 20) {\n        name: String! @cache(maxAge: 10, staleWhileRevalidate: 20)\n      }\"\n    ");
    });
    (0, globals_1.it)('generates one with cache using type mutation invalidation', function () {
        var t = g
            .type('User', {
            name: g.string()
        })
            .cache({ maxAge: 10, mutationInvalidation: 'type' });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(t)).toMatchInlineSnapshot("\n      \"type User @cache(maxAge: 10, mutationInvalidation: type) {\n        name: String!\n      }\"\n    ");
    });
    (0, globals_1.it)('generates one with cache using entity mutation invalidation', function () {
        var t = g
            .type('User', {
            name: g.string()
        })
            .cache({ maxAge: 10, mutationInvalidation: 'entity' });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(t)).toMatchInlineSnapshot("\n      \"type User @cache(maxAge: 10, mutationInvalidation: entity) {\n        name: String!\n      }\"\n    ");
    });
    (0, globals_1.it)('generates one with cache using list mutation invalidation', function () {
        var t = g
            .type('User', {
            name: g.string()
        })
            .cache({ maxAge: 10, mutationInvalidation: 'list' });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(t)).toMatchInlineSnapshot("\n      \"type User @cache(maxAge: 10, mutationInvalidation: list) {\n        name: String!\n      }\"\n    ");
    });
    (0, globals_1.it)('generates one with cache using custom field mutation invalidation', function () {
        var t = g
            .type('User', {
            name: g.string()
        })
            .cache({ maxAge: 10, mutationInvalidation: { field: 'name' } });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(t)).toMatchInlineSnapshot("\n      \"type User @cache(maxAge: 10, mutationInvalidation: { field: \"name\" }) {\n        name: String!\n      }\"\n    ");
    });
    (0, globals_1.it)('generates one with cache using access scopes', function () {
        var t = g
            .type('User', {
            name: g.string().cache({
                maxAge: 10,
                staleWhileRevalidate: 20,
                scopes: ['apikey', { header: 'test' }, 'public']
            })
        })
            .cache({
            maxAge: 10,
            staleWhileRevalidate: 20,
            scopes: [{ claim: 'test' }]
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)(t)).toMatchInlineSnapshot("\n      \"type User @cache(maxAge: 10, staleWhileRevalidate: 20, scopes: [{ claim: \"test\" }]) {\n        name: String! @cache(maxAge: 10, staleWhileRevalidate: 20, scopes: [apikey, { header: \"test\" }, public])\n      }\"\n    ");
    });
    (0, globals_1.it)('generates a union of multiple types', function () {
        var user = g.type('User', {
            name: g.string(),
            age: g.int().optional()
        });
        var address = g.type('Address', {
            street: g.string().optional()
        });
        g.union('UserOrAddress', { user: user, address: address });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"type User {\n        name: String!\n        age: Int\n      }\n\n      type Address {\n        street: String\n      }\n\n      union UserOrAddress = User | Address\"\n    ");
    });
    (0, globals_1.it)('prevents using of whitespaced identifier as a union name', function () {
        var user = g.type('User', {
            name: g.string(),
            age: g.int().optional()
        });
        var address = g.type('Address', {
            street: g.string().optional()
        });
        (0, globals_1.expect)(function () { return g.union('white space', { user: user, address: address }); }).toThrow('Given name "white space" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('prevents using of number-prefixed identifier as a union name', function () {
        var user = g.type('User', {
            name: g.string(),
            age: g.int().optional()
        });
        var address = g.type('Address', {
            street: g.string().optional()
        });
        (0, globals_1.expect)(function () { return g.union('0User', { user: user, address: address }); }).toThrow('Given name "0User" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('prevents using of weird characters identifier as a union name', function () {
        var user = g.type('User', {
            name: g.string(),
            age: g.int().optional()
        });
        var address = g.type('Address', {
            street: g.string().optional()
        });
        (0, globals_1.expect)(function () { return g.union('!@#$%^&*()+|~`=-', { user: user, address: address }); }).toThrow('Given name "!@#$%^&*()+|~`=-" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('references another type', function () {
        g.type('User', {
            name: g.string(),
            age: g.int().optional()
        });
        var city = g.type('City', {
            country: g.string()
        });
        g.type('Address', {
            street: g.string().optional(),
            city: g.ref(city)
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"type User {\n        name: String!\n        age: Int\n      }\n\n      type City {\n        country: String!\n      }\n\n      type Address {\n        street: String\n        city: City!\n      }\"\n    ");
    });
    (0, globals_1.it)('references another an enum', function () {
        g.type('User', {
            name: g.string(),
            age: g.int().optional()
        });
        var enm = g.enum('Color', ['Red', 'Green']);
        g.type('Address', {
            street: g.string().optional(),
            color: g.enumRef(enm).optional()
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"enum Color {\n        Red,\n        Green\n      }\n\n      type User {\n        name: String!\n        age: Int\n      }\n\n      type Address {\n        street: String\n        color: Color\n      }\"\n    ");
    });
    (0, globals_1.it)('prevents using of whitespaced identifier as the name', function () {
        (0, globals_1.expect)(function () { return g.type('white space', { name: g.string() }); }).toThrow('Given name "white space" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('prevents using of number-prefixed identifier as the name', function () {
        (0, globals_1.expect)(function () { return g.type('0User', { name: g.string() }); }).toThrow('Given name "0User" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('prevents using of weird characters identifier as the name', function () {
        (0, globals_1.expect)(function () { return g.type('!@#$%^&*()+|~`=-', { name: g.string() }); }).toThrow('Given name "!@#$%^&*()+|~`=-" is not a valid TypeScript identifier.');
    });
    (0, globals_1.it)('extends an internal type', function () {
        var t = g.type('User', {
            name: g.string()
        });
        g.extend(t, {
            myField: {
                args: { myArg: g.string() },
                returns: g.string(),
                resolver: 'file'
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"type User {\n        name: String!\n      }\n\n      extend type User {\n        myField(myArg: String!): String! @resolver(name: \"file\")\n      }\"\n    ");
    });
    (0, globals_1.it)('extends an external type', function () {
        g.extend('StripeCustomer', {
            myField: {
                args: { myArg: g.string() },
                returns: g.string(),
                resolver: 'file'
            }
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend type StripeCustomer {\n        myField(myArg: String!): String! @resolver(name: \"file\")\n      }\"\n    ");
    });
    (0, globals_1.it)('supports field resolvers', function () {
        g.type('User', {
            name: g.string().resolver('a-field')
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"type User {\n        name: String! @resolver(name: \"a-field\")\n      }\"\n    ");
    });
    (0, globals_1.it)('supports field resolvers with requires directive', function () {
        g.type('User', {
            id: g.id(),
            name: g.string().resolver('a-field').requires('id')
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"type User {\n        id: ID!\n        name: String! @resolver(name: \"a-field\") @requires(fields: \"id\")\n      }\"\n    ");
    });
    (0, globals_1.it)('supports federation keys', function () {
        g.type('User', {
            id: g.id()
        }).key('id');
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"type User @key(fields: \"id\" resolvable: true) {\n        id: ID!\n      }\"\n    ");
    });
    (0, globals_1.it)('supports unresolvable federation keys', function () {
        g.type('User', {
            id: g.id()
        }).key('id', { resolvable: false });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"type User @key(fields: \"id\" resolvable: false) {\n        id: ID!\n      }\"\n    ");
    });
    (0, globals_1.it)('supports federation keys with select', function () {
        g.type('User', {
            id: g.id()
        }).key('id', { select: 'foo(id: $id)' });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"type User @key(fields: \"id\" resolvable: true select: \"foo(id: $id)\") {\n        id: ID!\n      }\"\n    ");
    });
    (0, globals_1.it)("supports joins for all the field types", function () {
        g.type('User', {
            id: g.id().join('foo(id: $id)'),
            str: g.string().join('bar(id: $id)'),
            num: g.boolean().join('baz(id: $id)'),
            list: g.boolean().list().join('bing(id: $id)'),
            generatedType: g.ref('Whatever').join('bazinga(id: $id)')
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"type User {\n        id: ID! @join(select: \"foo(id: $id)\")\n        str: String! @join(select: \"bar(id: $id)\")\n        num: Boolean! @join(select: \"baz(id: $id)\")\n        list: [Boolean!]! @join(select: \"bing(id: $id)\")\n        generatedType: Whatever! @join(select: \"bazinga(id: $id)\")\n      }\"\n    ");
    });
    (0, globals_1.it)("supports the deprecated directive", function () {
        g.type('User', {
            id: g.id().deprecated(),
            num: g.int().deprecated('numbers are for losers')
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"type User {\n        id: ID! @deprecated\n        num: Int! @deprecated(reason: \"numbers are for losers\")\n      }\"\n    ");
    });
    (0, globals_1.it)("supports all the federation directives", function () {
        // There are so many combinations of these - this is not even close to exhaustive
        g.type('User', {
            id: g.id().tag('bloop').tag('bleep').inaccessible(),
            foo: g.int().inaccessible().resolver('a_resolver'),
            bar: g.string().shareable().tag('blah'),
            baz: g.string().override('Products'),
            bez: g.ref('Blah').provides('x y'),
            zip: g.int().optional().inaccessible(),
            zoop: g.int().optional().list().inaccessible(),
            zap: g.int().optional().list().shareable(),
            zoink: g.int().optional().list().tag('foo')
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"type User {\n        id: ID! @tag(name: \"bloop\") @tag(name: \"bleep\") @inaccessible\n        foo: Int! @inaccessible @resolver(name: \"a_resolver\")\n        bar: String! @shareable @tag(name: \"blah\")\n        baz: String! @override(from: \"Products\")\n        bez: Blah! @provides(fields: \"x y\")\n        zip: Int @inaccessible\n        zoop: [Int]! @inaccessible\n        zap: [Int]! @shareable\n        zoink: [Int]! @tag(name: foo)\n      }\"\n");
    });
    (0, globals_1.it)('can extend types with keys', function () {
        g.extend('StripeCustomer', function (extend) {
            extend.key('id', { resolvable: false });
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n\"extend type StripeCustomer\n  @key(fields: \"id\" resolvable: false)\"\n");
    });
    (0, globals_1.it)('can extend fields of types', function () {
        g.extend('StripeCustomer', function (extend) {
            extend.extendField('id').shareable().inaccessible();
            extend.extendField('other').provides('id blah').override('Product');
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend type StripeCustomer\n          @extendField(name: \"id\", shareable: true, inaccesible: true),\n          @extendField(name: \"other\", provides: {fields: \"id blah\"}, override: {from: \"Product\"})\"\n    ");
    });
    (0, globals_1.it)('can add fields to extended types', function () {
        g.extend('StripeCustomer', function (extend) {
            extend.addField('id', g.id().join('aField'));
            extend.addFields({
                foo: g.boolean()
            });
            extend.extendField('other').provides('id blah').override('Product');
        });
        (0, globals_1.expect)((0, utils_1.renderGraphQL)((0, index_1.config)({ schema: g }))).toMatchInlineSnapshot("\n      \"extend type StripeCustomer\n          @extendField(name: \"other\", provides: {fields: \"id blah\"}, override: {from: \"Product\"}) {\n        id: ID! @join(select: \"aField\")\n        foo: Boolean!\n      }\"\n    ");
    });
});
