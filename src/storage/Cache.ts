"use strict";

class Cache {
  private cache: { [key: string]: any };

  constructor() {
    this.cache = {};
  }

  public SetKeyValue(
    key: string,
    value: any,
    callback: (error: Error | null) => void
  ): void {
    if (!key || !value) {
      return callback(new Error("Invalid key or value"));
    }
    this.cache[key] = value;
    callback(null);
  }

  public GetKeyValue(
    key: string,
    callback: (error: Error | null, value: any) => void
  ): void {
    try {
      const value = this.cache[key] !== undefined ? this.cache[key] : null;
      callback(null, value);
    } catch (err) {
      callback(err as Error | null, null);
    }
  }
}

export default Cache;
