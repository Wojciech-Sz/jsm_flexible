import { Enum, EnumShape } from "./enum";
import { Type, TypeExtension, TypeFields } from "./type";
import { ReferenceDefinition } from "./typedefs/reference";
import { Union } from "./union";
import { Interface, InterfaceFields } from "./interface";
import { Query, QueryInput } from "./query";
import {
  OpenAPI,
  PartialOpenAPI,
} from "./connector/openapi";
import {
  GraphQLAPI,
  PartialGraphQLAPI,
} from "./connector/graphql";
import {
  BigIntDefinition,
  BooleanDefinition,
  BytesDefinition,
  DateDefinition,
  NumberDefinition,
  ObjectDefinition,
  StringDefinition,
} from "./typedefs/scalar";
import { EnumDefinition } from "./typedefs/enum";
import { Input, InputFields } from "./input_type";
import { InputDefinition } from "./typedefs/input";
import {
  MongoDBAPI,
  PartialMongoDBAPI,
} from "./connector/mongodb";
import {
  PostgresAPI,
  PartialPostgresAPI,
} from "./connector/postgres";
import { FederatedGraphHeaders } from "./federated/headers";
import { CacheParams } from "./cache";
import { FederatedGraphSubscriptions } from "./federated/subscriptions";
export type PartialDatasource =
  | PartialOpenAPI
  | PartialGraphQLAPI
  | PartialMongoDBAPI
  | PartialPostgresAPI;
export type Datasource =
  | OpenAPI
  | GraphQLAPI
  | MongoDBAPI
  | PostgresAPI;
