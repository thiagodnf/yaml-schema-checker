import SchemaUtils from "../../src/utils/schema-utils";
import FileUtils from "../../src/utils/file-utils";

test("should be a valid string", async () => {

    const content = FileUtils.getYaml("action.yml");

    await expect(await SchemaUtils.isValid(content)).toBe(1);
});
