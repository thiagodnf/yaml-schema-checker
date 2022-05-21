import StringUtils from "../../src/utils/string-utils";

test("should be a valid string", async () => {

    await expect(StringUtils.isString("")).toBe(true);
    await expect(StringUtils.isString(" ")).toBe(true);
    await expect(StringUtils.isString("   ")).toBe(true);
    await expect(StringUtils.isString(" a")).toBe(true);
    await expect(StringUtils.isString("a")).toBe(true);

    await expect(StringUtils.isString(2)).toBe(false);
    await expect(StringUtils.isString(2.3)).toBe(false);
    await expect(StringUtils.isString(true)).toBe(false);
    await expect(StringUtils.isString({})).toBe(false);
});

test("should be a blank string", async () => {

    await expect(StringUtils.isBlank("")).toBe(true);
    await expect(StringUtils.isBlank(" ")).toBe(true);
    await expect(StringUtils.isBlank("   ")).toBe(true);
    await expect(StringUtils.isBlank()).toBe(true);
    await expect(StringUtils.isBlank(null)).toBe(true);
    await expect(StringUtils.isBlank(undefined)).toBe(true);

    await expect(StringUtils.isBlank("a")).toBe(false);
    await expect(StringUtils.isBlank("a ")).toBe(false);
    await expect(StringUtils.isBlank(" a")).toBe(false);
    await expect(StringUtils.isBlank(2)).toBe(false);
    await expect(StringUtils.isBlank(2.3)).toBe(false);
    await expect(StringUtils.isBlank(true)).toBe(false);
    await expect(StringUtils.isBlank({})).toBe(false);
});

test("should return a valid json object from json content", async () => {

    await expect(StringUtils.parseJson("fake.json", "{}")).toEqual(2);
    await expect(StringUtils.parseJson("fake.json", "{\"one\": 1, \"two\": 2}")).toEqual({one: 1, two: 2});

    await expect(() => StringUtils.parseJson("fake.json", "")).toThrow(Error);
    await expect(() => StringUtils.parseJson("fake.json", "  ")).toThrow(Error);
    await expect(() => StringUtils.parseJson("fake.json", "{one: 1, two: 2}")).toThrow(Error);
});

test("should return a valid yaml object from json content", async () => {

    await expect(StringUtils.parseYaml("fake.yaml", "foo:bar")).not.toBe(null);

    await expect(() => StringUtils.parseYaml("fake.yaml", "")).toThrow(Error);
    await expect(() => StringUtils.parseYaml("fake.yaml", "  ")).toThrow(Error);
});
