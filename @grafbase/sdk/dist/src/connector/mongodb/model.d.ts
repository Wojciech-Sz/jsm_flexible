import { Model } from '../../model';
import { AuthDefinition } from '../../typedefs/auth';
import { CacheDefinition } from '../../typedefs/cache';
import { DefaultDefinition } from '../../typedefs/default';
import { EnumDefinition } from '../../typedefs/enum';
import { LengthLimitedStringDefinition } from '../../typedefs/length-limited-string';
import { ListDefinition } from '../../typedefs/list';
import { MapDefinition } from '../../typedefs/map';
import { ReferenceDefinition } from '../../typedefs/reference';
import { ResolverDefinition } from '../../typedefs/resolver';
import { ScalarDefinition } from '../../typedefs/scalar';
import { UniqueDefinition } from '../../typedefs/unique';
/**
 * A collection of fields in a model.
 */
export type ModelFields = Record<string, FieldShape>;
/**
 * A combination of classes a field in a model can be.
 */
export type FieldShape = ScalarDefinition | ListDefinition | ReferenceDefinition | UniqueDefinition | DefaultDefinition | LengthLimitedStringDefinition | AuthDefinition | ResolverDefinition | CacheDefinition | MapDefinition | EnumDefinition<any, any>;
export declare class MongoDBModel extends Model {
    connector: string;
    collectionName?: string;
    constructor(name: string, connector: string);
    /**
     * Push a field to the model definition.
     *
     * @param name - The name of the model.
     * @param definition - Fields to be included in the model.
     */
    field(name: string, definition: FieldShape): this;
    /**
     * Set the name of the collection for this model in the database.
     * If not set, the name of the model is used.
     *
     * @param name - The name of the collection.
     */
    collection(name: string): this;
    toString(): string;
}
//# sourceMappingURL=model.d.ts.map