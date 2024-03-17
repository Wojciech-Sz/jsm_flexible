import { Header, HeaderGenerator } from './header';
import { SchemaTransform, TransformsGenerator } from './transforms';
export interface GraphQLParams {
    url: string;
    headers?: HeaderGenerator;
    transforms?: TransformsGenerator;
}
export declare class PartialGraphQLAPI {
    private name;
    private apiUrl;
    private headers;
    private introspectionHeaders;
    private transforms;
    constructor(name: string, params: GraphQLParams);
    finalize(namespace?: boolean): GraphQLAPI;
}
export declare class GraphQLAPI {
    private name;
    private namespace?;
    private url;
    private headers;
    private introspectionHeaders;
    private transforms;
    constructor(name: string, url: string, headers: Header[], introspectionHeaders: Header[], transforms: SchemaTransform[], namespace?: boolean);
    toString(): string;
}
//# sourceMappingURL=graphql.d.ts.map