"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FederatedGraph = exports.Graph = exports.Datasources = void 0;
var type_1 = require("./type");
var query_1 = require("./query");
var mongodb_1 = require("./connector/mongodb");
var headers_1 = require("./federated/headers");
var cache_1 = require("./cache");
var scalar_1 = __importDefault(require("./scalar"));
var define_1 = __importDefault(require("./define"));
var subscriptions_1 = require("./federated/subscriptions");
var Datasources = /** @class */ (function () {
    function Datasources() {
        this.inner = [];
    }
    Datasources.prototype.push = function (datasource) {
        this.inner.push(datasource);
    };
    Datasources.prototype.toString = function () {
        if (this.inner.length > 0) {
            var header = 'extend schema';
            var datasources = this.inner.map(String).join('\n');
            return "".concat(header, "\n").concat(datasources);
        }
        else {
            return '';
        }
    };
    return Datasources;
}());
exports.Datasources = Datasources;
var FEDERATION_VERSION = '2.3';
var Graph = /** @class */ (function () {
    function Graph(subgraph) {
        this.enums = [];
        this.types = [];
        this.unions = [];
        this.models = [];
        this.interfaces = [];
        this.datasources = new Datasources();
        this.extendedTypes = [];
        this.inputs = [];
        this.subgraph = subgraph;
    }
    /**
     * Add a new datasource to the schema.
     *
     * @param datasource - The datasource to add.
     * @param params - The introspection parameters.
     */
    Graph.prototype.datasource = function (datasource, params) {
        var finalDatasource = datasource.finalize(params === null || params === void 0 ? void 0 : params.namespace);
        this.datasources.push(finalDatasource);
    };
    /**
     * Add an existing item or items to the schema.
     *
     * @param items - The items to add
     */
    Graph.prototype.add = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        items.forEach(function (item) {
            switch (item.kind) {
                case 'type':
                    return _this.addType(item);
                case 'interface':
                    return _this.addInterface(item);
                case 'union':
                    return _this.addUnion(item);
                case 'enum':
                    return _this.addEnum(item);
                case 'input':
                    return _this.addInput(item);
                case 'mutation':
                    return _this.addMutation(item);
                case 'query':
                    return _this.addQuery(item);
            }
        });
    };
    /**
     * Add a new composite type to the schema.
     *
     * @param name - The name of the type.
     * @param fields - The fields to be included.
     */
    Graph.prototype.type = function (name, fields) {
        var type = define_1.default.type(name, fields);
        this.addType(type);
        return type;
    };
    /**
     * Add an existing type to the schema.
     *
     * @param type - The type to add
     */
    Graph.prototype.addType = function (type) {
        this.types.push(type);
    };
    /**
     * Add a new interface to the schema.
     *
     * @param name - The name of the interface.
     * @param fields - The fields to be included.
     */
    Graph.prototype.interface = function (name, fields) {
        var iface = define_1.default.interface(name, fields);
        this.addInterface(iface);
        return iface;
    };
    /**
     * Add an existing interface to the schema.
     *
     * @param iface - The interface to add
     */
    Graph.prototype.addInterface = function (iface) {
        this.interfaces.push(iface);
    };
    /**
     * Add a new union to the schema.
     *
     * @param name - The name of the union.
     * @param types - The types to be included.
     */
    Graph.prototype.union = function (name, types) {
        var union = define_1.default.union(name, types);
        this.addUnion(union);
        return union;
    };
    /**
     * Add an existing union to the schema.
     *
     * @param union - The union to add
     */
    Graph.prototype.addUnion = function (union) {
        this.unions.push(union);
    };
    /**
     * Add a new query to the schema.
     *
     * @param name - The name of the query.
     * @param definition - The query definition.
     */
    Graph.prototype.query = function (name, definition) {
        var query = define_1.default.query(name, definition);
        this.addQuery(query);
        return query;
    };
    /**
     * Add an existing query to the schema.
     *
     * @param query - The query to add
     */
    Graph.prototype.addQuery = function (query) {
        if (!this.queries) {
            this.queries = new type_1.TypeExtension('Query');
        }
        this.queries.query(query);
    };
    /**
     * Add a new mutation to the schema.
     *
     * @param name - The name of the mutation.
     * @param fields - The mutation definition.
     */
    Graph.prototype.mutation = function (name, definition) {
        var mutation = define_1.default.mutation(name, definition);
        this.addMutation(mutation);
        return mutation;
    };
    /**
     * Add an existing mutation to the schema.
     *
     * @param mutation - The mutation to add
     */
    Graph.prototype.addMutation = function (mutation) {
        if (!this.mutations) {
            this.mutations = new type_1.TypeExtension('Mutation');
        }
        this.mutations.query(mutation);
    };
    /**
     * Add a new input to the schema.
     *
     * @param name = The name of the input.
     * @param fields = The input definition.
     */
    Graph.prototype.input = function (name, definition) {
        var input = define_1.default.input(name, definition);
        this.addInput(input);
        return input;
    };
    /**
     * Add an existing input to the schema.
     *
     * @param input - The input to add
     */
    Graph.prototype.addInput = function (input) {
        this.inputs.push(input);
    };
    /**
     * Add a new enum to the schema.
     *
     * @param name - The name of the enum.
     * @param variants - A list of variants of the enum.
     */
    Graph.prototype.enum = function (name, variants) {
        var definition = define_1.default.enum(name, variants);
        this.addEnum(definition);
        return definition;
    };
    /**
     * Add an existing enum to the schema.
     *
     * @param definition - The enum to add
     */
    Graph.prototype.addEnum = function (definition) {
        this.enums.push(definition);
    };
    /**
     * Create a new string field.
     */
    Graph.prototype.string = function () {
        return scalar_1.default.string();
    };
    /**
     * Create a new ID field.
     */
    Graph.prototype.id = function () {
        return scalar_1.default.id();
    };
    /**
     * Create a new email field.
     */
    Graph.prototype.email = function () {
        return scalar_1.default.email();
    };
    /**
     * Create a new int field.
     */
    Graph.prototype.int = function () {
        return scalar_1.default.int();
    };
    /**
     * Create a new float field.
     */
    Graph.prototype.float = function () {
        return scalar_1.default.float();
    };
    /**
     * Create a new boolean field.
     */
    Graph.prototype.boolean = function () {
        return scalar_1.default.boolean();
    };
    /**
     * Create a new date field.
     */
    Graph.prototype.date = function () {
        return scalar_1.default.date();
    };
    /**
     * Create a new datetime field.
     */
    Graph.prototype.datetime = function () {
        return scalar_1.default.datetime();
    };
    /**
     * Create a new IP address field.
     */
    Graph.prototype.ipAddress = function () {
        return scalar_1.default.ipAddress();
    };
    /**
     * Create a new timestamp field.
     */
    Graph.prototype.timestamp = function () {
        return scalar_1.default.timestamp();
    };
    /**
     * Create a new URL field.
     */
    Graph.prototype.url = function () {
        return scalar_1.default.url();
    };
    /**
     * Create a new JSON field.
     */
    Graph.prototype.json = function () {
        return scalar_1.default.json();
    };
    /**
     * Create a new phone number field.
     */
    Graph.prototype.phoneNumber = function () {
        return scalar_1.default.phoneNumber();
    };
    /**
     * Create a new decimal field.
     */
    Graph.prototype.decimal = function () {
        return scalar_1.default.decimal();
    };
    /**
     * Create a new bytes field.
     */
    Graph.prototype.bytes = function () {
        return scalar_1.default.bytes();
    };
    /**
     * Create a new bigint field.
     */
    Graph.prototype.bigint = function () {
        return scalar_1.default.bigint();
    };
    /**
     * Create a new reference field, referencing a type.
     *
     * @param type - A type to be referred.
     */
    Graph.prototype.ref = function (type) {
        return define_1.default.ref(type);
    };
    /**
     * Create a new enum field.
     *
     * @param e - An enum to be referred.
     */
    Graph.prototype.enumRef = function (e) {
        return define_1.default.enumRef(e);
    };
    /**
     * Create a new field from an input object reference.
     *
     * @param input - The input object reference.
     */
    Graph.prototype.inputRef = function (input) {
        return define_1.default.inputRef(input);
    };
    /**
     * Extends an existing type with the given queries.
     *
     * @param type - Either a type if the given type is directly in the schema,
     *               or a string if extending an external type introspected from an
     *               external datasource.
     * @param definition - A collection of fields to be added to the extension
     *                     or a builder function if extending with directives
     */
    Graph.prototype.extend = function (type, definitionOrBuilder) {
        var extension = new type_1.TypeExtension(type);
        if (typeof definitionOrBuilder === 'function') {
            definitionOrBuilder(extension);
        }
        else {
            Object.entries(definitionOrBuilder).forEach(function (_a) {
                var name = _a[0], input = _a[1];
                var query = new query_1.Query(name, input.returns, input.resolver, false);
                if (input.args != null) {
                    Object.entries(input.args).forEach(function (_a) {
                        var name = _a[0], type = _a[1];
                        return query.argument(name, type);
                    });
                }
                extension.query(query);
            });
        }
        this.extendedTypes.push(extension);
    };
    /**
     * Returns the environment variable with the given variableName.
     * Throws, if the variable is not set.
     *
     * @param variableName - The name of the environment variable.
     */
    Graph.prototype.env = function (variableName) {
        var value = process.env[variableName];
        if (value === undefined || value === null) {
            throw "Environment variable ".concat(variableName, " is not set");
        }
        return value;
    };
    /**
     * Empty the schema.
     */
    Graph.prototype.clear = function () {
        this.queries = undefined;
        this.mutations = undefined;
        this.interfaces = [];
        this.types = [];
        this.unions = [];
        this.enums = [];
        this.models = [];
        this.datasources = new Datasources();
        this.extendedTypes = [];
        this.inputs = [];
    };
    Graph.prototype.toString = function () {
        var _this = this;
        this.datasources.inner.forEach(function (datasource) {
            if (datasource instanceof mongodb_1.MongoDBAPI) {
                _this.models = _this.models.concat(datasource.models);
            }
        });
        var subgraph = this.subgraph
            ? "extend schema @federation(version: \"".concat(FEDERATION_VERSION, "\")")
            : '';
        var datasources = this.datasources.toString();
        var interfaces = this.interfaces.map(String).join('\n\n');
        var types = this.types.map(String).join('\n\n');
        var inputs = this.inputs.map(String).join('\n\n');
        var queries = this.queries ? this.queries.toString() : '';
        var mutations = this.mutations ? this.mutations.toString() : '';
        var extendedTypes = this.extendedTypes.map(String).join('\n\n');
        var unions = this.unions.map(String).join('\n\n');
        var enums = this.enums.map(String).join('\n\n');
        var models = this.models.map(String).join('\n\n');
        var renderOrder = [
            subgraph,
            datasources,
            interfaces,
            enums,
            inputs,
            types,
            extendedTypes,
            queries,
            mutations,
            unions,
            models
        ];
        return renderOrder.filter(Boolean).flat().map(String).join('\n\n');
    };
    return Graph;
}());
exports.Graph = Graph;
var FederatedGraph = /** @class */ (function () {
    function FederatedGraph(input) {
        this.headers = new headers_1.FederatedGraphHeaders();
        if (input === null || input === void 0 ? void 0 : input.headers) {
            input.headers(this.headers);
        }
        this.subscriptions = new subscriptions_1.FederatedGraphSubscriptions();
        if (input === null || input === void 0 ? void 0 : input.subscriptions) {
            input.subscriptions(this.subscriptions);
        }
        if (input === null || input === void 0 ? void 0 : input.cache) {
            this.cache = new cache_1.GlobalCache({ rules: input.cache.rules });
        }
    }
    FederatedGraph.prototype.toString = function () {
        return "\nextend schema\n  @graph(type: federated)".concat(this.headers).concat(this.subscriptions, "\n").concat(this.cache || '');
    };
    return FederatedGraph;
}());
exports.FederatedGraph = FederatedGraph;
