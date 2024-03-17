"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapDefinition = void 0;
var MapDefinition = /** @class */ (function () {
    function MapDefinition(field, mappedName) {
        this.field = field;
        this.mappedName = mappedName;
    }
    MapDefinition.prototype.toString = function () {
        return "".concat(this.field, " @map(name: \"").concat(this.mappedName, "\")");
    };
    return MapDefinition;
}());
exports.MapDefinition = MapDefinition;
