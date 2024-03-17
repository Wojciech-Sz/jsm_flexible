"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typedefs_1 = require("./typedefs");
var scalar_1 = require("./typedefs/scalar");
exports.default = {
    /**
     * Create a new string field.
     */
    string: function () { return new scalar_1.StringDefinition(typedefs_1.FieldType.String); },
    /**
     * Create a new ID field.
     */
    id: function () { return new scalar_1.StringDefinition(typedefs_1.FieldType.ID); },
    /**
     * Create a new email field.
     */
    email: function () { return new scalar_1.StringDefinition(typedefs_1.FieldType.Email); },
    /**
     * Create a new int field.
     */
    int: function () { return new scalar_1.NumberDefinition(typedefs_1.FieldType.Int); },
    /**
     * Create a new float field.
     */
    float: function () { return new scalar_1.NumberDefinition(typedefs_1.FieldType.Float); },
    /**
     * Create a new boolean field.
     */
    boolean: function () { return new scalar_1.BooleanDefinition(typedefs_1.FieldType.Boolean); },
    /**
     * Create a new date field.
     */
    date: function () { return new scalar_1.DateDefinition(typedefs_1.FieldType.Date); },
    /**
     * Create a new datetime field.
     */
    datetime: function () { return new scalar_1.DateDefinition(typedefs_1.FieldType.DateTime); },
    /**
     * Create a new IP address field.
     */
    ipAddress: function () { return new scalar_1.StringDefinition(typedefs_1.FieldType.IPAddress); },
    /**
     * Create a new timestamp field.
     */
    timestamp: function () { return new scalar_1.NumberDefinition(typedefs_1.FieldType.Timestamp); },
    /**
     * Create a new URL field.
     */
    url: function () { return new scalar_1.StringDefinition(typedefs_1.FieldType.URL); },
    /**
     * Create a new JSON field.
     */
    json: function () { return new scalar_1.ObjectDefinition(typedefs_1.FieldType.JSON); },
    /**
     * Create a new phone number field.
     */
    phoneNumber: function () { return new scalar_1.StringDefinition(typedefs_1.FieldType.PhoneNumber); },
    /**
     * Create a new decimal field.
     */
    decimal: function () { return new scalar_1.StringDefinition(typedefs_1.FieldType.Decimal); },
    /**
     * Create a new bytes field.
     */
    bytes: function () { return new scalar_1.BytesDefinition(typedefs_1.FieldType.Bytes); },
    /**
     * Create a new bigint field.
     */
    bigint: function () { return new scalar_1.BigIntDefinition(typedefs_1.FieldType.BigInt); }
};
