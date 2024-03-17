"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBModel = void 0;
var field_1 = require("../../field");
var model_1 = require("../../model");
var MongoDBModel = /** @class */ (function (_super) {
    __extends(MongoDBModel, _super);
    function MongoDBModel(name, connector) {
        var _this = _super.call(this, name) || this;
        _this.connector = connector;
        return _this;
    }
    /**
     * Push a field to the model definition.
     *
     * @param name - The name of the model.
     * @param definition - Fields to be included in the model.
     */
    MongoDBModel.prototype.field = function (name, definition) {
        this.fields.push(new field_1.Field(name, definition));
        return this;
    };
    /**
     * Set the name of the collection for this model in the database.
     * If not set, the name of the model is used.
     *
     * @param name - The name of the collection.
     */
    MongoDBModel.prototype.collection = function (name) {
        this.collectionName = name;
        return this;
    };
    MongoDBModel.prototype.toString = function () {
        var _a;
        var auth = this.authRules ? " @auth(\n    rules: ".concat(this.authRules, ")") : '';
        var cache = this.cacheDirective ? " ".concat(this.cacheDirective) : '';
        var collection = (_a = this.collectionName) !== null && _a !== void 0 ? _a : this.name;
        var header = "type ".concat(this.name, " @model(connector: \"").concat(this.connector, "\", collection: \"").concat(collection, "\")").concat(auth).concat(cache, " {");
        var fields = this.fields.map(function (field) { return "  ".concat(field); }).join('\n');
        var footer = '}';
        return "".concat(header, "\n").concat(fields, "\n").concat(footer);
    };
    return MongoDBModel;
}(model_1.Model));
exports.MongoDBModel = MongoDBModel;
