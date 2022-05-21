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

test("should throw exception when the parameters are invalid ones", async () => {

    const fakeJsonSchema = {};
    const fakeYaml = {};

    await expect(() => SchemaUtils.validate(null, null)).toThrow(Error);
    await expect(() => SchemaUtils.validate(null, fakeYaml)).toThrow(Error);
    await expect(() => SchemaUtils.validate(fakeJsonSchema, null)).toThrow(Error);

    await expect(() => SchemaUtils.validate(undefined, undefined)).toThrow(Error);
    await expect(() => SchemaUtils.validate(undefined, fakeYaml)).toThrow(Error);
    await expect(() => SchemaUtils.validate(fakeJsonSchema, undefined)).toThrow(Error);
});
