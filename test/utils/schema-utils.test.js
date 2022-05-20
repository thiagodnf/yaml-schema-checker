import SchemaUtils from "../../src/utils/schema-utils";

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

    await expect((await SchemaUtils.validate( "defaut-1.yaml", jsonSchema, content)).errors.length).toBe(0);
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

    await expect((await SchemaUtils.validate("defaut-2.yaml", jsonSchema, content)).errors.length).toBe(1);
});
