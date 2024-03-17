import { ListDefinition } from "./typedefs/list";
import { Interface } from "./interface";
import {
  CacheDefinition,
  TypeCacheParams,
} from "./typedefs/cache";
import { ReferenceDefinition } from "./typedefs/reference";
import { ScalarDefinition } from "./typedefs/scalar";
import { EnumDefinition } from "./typedefs/enum";
import { ResolverDefinition } from "./typedefs/resolver";
import { Query } from "./query";
import { MapDefinition } from "./typedefs/map";
import { FederationKeyParameters } from "./federation";
import { JoinDefinition } from "./typedefs/join";
import { TagDefinition } from "./typedefs/tag";
import { InaccessibleDefinition } from "./typedefs/inaccessible";
import { ShareableDefinition } from "./typedefs/shareable";
import { OverrideDefinition } from "./typedefs/override";
import { ProvidesDefinition } from "./typedefs/provides";
import { DeprecatedDefinition } from "./typedefs/deprecated";
/**
 * A collection of fields in a model.
 */
export type TypeFields = Record<string, TypeFieldShape>;
/**
 * A combination of classes a field in a non-model type can be.
 */
export type TypeFieldShape =
  | ScalarDefinition
  | ListDefinition
  | ReferenceDefinition
  | CacheDefinition
  | MapDefinition
  | EnumDefinition<any, any>
  | ResolverDefinition
  | JoinDefinition
  | TagDefinition
  | InaccessibleDefinition
  | ShareableDefinition
  | OverrideDefinition
  | ProvidesDefinition
  | DeprecatedDefinition
  | UniqueDefinition
  | LengthLimitedStringDefinition;
/**
 * A composite type definition (e.g. not a model).
 */
export declare class Type {
  private _name;
  private _kind;
  private fields;
  private interfaces;
  private cacheDirective?;
  private keys;
  constructor(name: string);
  /**
   * The name of the type.
   */
  get name(): string;
  get kind(): "type";
  /**
   * Pushes a field to the type definition.
   *
   * @param name - The name of the field.
   * @param definition - The type definition with optional attributes.
   */
  field(name: string, definition: TypeFieldShape): this;
  /**
   * Pushes an interface implemented by the type.
   *
   * @param iface - The interface this type implements.
   */
  implements(iface: Interface): this;
  /**
   * Sets the type `@cache` directive.
   *
   * @param params - The cache definition parameters.
   */
  cache(params: TypeCacheParams): this;
  /**
   * Marks this type as a federation entitiy with the given key
   *
   * @param fields The fields that make up this key, in FieldSet format
   * @param params The parameters for this key
   */
  key(
    fields: string,
    params?: FederationKeyParameters
  ): this;
  toString(): string;
}
export declare class TypeExtension {
  private name;
  private queries;
  private keys;
  private fieldExtensions;
  private fieldAdditions;
  constructor(type: string | Type);
  /**
   * Pushes a query to the extension.
   *
   * @param query - The query to be added.
   */
  query(query: Query): this;
  /**
   * Extends this type as a federation entity with the given key
   *
   * @param fields The fields that make up this key, in FieldSet format
   * @param params The parameters for this key
   */
  key(
    fields: string,
    params?: FederationKeyParameters
  ): this;
  /**
   * Extends a field of this type with additional federation directives
   *
   * @param field The name of the field to extend
   */
  addField(name: string, definition: TypeFieldShape): void;
  /**
   * Extends a field of this type with additional federation directives
   *
   * @param field The name of the field to extend
   */
  addFields(fields: TypeFields): void;
  /**
   * Extends a field of this type with additional federation directives
   *
   * @param field The name of the field to extend
   */
  extendField(field: string): FieldExtension;
  toString(): string;
}
export declare class FieldExtension {
  private name;
  private directives;
  constructor(name: string);
  /**
   * Adds an inaccessible directive to the field.
   */
  inaccessible(): this;
  /**
   * Adds a shareable directive to the field.
   */
  shareable(): this;
  /**
   * Adds a override directive to the field.
   */
  override(from: string): this;
  /**
   * Adds a provides directive to the field.
   */
  provides(fields: string): this;
  toString(): string;
}
//# sourceMappingURL=type.d.ts.map
