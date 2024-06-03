export declare function localStorageSetKeyValue(key: string, value: any, encryptKey: string): Promise<void>;
export declare function localStorageSetKeyValueAsString(key: string, value: any, encryptKey: string): Promise<void>;
export declare function localStorageGetKeyValue(key: string, encryptKey: string): Promise<any>;
export declare function localStorageGetKeyValueWithoutPromise(key: string, encryptKey: string): any;
export declare function localStorageKeyExists(key: string): Promise<boolean>;
