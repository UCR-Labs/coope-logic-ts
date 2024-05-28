import { expect } from "chai";
import Cache from "../../src/storage/Cache";

describe("Cache", function () {
  let cache: Cache;

  beforeEach(function () {
    cache = new Cache();
  });

  describe("SetKeyValue", function () {
    it("should save a key-value pair", function (done) {
      cache.SetKeyValue("key1", "value1", (err) => {
        expect(err).to.be.null;
        expect(cache["cache"]["key1"]).to.equal("value1");
        done();
      });
    });

    it("should return an error for invalid key or value", function (done) {
      cache.SetKeyValue("", "value1", (err) => {
        expect(err).to.be.an.instanceOf(Error);
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
        expect(err).to.be.null;
        expect(value).to.equal("value1");
        done();
      });
    });

    it("should return null for a non-existing key", function (done) {
      cache.GetKeyValue("nonExistingKey", (err, value) => {
        expect(err).to.be.null;
        expect(value).to.be.null;
        done();
      });
    });
  });
});
