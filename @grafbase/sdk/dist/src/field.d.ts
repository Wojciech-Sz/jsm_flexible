import { FieldShape as MongoFieldShape } from './connector/mongodb/model';
import { DeprecatedDefinition } from './typedefs/deprecated';
import { InaccessibleDefinition } from './typedefs/inaccessible';
import { JoinDefinition } from './typedefs/join';
import { OverrideDefinition } from './typedefs/override';
import { ProvidesDefinition } from './typedefs/provides';
import { ShareableDefinition } from './typedefs/shareable';
import { TagDefinition } from './typedefs/tag';
type FieldShape = MongoFieldShape | JoinDefinition | TagDefinition | InaccessibleDefinition | ShareableDefinition | OverrideDefinition | ProvidesDefinition | DeprecatedDefinition;
export declare class Field {
    private _name;
    private shape;
    constructor(name: string, shape: FieldShape);
    get name(): string;
    toString(): string;
}
export {};
//# sourceMappingURL=field.d.ts.map