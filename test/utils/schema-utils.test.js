import SchemaUtils from "../../src/utils/schema-utils";
import StringUtils from "../../src/utils/string-utils";

test("should be a valid yml", async () => {

    const jsonSchema = {
        type: "object",
        properties: {
            bar: {
                type: "number",
            },
            foo: {
                type: "string"
            }
        },
    };

    const content = `
        bar: 122
        foo: test
    `;

    const contentAsJson = StringUtils.parseYaml("fake.yml", content);

    await expect((SchemaUtils.validate(jsonSchema, contentAsJson)).errors.length).toBe(0);
});

test("should be a invalid yml", async () => {

    const jsonSchema = {
        type: "object",
        properties: {
            analytics: {
                type: "boolean",
            },
        },
    };

    const content = "analytics: 122";

    const contentAsJson = StringUtils.parseYaml("fake.yml", content);

    await expect((SchemaUtils.validate(jsonSchema, contentAsJson)).errors.length).toBe(1);
});
