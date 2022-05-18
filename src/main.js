const core = require("@actions/core");
const wait = require("./wait");

import FileUtils from "./utils/file-utils";
import StringUtils from "./utils/string-utils";

async function run() {

    try {

        if (FileUtils.isWorkspaceEmpty()) {
            throw new Error("Workspace is empty. Did you forget to run \"actions/checkout\" before running this Github Action?");
        }

        const jsonSchemaFile = core.getInput("jsonSchemaFile");
        const yamlFiles = core.getInput("yamlFiles");

        core.info(jsonSchemaFile);
        core.info(yamlFiles);

        // const a = StringUtils.parseJSON(jsonSchemas);





        // core.info(a);


        // core.info(FileUtils.getContent(settingsFile));


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
