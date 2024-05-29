"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Cache_1 = require("../../src/storage/Cache"); // Import Cache class by its name
describe("Cache", function () {
    let cache;
    beforeEach(function () {
        cache = new Cache_1.Cache();
    });
    describe("SetKeyValue", function () {
        it("should save a key-value pair", function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield cache.SetKeyValue("key1", "value1");
                (0, chai_1.expect)(cache["cache"]["key1"]).to.equal("value1");
            });
        });
        it("should return an error for invalid key or value", function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield cache.SetKeyValue("", "value1");
                    // If no error is thrown, fail the test
                    throw new Error("Invalid key or value did not throw an error");
                }
                catch (err) {
                    // Expecting an error of type Error
                    (0, chai_1.expect)(err).to.be.an.instanceOf(Error);
                    // Additionally, you might want to assert the error message
                    (0, chai_1.expect)(err.message).to.equal("Invalid key or value");
                }
            });
        });
    });
    describe("GetKeyValue", function () {
        beforeEach(function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield cache.SetKeyValue("key1", "value1");
            });
        });
        it("should retrieve the value for an existing key", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const value = yield cache.GetKeyValue("key1");
                (0, chai_1.expect)(value).to.equal("value1");
            });
        });
        it("should return null for a non-existing key", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const value = yield cache.GetKeyValue("nonExistingKey");
                (0, chai_1.expect)(value).to.be.null;
            });
        });
    });
});
//# sourceMappingURL=Cache.test.js.map