"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Cache_1 = __importDefault(require("../../src/storage/Cache"));
describe("Cache", function () {
    let cache;
    beforeEach(function () {
        cache = new Cache_1.default();
    });
    describe("SetKeyValue", function () {
        it("should save a key-value pair", function (done) {
            cache.SetKeyValue("key1", "value1", (err) => {
                (0, chai_1.expect)(err).to.be.null;
                (0, chai_1.expect)(cache["cache"]["key1"]).to.equal("value1");
                done();
            });
        });
        it("should return an error for invalid key or value", function (done) {
            cache.SetKeyValue("", "value1", (err) => {
                (0, chai_1.expect)(err).to.be.an.instanceOf(Error);
                done();
            });
        });
    });
    describe("GetKeyValue", function () {
        beforeEach(function () {
            cache["cache"]["key1"] = "value1";
        });
        it("should retrieve the value for an existing key", function (done) {
            cache.GetKeyValue("key1", (err, value) => {
                (0, chai_1.expect)(err).to.be.null;
                (0, chai_1.expect)(value).to.equal("value1");
                done();
            });
        });
        it("should return null for a non-existing key", function (done) {
            cache.GetKeyValue("nonExistingKey", (err, value) => {
                (0, chai_1.expect)(err).to.be.null;
                (0, chai_1.expect)(value).to.be.null;
                done();
            });
        });
    });
});
//# sourceMappingURL=Cache.test.js.map