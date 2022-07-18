// import ActionUtils from "../../src/utils/action-utils";

const ActionUtils = require("../../src/utils/action-utils");

function getInputName(name) {
    return `INPUT_${name.replace(/ /g, "_").toUpperCase()}`;
}

export function setInput(name, value) {
    process.env[getInputName(name)] = value;
}

test("should return a input trimmed", async () => {

    setInput("jsonSchemaFile", " fake_file.xml ");

    await expect(ActionUtils.getInput("jsonSchemaFile", { required: true })).toBe("fake_file.xml");
});


test("should return a list of inputs", async () => {

    setInput("jsonSchemaFile", `
        a
        b
        c
    `);

    const output = ActionUtils.getInputAsArray("jsonSchemaFile", { required: true });

    await expect(output).toEqual(["a", "b", "c"]);
});
