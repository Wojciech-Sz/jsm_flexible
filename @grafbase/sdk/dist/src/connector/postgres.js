"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresAPI = exports.PartialPostgresAPI = void 0;
var PartialPostgresAPI = /** @class */ (function () {
    function PartialPostgresAPI(name, params) {
        this.name = name;
        this.url = params.url;
    }
    PartialPostgresAPI.prototype.finalize = function (namespace) {
        return new PostgresAPI(this.name, this.url, namespace);
    };
    return PartialPostgresAPI;
}());
exports.PartialPostgresAPI = PartialPostgresAPI;
var PostgresAPI = /** @class */ (function () {
    function PostgresAPI(name, url, namespace) {
        this.name = name;
        this.url = url;
        this.namespace = namespace;
    }
    PostgresAPI.prototype.toString = function () {
        var header = '  @postgres(\n';
        var name = "    name: \"".concat(this.name, "\"\n");
        var url = "    url: \"".concat(this.url, "\"\n");
        var namespace;
        if (this.namespace === undefined || this.namespace === true) {
            namespace = "    namespace: true\n";
        }
        else {
            namespace = '    namespace: false\n';
        }
        var footer = '  )';
        return "".concat(header).concat(name).concat(url).concat(namespace).concat(footer);
    };
    return PostgresAPI;
}());
exports.PostgresAPI = PostgresAPI;
