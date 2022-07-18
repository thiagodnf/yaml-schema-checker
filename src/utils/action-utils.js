const core = require("@actions/core");

class ActionUtils {

    static getInputAsArray(name, options) {

        return core
            .getInput(name, options)
            .split("\n")
            .map(s => s.trim())
            .filter(x => x !== "");
    }
}

module.exports = ActionUtils;
