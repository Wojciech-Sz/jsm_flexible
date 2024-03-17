import { AuthDefinition } from './auth';
import { CacheDefinition } from './cache';
import { DefaultDefinition } from './default';
import { EnumDefinition } from './enum';
import { LengthLimitedStringDefinition } from './length-limited-string';
import { ListDefinition } from './list';
import { ReferenceDefinition } from './reference';
import { ScalarDefinition } from './scalar';
import { UniqueDefinition } from './unique';
export type Mappable = ScalarDefinition | DefaultDefinition | ReferenceDefinition | UniqueDefinition | LengthLimitedStringDefinition | AuthDefinition | CacheDefinition | ListDefinition | EnumDefinition<any, any>;
export declare class MapDefinition {
    private field;
    private mappedName;
    constructor(field: Mappable, mappedName: string);
    toString(): string;
}
//# sourceMappingURL=map.d.ts.map