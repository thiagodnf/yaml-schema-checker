import process from "process";
const core = require("@actions/core");
const wait = require("./wait");

// most @actions toolkit packages have async methods
async function run() {

    try {

        const workspaceRoot = process.env["GITHUB_WORKSPACE"];

        // core.info("testing ");

        core.info("testing", workspaceRoot);
        // core.info("work", workspaceRoot);

        const ms = core.getInput("milliseconds");

        core.info("Testing");

        core.info(`Waiting ${ms} milliseconds ...`);

        core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

        await wait(parseInt(ms));

        core.info((new Date()).toTimeString());

        core.setOutput("time", new Date().toTimeString());

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
