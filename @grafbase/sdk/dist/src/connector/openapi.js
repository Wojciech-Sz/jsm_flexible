"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAPI = exports.PartialOpenAPI = void 0;
var header_1 = require("./header");
var transforms_1 = require("./openapi/transforms");
var PartialOpenAPI = /** @class */ (function () {
    function PartialOpenAPI(name, params) {
        var headers = new header_1.Headers();
        if (params.headers) {
            params.headers(headers);
        }
        var transforms = new transforms_1.OpenApiTransforms();
        if (typeof params.transforms === 'function') {
            params.transforms(transforms);
        }
        else if (params.transforms) {
            transforms.queryNaming(params.transforms.queryNaming);
        }
        this.name = name;
        this.schema = params.schema;
        this.apiUrl = params.url;
        this.transforms = transforms.transforms;
        this.headers = headers.headers;
        this.introspectionHeaders = headers.introspectionHeaders;
    }
    PartialOpenAPI.prototype.finalize = function (namespace) {
        return new OpenAPI(this.name, this.schema, this.headers, this.introspectionHeaders, this.transforms, this.apiUrl, namespace);
    };
    return PartialOpenAPI;
}());
exports.PartialOpenAPI = PartialOpenAPI;
var OpenAPI = /** @class */ (function () {
    function OpenAPI(name, schema, headers, introspectionHeaders, transforms, url, namespace) {
        this.name = name;
        this.namespace = namespace;
        this.schema = schema;
        this.apiUrl = url;
        this.transforms = transforms;
        this.headers = headers;
        this.introspectionHeaders = introspectionHeaders;
    }
    OpenAPI.prototype.toString = function () {
        var header = '  @openapi(\n';
        var name = "    name: \"".concat(this.name, "\"\n");
        var namespace;
        if (this.namespace === undefined || this.namespace === true) {
            namespace = "    namespace: true\n";
        }
        else {
            namespace = '    namespace: false\n';
        }
        var url = this.apiUrl ? "    url: \"".concat(this.apiUrl, "\"\n") : '';
        var schema = "    schema: \"".concat(this.schema, "\"\n");
        var transforms = this.transforms
            .map(function (transform) { return "      ".concat(transform); })
            .join('\n');
        transforms =
            this.transforms.length != 0
                ? "    transforms: {\n".concat(transforms, "\n    }\n")
                : '';
        var headers = this.headers.map(function (header) { return "      ".concat(header); }).join('\n');
        headers = headers ? "    headers: [\n".concat(headers, "\n    ]\n") : '';
        var introspectionHeaders = this.introspectionHeaders
            .map(function (header) { return "      ".concat(header); })
            .join('\n');
        introspectionHeaders = introspectionHeaders
            ? "    introspectionHeaders: [\n".concat(introspectionHeaders, "\n    ]\n")
            : '';
        var footer = '  )';
        return "".concat(header).concat(name).concat(namespace).concat(url).concat(schema).concat(transforms).concat(headers).concat(introspectionHeaders).concat(footer);
    };
    return OpenAPI;
}());
exports.OpenAPI = OpenAPI;
