export declare function localStorageSetKeyValue(key: string, value: any): Promise<void>;
export declare function localStorageSetKeyValueAsString(key: string, value: any): Promise<void>;
export declare function localStorageGetKeyValue(key: string): Promise<any>;
export declare function localStorageGetKeyValueWithoutPromise(key: string): any;
export declare function localStorageKeyExists(key: string): Promise<boolean>;
