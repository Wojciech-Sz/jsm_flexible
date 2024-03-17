import { Header, HeaderGenerator } from './header';
import { OpenApiQueryNamingStrategy, OpenApiTransform, OpenApiTransformsGenerator } from './openapi/transforms';
/**
 * @deprecated Use the function form of transforms instead
 */
export interface OpenApiTransformParams {
    queryNaming: OpenApiQueryNamingStrategy;
}
export interface OpenAPIParams {
    schema: string;
    url?: string;
    transforms?: OpenApiTransformParams | OpenApiTransformsGenerator;
    headers?: HeaderGenerator;
}
export declare class PartialOpenAPI {
    private name;
    private schema;
    private apiUrl?;
    private transforms;
    private headers;
    private introspectionHeaders;
    constructor(name: string, params: OpenAPIParams);
    finalize(namespace?: boolean): OpenAPI;
}
export declare class OpenAPI {
    private name;
    private namespace?;
    private schema;
    private apiUrl?;
    private transforms;
    private headers;
    private introspectionHeaders;
    constructor(name: string, schema: string, headers: Header[], introspectionHeaders: Header[], transforms: OpenApiTransform[], url?: string, namespace?: boolean);
    toString(): string;
}
//# sourceMappingURL=openapi.d.ts.map