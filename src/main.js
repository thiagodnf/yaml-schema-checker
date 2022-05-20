const core = require("@actions/core");
const wait = require("./wait");

import FileUtils from "./utils/file-utils";
import StringUtils from "./utils/string-utils";
import SchemaUtils from "./utils/schema-utils";

async function run() {

    try {

        if (FileUtils.isWorkspaceEmpty()) {
            throw new Error("Workspace is empty. Did you forget to run \"actions/checkout\" before running this Github Action?");
        }

        const jsonSchemaFile = core.getInput("jsonSchemaFile");
        const yamlFiles = core.getInput("yamlFiles");

        if (StringUtils.isBlank(jsonSchemaFile)) {
            throw new Error("The 'jsonSchemaFile' parameter should not be blank");
        }

        if (!FileUtils.exists(jsonSchemaFile)) {
            throw new Error(`${jsonSchemaFile} could not be found in workspace`);
        }

        if (StringUtils.isBlank(yamlFiles)) {
            throw new Error("The 'yamlFiles' parameter should not be blank");
        }

        const jsonSchema = StringUtils.parseJSON("oi", FileUtils.getContent(jsonSchemaFile));
        const yamlContent = FileUtils.getContent(yamlFiles);

        core.info(jsonSchema);
        core.info(yamlContent);

        core.info("Analyzing files:");

        const files = FileUtils.searchFiles(yamlFiles);

        core.info(files);

        SchemaUtils.validate("teste", jsonSchema, yamlContent);

        let numberOfInvalidFiles = 0;

        // files.forEach(file => {

        //     if (SchemaUtils.isValid(jsonSchemaFile, file)) {
        //         core.info(`✅ ${file}`);
        //     } else {
        //         numberOfInvalidFiles++;
        //         core.info(`❌ ${file}`);
        //     }
        // });

        if (numberOfInvalidFiles !== 0) {
            throw new Error(`It was found ${numberOfInvalidFiles} invalid files`);
        }

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
