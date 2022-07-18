const core = require("@actions/core");

const FileUtils = require("./utils/file-utils");
const StringUtils = require("./utils/string-utils");
const SchemaUtils = require("./utils/schema-utils");
const ActionUtils = require("./utils/action-utils");

async function run() {

    try {

        if (FileUtils.isWorkspaceEmpty()) {
            throw new Error("Workspace is empty. Did you forget to run \"actions/checkout\" before running this Github Action?");
        }

        const jsonSchemaFile = ActionUtils.getInput("jsonSchemaFile", { required: true });
        const yamlFiles = ActionUtils.getInputAsArray("yamlFiles", { required: true });
        const filesSeparator = ActionUtils.getInput("filesSeparator", { required: false });

        if (StringUtils.isBlank(jsonSchemaFile)) {
            throw new Error("The 'jsonSchemaFile' parameter should not be blank");
        }

        if (!FileUtils.exists(jsonSchemaFile)) {
            throw new Error(`${jsonSchemaFile} could not be found in workspace`);
        }

        if (StringUtils.isBlank(yamlFiles)) {
            throw new Error("The 'yamlFiles' parameter should not be blank");
        }

        core.info("Inputs:");
        core.info(`  Json Schema: ${jsonSchemaFile}`);
        core.info(`  Files Separator: ${filesSeparator}`);
        core.info(`  Yaml Files: ${yamlFiles}`);

        const schemaContentAsJson = FileUtils.getContentFromJson(jsonSchemaFile);

        const files = new Set();

        core.debug("Loading all files");

        yamlFiles.forEach(yamlFile => {

            core.debug(`Processing input: ${yamlFile}`);

            FileUtils.searchFiles(yamlFile).forEach(file => {

                core.debug(`Adding file: ${file}`);

                files.add(file);
            });
        });

        core.info(`Found ${files.size} file(s). Checking them:`);

        let validFiles = [];
        let invalidFiles = [];

        files.forEach(file => {

            core.debug(`Processing: ${file}`);

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
        core.info("Done. All files checked");

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
