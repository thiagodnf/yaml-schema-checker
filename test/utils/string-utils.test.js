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

test("should throw exception when json content is blank", async () => {

    await expect(() => StringUtils.parseJSON("")).toThrow(Error);
    await expect(() => StringUtils.parseJSON("  ")).toThrow(Error);
});

// test('wait 500 ms', async () => {
//     const start = new Date();
//     await wait(500);
//     const end = new Date();
//     var delta = Math.abs(end - start);
//     expect(delta).toBeGreaterThanOrEqual(500);
// });

// // shows how the runner will run a javascript action with env / stdout protocol
// test('test runs', () => {
//     process.env['INPUT_MILLISECONDS'] = 100;
//     const ip = path.join(__dirname, '../src/main.js');
//     const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();
//     console.log(result);
// })
