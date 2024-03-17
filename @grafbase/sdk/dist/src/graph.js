"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graph = void 0;
var grafbase_schema_1 = require("./grafbase-schema");
/**
 * A builder for a Grafbase schema definition.
 */
exports.graph = {
    Federated: function (input) { return new grafbase_schema_1.FederatedGraph(input); },
    Standalone: function (input) { return new grafbase_schema_1.Graph(Boolean(input === null || input === void 0 ? void 0 : input.subgraph)); }
};
