import StringUtils from "../../src/utils/string-utils";

test("should be a valid string", async () => {

    expect(StringUtils.isString("")).toBe(true);
    expect(StringUtils.isString(" ")).toBe(true);
    expect(StringUtils.isString("   ")).toBe(true);
    expect(StringUtils.isString(" a")).toBe(true);
    expect(StringUtils.isString("a")).toBe(true);

    expect(StringUtils.isString(2)).toBe(false);
    expect(StringUtils.isString(2.3)).toBe(false);
    expect(StringUtils.isString(true)).toBe(false);
    expect(StringUtils.isString({})).toBe(false);
});

test("should be a blank string", async () => {

    expect(StringUtils.isBlank("")).toBe(true);
    expect(StringUtils.isBlank(" ")).toBe(true);
    expect(StringUtils.isBlank("   ")).toBe(true);
    expect(StringUtils.isBlank()).toBe(true);
    expect(StringUtils.isBlank(null)).toBe(true);
    expect(StringUtils.isBlank(undefined)).toBe(true);
    expect(StringUtils.isBlank("\t\t\t    ")).toBe(true);
    expect(StringUtils.isBlank("\n\n ")).toBe(true);

    expect(StringUtils.isBlank("a")).toBe(false);
    expect(StringUtils.isBlank("a ")).toBe(false);
    expect(StringUtils.isBlank(" a")).toBe(false);
    expect(StringUtils.isBlank(2)).toBe(false);
    expect(StringUtils.isBlank(2.3)).toBe(false);
    expect(StringUtils.isBlank(true)).toBe(false);
    expect(StringUtils.isBlank({})).toBe(false);
});

test("should return a valid json object from json content", async () => {

    expect(StringUtils.parseJson("fake.json", "{}")).toStrictEqual({});
    expect(StringUtils.parseJson("fake.json", "{\"one\": 1, \"two\": 2}")).toEqual({one: 1, two: 2});

    expect(() => StringUtils.parseJson("fake.json", "")).toThrow(Error);
    expect(() => StringUtils.parseJson("fake.json", "  ")).toThrow(Error);
    expect(() => StringUtils.parseJson("fake.json", "{one: 1, two: 2}")).toThrow(Error);
});

test("should return a valid yaml object from json content", async () => {

    expect(StringUtils.parseYaml("fake.yaml", "foo: bar")).toStrictEqual({"foo": "bar"});

    expect(() => StringUtils.parseYaml("fake.yaml", "")).toThrow(Error);
    expect(() => StringUtils.parseYaml("fake.yaml", "  ")).toThrow(Error);
});
