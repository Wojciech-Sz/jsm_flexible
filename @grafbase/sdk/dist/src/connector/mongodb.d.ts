import { ModelFields, MongoDBModel } from './mongodb/model';
export interface MongoDBParams {
    url: string;
    apiKey: string;
    dataSource: string;
    database: string;
}
export declare class PartialMongoDBAPI {
    private name;
    private url;
    private apiKey;
    private dataSource;
    private database;
    private models;
    constructor(name: string, params: MongoDBParams);
    /**
     * Creates a new model type with an access to this MongoDB data source.
     *
     * @param name - The name of the model
     * @param fields - The fields of the model
     */
    model(name: string, fields: ModelFields): MongoDBModel;
    finalize(namespace?: boolean): MongoDBAPI;
}
export declare class MongoDBAPI {
    private name;
    private apiKey;
    private url;
    private dataSource;
    private database;
    private namespace?;
    models: MongoDBModel[];
    constructor(name: string, apiKey: string, url: string, dataSource: string, database: string, models: MongoDBModel[], namespace?: boolean);
    toString(): string;
}
//# sourceMappingURL=mongodb.d.ts.map