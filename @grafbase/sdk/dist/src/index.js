"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.connector = exports.config = exports.g = exports.define = exports.scalar = exports.graph = exports.SubscriptionTransport = void 0;
var config_1 = require("./config");
var openapi_1 = require("./connector/openapi");
var graphql_1 = require("./connector/graphql");
var openid_1 = require("./auth/openid");
var jwt_1 = require("./auth/jwt");
var jwks_1 = require("./auth/jwks");
var dotenv_1 = __importDefault(require("dotenv"));
var authorizer_1 = require("./auth/authorizer");
var mongodb_1 = require("./connector/mongodb");
var path_1 = __importDefault(require("path"));
var validation_1 = require("./validation");
var postgres_1 = require("./connector/postgres");
var graph_1 = require("./graph");
Object.defineProperty(exports, "graph", { enumerable: true, get: function () { return graph_1.graph; } });
var grafbase_schema_1 = require("./grafbase-schema");
var scalar_1 = __importDefault(require("./scalar"));
exports.scalar = scalar_1.default;
var define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
var subscriptions_1 = require("./federated/subscriptions");
Object.defineProperty(exports, "SubscriptionTransport", { enumerable: true, get: function () { return subscriptions_1.SubscriptionTransport; } });
/** @deprecated use `graph.Standalone()` instead */
exports.g = graph_1.graph.Standalone();
dotenv_1.default.config({
    // must exist, defined by "~/.grafbase/parser/parse-config.ts"
    path: path_1.default.join(process.env.GRAFBASE_PROJECT_GRAFBASE_DIR, '.env'),
    override: true
});
var isFederatedGraphConfigInput = function (input) {
    return 'graph' in input && input.graph instanceof grafbase_schema_1.FederatedGraph;
};
function config(input) {
    if (isFederatedGraphConfigInput(input)) {
        return new config_1.FederatedGraphConfig(input);
    }
    return new config_1.GraphConfig(input);
}
exports.config = config;
exports.connector = {
    /**
     * Create a new OpenAPI connector object.
     *
     * @param name - A unique name for the connector.
     * @param params - The configuration parameters.
     */
    OpenAPI: function (name, params) {
        (0, validation_1.validateIdentifier)(name);
        return new openapi_1.PartialOpenAPI(name, params);
    },
    /**
     * Create a new GraphQL connector object.
     *
     * @param name - A unique name for the connector.
     * @param params - The configuration parameters.
     */
    GraphQL: function (name, params) {
        (0, validation_1.validateIdentifier)(name);
        return new graphql_1.PartialGraphQLAPI(name, params);
    },
    /**
     * Create a new MongoDB connector object.
     *
     * @param name - A unique name for the connector.
     * @param params - The configuration parameters.
     */
    MongoDB: function (name, params) {
        (0, validation_1.validateIdentifier)(name);
        return new mongodb_1.PartialMongoDBAPI(name, params);
    },
    /**
     * Create a new Postgres connector object.
     *
     * @param name - A unique name for the connector.
     * @param params - The configuration parameters.
     */
    Postgres: function (name, params) {
        (0, validation_1.validateIdentifier)(name);
        return new postgres_1.PartialPostgresAPI(name, params);
    }
};
exports.auth = {
    /**
     * Create a new OpenID authenticator.
     *
     * @param params - The configuration parameters.
     */
    OpenIDConnect: function (params) {
        return new openid_1.OpenIDAuth(params);
    },
    /**
     * Create a new JWT authenticator.
     *
     * @param params - The configuration parameters.
     */
    JWT: (function (params) {
        if ('jwks' in params) {
            return new jwt_1.JWTAuthV2(params);
        }
        return new jwt_1.JWTAuth(params);
    }),
    /**
     * Create a new JWKS authenticator.
     *
     * @param params - The configuration parameters.
     */
    JWKS: function (params) {
        return new jwks_1.JWKSAuth(params);
    },
    /**
     * Create a new authorizer authenticator.
     *
     * @param params - The configuration parameters.
     */
    Authorizer: function (params) {
        return new authorizer_1.Authorizer(params);
    }
};
