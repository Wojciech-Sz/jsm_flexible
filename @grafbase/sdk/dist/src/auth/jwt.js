"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAuthV2 = exports.JWTAuth = void 0;
/**
 * Grafbase supports a symmetric JWT provider that you can use to authorize
 * requests using a JWT signed by yourself or a third-party service.
 */
var JWTAuth = /** @class */ (function () {
    function JWTAuth(params) {
        this.issuer = params.issuer;
        this.secret = params.secret;
        this.clientId = params.clientId;
        this.groupsClaim = params.groupsClaim;
    }
    JWTAuth.prototype.toString = function () {
        var clientId = this.clientId ? ", clientId: \"".concat(this.clientId, "\"") : '';
        var groupsClaim = this.groupsClaim
            ? ", groupsClaim: \"".concat(this.groupsClaim, "\"")
            : '';
        return "{ type: jwt, issuer: \"".concat(this.issuer, "\", secret: \"").concat(this.secret, "\"").concat(clientId).concat(groupsClaim, " }");
    };
    return JWTAuth;
}());
exports.JWTAuth = JWTAuth;
/**
 * JWT authentication for Federated Graphs.
 */
var JWTAuthV2 = /** @class */ (function () {
    function JWTAuthV2(params) {
        this.params = params;
    }
    JWTAuthV2.prototype.toString = function () {
        var _a, _b, _c, _d;
        var name = this.params.name ? ", name: \"".concat(this.params.name, "\"") : '';
        var issuer = this.params.jwks.issuer
            ? ", issuer: \"".concat(this.params.jwks.issuer, "\"")
            : '';
        var audience = this.params.jwks.audience
            ? ", audience: \"".concat(this.params.jwks.audience, "\"")
            : '';
        var pollInterval = this.params.jwks.pollInterval
            ? ", pollInterval: \"".concat(this.params.jwks.pollInterval, "\"")
            : '';
        var header = '';
        if (((_a = this.params.header) === null || _a === void 0 ? void 0 : _a.name) || ((_b = this.params.header) === null || _b === void 0 ? void 0 : _b.valuePrefix)) {
            var headerName = ((_c = this.params.header) === null || _c === void 0 ? void 0 : _c.name)
                ? "name: \"".concat(this.params.header.name, "\"")
                : 'name: "Authorization"';
            var headerValuePrefix = ((_d = this.params.header) === null || _d === void 0 ? void 0 : _d.valuePrefix)
                ? ", valuePrefix: \"".concat(this.params.header.valuePrefix, "\"")
                : '';
            header = ", header: { ".concat(headerName).concat(headerValuePrefix, " }");
        }
        return "{ type: jwt, jwks: { url: \"".concat(this.params.jwks.url, "\"").concat(issuer).concat(audience).concat(pollInterval, " }").concat(header).concat(name, " }");
    };
    return JWTAuthV2;
}());
exports.JWTAuthV2 = JWTAuthV2;
