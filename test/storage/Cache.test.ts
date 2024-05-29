import { expect } from "chai";
import { Cache } from "../../src/storage/Cache"; // Import Cache class by its name

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
        // If no error is thrown, fail the test
        throw new Error("Invalid key or value did not throw an error");
      } catch (err: any) {
        // Asserting err as any for flexibility
        // Expecting an error of type Error
        expect(err).to.be.an.instanceOf(Error);
        // Additionally, you might want to assert the error message
        expect((err as Error).message).to.equal("Invalid key or value");
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
