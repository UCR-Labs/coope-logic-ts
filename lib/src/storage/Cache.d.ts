export declare class Cache {
    private cache;
    constructor();
    SetKeyValue(key: string, value: any): Promise<void>;
    GetKeyValue(key: string): Promise<any>;
}
