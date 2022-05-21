const core = require("@actions/core");

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

        core.info(`Json Schema: ${jsonSchemaFile}`);
        core.info(`Yaml Files: ${yamlFiles}`);

        const schemaContentAsJson = FileUtils.getContentFromJson(jsonSchemaFile);

        const files = FileUtils.searchFiles(yamlFiles);

        core.info(`Found ${files.length} file(s). Checking them:`);

        let validFiles = [];
        let invalidFiles = [];

        files.forEach(file => {

            const yamlContentAsJson = FileUtils.getContentFromYaml(file);

            const result = SchemaUtils.validate(schemaContentAsJson, yamlContentAsJson);

            if (result.errors.length === 0) {
                core.info(`✅ ${file}`);

                validFiles.push(file);
            } else {
                core.info(`❌ ${file}`);

                invalidFiles.push(file);

                result.errors.forEach(error => {
                    core.info(`    - ${error.stack}`);
                });
            }
        });

        core.info("Done");

        core.setOutput("validFiles", validFiles.join(","));
        core.setOutput("invalidFiles", invalidFiles.join(","));

        if (invalidFiles.length !== 0) {
            throw new Error(`It was found ${invalidFiles.length} invalid file(s)`);
        }

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
