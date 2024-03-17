"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBAPI = exports.PartialMongoDBAPI = void 0;
var model_1 = require("./mongodb/model");
var PartialMongoDBAPI = /** @class */ (function () {
    function PartialMongoDBAPI(name, params) {
        this.name = name;
        this.url = params.url;
        this.apiKey = params.apiKey;
        this.dataSource = params.dataSource;
        this.database = params.database;
        this.models = [];
    }
    /**
     * Creates a new model type with an access to this MongoDB data source.
     *
     * @param name - The name of the model
     * @param fields - The fields of the model
     */
    PartialMongoDBAPI.prototype.model = function (name, fields) {
        var model = Object.entries(fields).reduce(function (model, _a) {
            var name = _a[0], definition = _a[1];
            return model.field(name, definition);
        }, new model_1.MongoDBModel(name, this.name));
        this.models.push(model);
        return model;
    };
    PartialMongoDBAPI.prototype.finalize = function (namespace) {
        return new MongoDBAPI(this.name, this.apiKey, this.url, this.dataSource, this.database, this.models, namespace);
    };
    return PartialMongoDBAPI;
}());
exports.PartialMongoDBAPI = PartialMongoDBAPI;
var MongoDBAPI = /** @class */ (function () {
    function MongoDBAPI(name, apiKey, url, dataSource, database, models, namespace) {
        this.name = name;
        this.apiKey = apiKey;
        this.url = url;
        this.dataSource = dataSource;
        this.database = database;
        this.namespace = namespace;
        this.models = models;
    }
    MongoDBAPI.prototype.toString = function () {
        var header = '  @mongodb(\n';
        var name = "    name: \"".concat(this.name, "\"\n");
        var url = "    url: \"".concat(this.url, "\"\n");
        var apiKey = "    apiKey: \"".concat(this.apiKey, "\"\n");
        var dataSource = "    dataSource: \"".concat(this.dataSource, "\"\n");
        var database = "    database: \"".concat(this.database, "\"\n");
        var namespace;
        if (this.namespace === undefined || this.namespace === true) {
            namespace = "    namespace: true\n";
        }
        else {
            namespace = '    namespace: false\n';
        }
        var footer = '  )';
        return "".concat(header).concat(namespace).concat(name).concat(url).concat(apiKey).concat(dataSource).concat(database).concat(footer);
    };
    return MongoDBAPI;
}());
exports.MongoDBAPI = MongoDBAPI;