export declare class Datasources {
  inner: Datasource[];
  constructor();
  push(datasource: Datasource): void;
  toString(): string;
}
export interface IntrospectParams {
  namespace?: boolean;
}
export declare class Graph {
  private enums;
  private types;
  private unions;
  private models;
  private interfaces;
  private queries?;
  private mutations?;
  private datasources;
  private extendedTypes;
  private inputs;
  private subgraph;
  constructor(subgraph: boolean);
  /**
   * Add a new datasource to the schema.
   *
   * @param datasource - The datasource to add.
   * @param params - The introspection parameters.
   */
  datasource(
    datasource: PartialDatasource,
    params?: IntrospectParams
  ): void;
  /**
   * Add an existing item or items to the schema.
   *
   * @param items - The items to add
   */
  add(
    ...items: Array<
      | Type
      | Enum<any, any>
      | Union
      | Interface
      | Input
      | Query
    >
  ): void;
  /**
   * Add a new composite type to the schema.
   *
   * @param name - The name of the type.
   * @param fields - The fields to be included.
   */
  type(name: string, fields: TypeFields): Type;
  /**
   * Add an existing type to the schema.
   *
   * @param type - The type to add
   */
  private addType;
  /**
   * Add a new interface to the schema.
   *
   * @param name - The name of the interface.
   * @param fields - The fields to be included.
   */
  interface(
    name: string,
    fields: InterfaceFields
  ): Interface;
  /**
   * Add an existing interface to the schema.
   *
   * @param iface - The interface to add
   */
  private addInterface;
  /**
   * Add a new union to the schema.
   *
   * @param name - The name of the union.
   * @param types - The types to be included.
   */
  union(name: string, types: Record<string, Type>): Union;
  /**
   * Add an existing union to the schema.
   *
   * @param union - The union to add
   */
  private addUnion;
  /**
   * Add a new query to the schema.
   *
   * @param name - The name of the query.
   * @param definition - The query definition.
   */
  query(name: string, definition: QueryInput): Query;
  /**
   * Add an existing query to the schema.
   *
   * @param query - The query to add
   */
  private addQuery;
  /**
   * Add a new mutation to the schema.
   *
   * @param name - The name of the mutation.
   * @param fields - The mutation definition.
   */
  mutation(name: string, definition: QueryInput): Query;
  /**
   * Add an existing mutation to the schema.
   *
   * @param mutation - The mutation to add
   */
  private addMutation;
  /**
   * Add a new input to the schema.
   *
   * @param name = The name of the input.
   * @param fields = The input definition.
   */
  input(name: string, definition: InputFields): Input;
  /**
   * Add an existing input to the schema.
   *
   * @param input - The input to add
   */
  private addInput;
  /**
   * Add a new enum to the schema.
   *
   * @param name - The name of the enum.
   * @param variants - A list of variants of the enum.
   */
  enum<T extends string, U extends EnumShape<T>>(
    name: string,
    variants: U
  ): Enum<T, U>;
  /**
   * Add an existing enum to the schema.
   *
   * @param definition - The enum to add
   */
  private addEnum;
  /**
   * Create a new string field.
   */
  string(): StringDefinition;
  /**
   * Create a new ID field.
   */
  id(): StringDefinition;
  /**
   * Create a new email field.
   */
  email(): StringDefinition;
  /**
   * Create a new int field.
   */
  int(): NumberDefinition;
  /**
   * Create a new float field.
   */
  float(): NumberDefinition;
  /**
   * Create a new boolean field.
   */
  boolean(): BooleanDefinition;
  /**
   * Create a new date field.
   */
  date(): DateDefinition;
  /**
   * Create a new datetime field.
   */
  datetime(): DateDefinition;
  /**
   * Create a new IP address field.
   */
  ipAddress(): StringDefinition;
  /**
   * Create a new timestamp field.
   */
  timestamp(): NumberDefinition;
  /**
   * Create a new URL field.
   */
  url(): StringDefinition;
  /**
   * Create a new JSON field.
   */
  json(): ObjectDefinition;
  /**
   * Create a new phone number field.
   */
  phoneNumber(): StringDefinition;
  /**
   * Create a new decimal field.
   */
  decimal(): StringDefinition;
  /**
   * Create a new bytes field.
   */
  bytes(): BytesDefinition;
  /**
   * Create a new bigint field.
   */
  bigint(): BigIntDefinition;
  /**
   * Create a new reference field, referencing a type.
   *
   * @param type - A type to be referred.
   */
  ref(type: Type | string | Function): ReferenceDefinition;
  /**
   * Create a new enum field.
   *
   * @param e - An enum to be referred.
   */
  enumRef<T extends string, U extends EnumShape<T>>(
    e: Enum<T, U>
  ): EnumDefinition<T, U>;
  /**
   * Create a new field from an input object reference.
   *
   * @param input - The input object reference.
   */
  inputRef(input: Input): InputDefinition;
  /**
   * Extends an existing type with the given queries.
   *
   * @param type - Either a type if the given type is directly in the schema,
   *               or a string if extending an external type introspected from an
   *               external datasource.
   * @param definition - A collection of fields to be added to the extension
   *                     or a builder function if extending with directives
   */
  extend(
    type: string | Type,
    definitionOrBuilder:
      | Record<string, QueryInput>
      | DirectiveExtendFn
  ): void;
  /**
   * Returns the environment variable with the given variableName.
   * Throws, if the variable is not set.
   *
   * @param variableName - The name of the environment variable.
   */
  env(variableName: string): string;
  /**
   * Empty the schema.
   */
  clear(): void;
  toString(): string;
}
export interface FederatedGraphInput {
  headers?: (headers: FederatedGraphHeaders) => void;
  subscriptions?: (
    subscriptions: FederatedGraphSubscriptions
  ) => void;
  cache?: CacheParams;
}
export declare class FederatedGraph {
  private readonly headers;
  private readonly subscriptions;
  private readonly cache?;
  constructor(input?: FederatedGraphInput);
  toString(): string;
}
export type DirectiveExtendFn = (
  extend: TypeExtension
) => void;
//# sourceMappingURL=grafbase-schema.d.ts.map
