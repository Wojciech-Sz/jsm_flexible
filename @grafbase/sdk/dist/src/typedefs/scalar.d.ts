import { RequireAtLeastOne } from "type-fest";
import { Enum } from "../enum";
import {
  BigIntListDefinition,
  BooleanListDefinition,
  BytesListDefinition,
  DateListDefinition,
  DecimalListDefinition,
  ListDefinition,
  NumberListDefinition,
  StringListDefinition,
} from "./list";
import { FieldType } from "../typedefs";
import {
  DefaultDefinition,
  DefaultValueType,
} from "./default";
import {
  FieldLength,
  LengthLimitedStringDefinition,
} from "./length-limited-string";
import { SearchDefinition } from "./search";
import { UniqueDefinition } from "./unique";
import { AuthDefinition } from "./auth";
import { AuthRuleF } from "../auth";
import { ResolverDefinition } from "./resolver";
import { CacheDefinition, FieldCacheParams } from "./cache";
import { MapDefinition } from "./map";
import { JoinDefinition } from "./join";
import { DeprecatedDefinition } from "./deprecated";
import { InaccessibleDefinition } from "./inaccessible";
import { ShareableDefinition } from "./shareable";
import { OverrideDefinition } from "./override";
import { ProvidesDefinition } from "./provides";
import { TagDefinition } from "./tag";
export declare class ScalarDefinition {
  private _fieldType;
  private isOptional;
  protected defaultValue?: DefaultValueType;
  constructor(fieldType: FieldType | Enum<any, any>);
  /**
   * The type of the field
   */
  get fieldType(): FieldType | Enum<any, any>;
  /**
   * Make the field optional.
   */
  optional(): this;
  /**
   * Make the field unique.
   *
   * @param scope - Additional fields to be added to the constraint.
   */
  unique(scope?: string[]): UniqueDefinition;
  /**
   * Make the field searchable.
   */
  search(): SearchDefinition;
  /**
   * Allow multiple scalars to be used as values for the field.
   */
  list(): ListDefinition;
  /**
   * Set the field-level auth directive.
   *
   * @param rules - A closure to build the authentication rules.
   */
  auth(rules: AuthRuleF): AuthDefinition;
  /**
   * Set the field-level deprecated directive.
   *
   * @param rules - A closure to build the authentication rules.
   */
  deprecated(reason?: string): DeprecatedDefinition;
  /**
   * Attach a resolver function to the field.
   *
   * @param name - The name of the resolver function file without the extension or directory.
   */
  resolver(name: string): ResolverDefinition;
  /**
   * Attach a join function to the field.
   *
   * @param select - The field selection string to join onto this field
   */
  join(select: string): JoinDefinition;
  /**
   * Set the field-level cache directive.
   *
   * @param params - The cache definition parameters.
   */
  cache(params: FieldCacheParams): CacheDefinition;
  /**
   * Sets the name of the field in the database, if different than the name of the field.
   *
   * Only supported on MongoDB.
   */
  mapped(name: string): MapDefinition;
  /**
   * Set the field-level inaccessible directive.
   */
  inaccessible(): InaccessibleDefinition;
  /**
   * Set the field-level shareable directive.
   */
  shareable(): ShareableDefinition;
  /**
   * Set the field-level override directive.
   */
  override(from: string): OverrideDefinition;
  /**
   * Set the field-level provides directive.
   */
  provides(fields: string): ProvidesDefinition;
  /**
   * Adds a tag to this field
   *
   * @param tag - The tag to add
   */
  tag(tag: string): TagDefinition;
  fieldTypeVal(): FieldType | Enum<any, any>;
  toString(): string;
}
export declare class DecimalDefinition extends ScalarDefinition {
  /**
   * Set the default value of the field.
   *
   * @param value - The value written to the database.
   */
  default(value: string): DefaultDefinition;
  /**
   * Allow multiple scalars to be used as values for the field.
   */
  list(): DecimalListDefinition;
}
export declare class BytesDefinition extends ScalarDefinition {
  /**
   * Set the default value of the field.
   *
   * @param value - The value written to the database.
   */
  default(value: string): DefaultDefinition;
  /**
   * Allow multiple scalars to be used as values for the field.
   */
  list(): BytesListDefinition;
}
export declare class BigIntDefinition extends ScalarDefinition {
  /**
   * Set the default value of the field.
   *
   * @param value - The value written to the database.
   */
  default(value: string): DefaultDefinition;
  /**
   * Allow multiple scalars to be used as values for the field.
   */
  list(): BigIntListDefinition;
}
export declare class StringDefinition extends ScalarDefinition {
  /**
   * Set the default value of the field.
   *
   * @param value - The value written to the database.
   */
  default(value: string): DefaultDefinition;
  /**
   * Specify a minimum or a maximum (or both) length of the field.
   *
   * @param fieldLength - Either `min`, `max` or both.
   */
  length(
    fieldLength: RequireAtLeastOne<
      FieldLength,
      "min" | "max"
    >
  ): LengthLimitedStringDefinition;
  /**
   * Allow multiple scalars to be used as values for the field.
   */
  list(): StringListDefinition;
}
export declare class NumberDefinition extends ScalarDefinition {
  /**
   * Set the default value of the field.
   *
   * @param value - The value written to the database.
   */
  default(value: number): DefaultDefinition;
  /**
   * Allow multiple scalars to be used as values for the field.
   */
  list(): NumberListDefinition;
}
export declare class BooleanDefinition extends ScalarDefinition {
  /**
   * Set the default value of the field.
   *
   * @param value - The value written to the database.
   */
  default(value: boolean): DefaultDefinition;
  /**
   * Allow multiple scalars to be used as values for the field.
   */
  list(): BooleanListDefinition;
}
export declare class DateDefinition extends ScalarDefinition {
  /**
   * Set the default value of the field.
   *
   * @param value - The value written to the database.
   */
  default(value: Date): DefaultDefinition;
  /**
   * Allow multiple scalars to be used as values for the field.
   */
  list(): DateListDefinition;
}
export declare class ObjectDefinition extends ScalarDefinition {
  /**
   * Set the default value of the field.
   *
   * @param value - The value written to the database.
   */
  default(value: object): DefaultDefinition;
}
//# sourceMappingURL=scalar.d.ts.map
