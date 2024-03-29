"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldType = void 0;
/**
 * All scalar field types a field can be.
 */
var FieldType;
(function (FieldType) {
    FieldType["String"] = "String";
    FieldType["Int"] = "Int";
    FieldType["Email"] = "Email";
    FieldType["ID"] = "ID";
    FieldType["Float"] = "Float";
    FieldType["Boolean"] = "Boolean";
    FieldType["Date"] = "Date";
    FieldType["DateTime"] = "DateTime";
    FieldType["IPAddress"] = "IPAddress";
    FieldType["Timestamp"] = "Timestamp";
    FieldType["URL"] = "URL";
    FieldType["JSON"] = "JSON";
    FieldType["PhoneNumber"] = "PhoneNumber";
    FieldType["Decimal"] = "Decimal";
    FieldType["Bytes"] = "Bytes";
    FieldType["BigInt"] = "BigInt";
})(FieldType || (exports.FieldType = FieldType = {}));
