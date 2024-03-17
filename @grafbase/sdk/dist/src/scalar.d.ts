import { BigIntDefinition, BooleanDefinition, BytesDefinition, DateDefinition, NumberDefinition, ObjectDefinition, StringDefinition } from './typedefs/scalar';
declare const _default: {
    /**
     * Create a new string field.
     */
    string: () => StringDefinition;
    /**
     * Create a new ID field.
     */
    id: () => StringDefinition;
    /**
     * Create a new email field.
     */
    email: () => StringDefinition;
    /**
     * Create a new int field.
     */
    int: () => NumberDefinition;
    /**
     * Create a new float field.
     */
    float: () => NumberDefinition;
    /**
     * Create a new boolean field.
     */
    boolean: () => BooleanDefinition;
    /**
     * Create a new date field.
     */
    date: () => DateDefinition;
    /**
     * Create a new datetime field.
     */
    datetime: () => DateDefinition;
    /**
     * Create a new IP address field.
     */
    ipAddress: () => StringDefinition;
    /**
     * Create a new timestamp field.
     */
    timestamp: () => NumberDefinition;
    /**
     * Create a new URL field.
     */
    url: () => StringDefinition;
    /**
     * Create a new JSON field.
     */
    json: () => ObjectDefinition;
    /**
     * Create a new phone number field.
     */
    phoneNumber: () => StringDefinition;
    /**
     * Create a new decimal field.
     */
    decimal: () => StringDefinition;
    /**
     * Create a new bytes field.
     */
    bytes: () => BytesDefinition;
    /**
     * Create a new bigint field.
     */
    bigint: () => BigIntDefinition;
};
export default _default;
//# sourceMappingURL=scalar.d.ts.map