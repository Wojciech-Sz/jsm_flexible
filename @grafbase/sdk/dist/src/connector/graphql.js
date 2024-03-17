"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLAPI = exports.PartialGraphQLAPI = void 0;
var header_1 = require("./header");
var transforms_1 = require("./transforms");
var PartialGraphQLAPI = /** @class */ (function () {
    function PartialGraphQLAPI(name, params) {
        var headers = new header_1.Headers();
        if (params.headers) {
            params.headers(headers);
        }
        var transforms = new transforms_1.SchemaTransforms();
        if (params.transforms) {
            params.transforms(transforms);
        }
        this.name = name;
        this.apiUrl = params.url;
        this.headers = headers.headers;
        this.introspectionHeaders = headers.introspectionHeaders;
        this.transforms = transforms.transforms;
    }
    PartialGraphQLAPI.prototype.finalize = function (namespace) {
        return new GraphQLAPI(this.name, this.apiUrl, this.headers, this.introspectionHeaders, this.transforms, namespace);
    };
    return PartialGraphQLAPI;
}());
exports.PartialGraphQLAPI = PartialGraphQLAPI;
var GraphQLAPI = /** @class */ (function () {
    function GraphQLAPI(name, url, headers, introspectionHeaders, transforms, namespace) {
        this.name = name;
        this.namespace = namespace;
        this.url = url;
        this.headers = headers;
        this.introspectionHeaders = introspectionHeaders;
        this.transforms = transforms;
    }
    GraphQLAPI.prototype.toString = function () {
        var header = '  @graphql(\n';
        var name = "    name: \"".concat(this.name, "\"\n");
        var namespace;
        if (this.namespace === undefined || this.namespace === true) {
            namespace = "    namespace: true\n";
        }
        else {
            namespace = '    namespace: false\n';
        }
        var url = this.url ? "    url: \"".concat(this.url, "\"\n") : '';
        var headers = this.headers.map(function (header) { return "      ".concat(header); }).join('\n');
        headers = headers ? "    headers: [\n".concat(headers, "\n    ]\n") : '';
        var introspectionHeaders = this.introspectionHeaders
            .map(function (header) { return "      ".concat(header); })
            .join('\n');
        introspectionHeaders = introspectionHeaders
            ? "    introspectionHeaders: [\n".concat(introspectionHeaders, "\n    ]\n")
            : '';
        var transforms = this.transforms
            .map(function (transform) { return "      ".concat(transform); })
            .join('\n');
        transforms =
            this.transforms.length != 0
                ? "    transforms: {\n".concat(transforms, "\n    }\n")
                : '';
        var footer = '  )';
        return "".concat(header).concat(name).concat(namespace).concat(url).concat(headers).concat(introspectionHeaders).concat(transforms).concat(footer);
    };
    return GraphQLAPI;
}());
exports.GraphQLAPI = GraphQLAPI;
