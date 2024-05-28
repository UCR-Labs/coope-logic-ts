import { expect } from "chai";
import Cache from "../../src/storage/Cache";

describe("Cache", function () {
  let cache: Cache;

  beforeEach(function () {
    cache = new Cache();
  });

  describe("SetKeyValue", function () {
    it("should save a key-value pair", async function () {
      await cache.SetKeyValue("key1", "value1");
      expect(cache["cache"]["key1"]).to.equal("value1");
    });

    it("should return an error for invalid key or value", async function () {
      try {
        await cache.SetKeyValue("", "value1");
      } catch (err) {
        expect(err).to.be.an.instanceOf(Error);
      }
    });
  });

  describe("GetKeyValue", function () {
    beforeEach(async function () {
      await cache.SetKeyValue("key1", "value1");
    });

    it("should retrieve the value for an existing key", async function () {
      const value = await cache.GetKeyValue("key1");
      expect(value).to.equal("value1");
    });

    it("should return null for a non-existing key", async function () {
      const value = await cache.GetKeyValue("nonExistingKey");
      expect(value).to.be.null;
    });
  });
});
