"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorizer = void 0;
/**
 * An authorizer for multi-tenant JWT verification with
 * more complex rules that require calling a JavaScript
 * function.
 *
 * The name parameter is the name of the file implementing
 * the needed function without the extension.
 * For example, if the name is 'foo', the file is in
 * `grafbase/auth/foo.js`.
 */
var Authorizer = /** @class */ (function () {
    function Authorizer(params) {
        this.name = params.name;
    }
    Authorizer.prototype.toString = function () {
        return "{ type: authorizer, name: \"".concat(this.name, "\" }");
    };
    return Authorizer;
}());
exports.Authorizer = Authorizer;
