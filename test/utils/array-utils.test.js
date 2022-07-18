const ArrayUtils = require("../../src/utils/array-utils");

test("should split the string correctly", async () => {

    await expect(ArrayUtils.splitFromString("")).toEqual([]);
    await expect(ArrayUtils.splitFromString("a")).toEqual(["a"]);
    await expect(ArrayUtils.splitFromString("a,,c")).toEqual(["a", "c"]);
    await expect(ArrayUtils.splitFromString("a,b,c")).toEqual(["a", "b", "c"]);
});

test("should split the array correctly", async () => {

    await expect(ArrayUtils.split(["a,b", "c"])).toEqual(["a", "b", "c"]);
    await expect(ArrayUtils.split(["a,b", "", "d"])).toEqual(["a", "b", "d"]);
});
