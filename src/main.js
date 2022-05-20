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

        core.info("Analyzing files:");

        const files = FileUtils.searchFiles(yamlFiles);

        let numberOfInvalidFiles = 0;

        files.forEach(file => {

            const yamlContentAsJson = FileUtils.getContentFromYaml(file);

            const result = SchemaUtils.validate(schemaContentAsJson, yamlContentAsJson);

            if (result.errors.length === 0) {
                core.info(`✅ ${file}`);
            } else {
                core.info(`❌ ${file}`);

                numberOfInvalidFiles++;

                result.errors.forEach(error => {
                    core.info(`  - ${error.stack}`);
                });
            }
        });

        core.info("Done");

        if (numberOfInvalidFiles !== 0) {
            throw new Error(`It was found ${numberOfInvalidFiles} invalid files`);
        }

        core.setOutput("numberOfInvalidFiles", numberOfInvalidFiles);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
