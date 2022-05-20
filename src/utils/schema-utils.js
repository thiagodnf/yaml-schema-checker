
import { SettingsState } from "yaml-language-server/lib/umd/yamlSettings";
import { createConnection } from "vscode-languageserver/lib/node/main";
import { schemaRequestHandler } from "yaml-language-server/lib/umd/languageservice/services/schemaRequestHandler";
import { workspaceContext } from "yaml-language-server/lib/umd/languageservice/services/schemaRequestHandler";
import { Telemetry } from "yaml-language-server/lib/umd/languageserver/telemetry";
import { YAMLServerInit } from "yaml-language-server/lib/umd/yamlServerInit";
import { ClientCapabilities } from "vscode-json-languageservice";

import StringUtils from "./string-utils";

class SchemaUtils {

    static setupLanguageService(languageSettings) {

        const yamlSettings = new SettingsState();

        process.argv.push("--node-ipc");

        const connection = createConnection();

        const schemaRequestHandlerWrapper = (connection, uri) => {
            return schemaRequestHandler(connection, uri, yamlSettings.workspaceFolders, yamlSettings.workspaceRoot, yamlSettings.useVSCodeContentRequest, exports.testFileSystem);
        };

        const schemaRequestService = schemaRequestHandlerWrapper.bind(this, connection);

        const telemetry = new Telemetry(connection);
        const serverInit = new YAMLServerInit(connection, yamlSettings, workspaceContext, schemaRequestService, telemetry);

        serverInit.connectionInitialized({
            processId: null,
            capabilities: ClientCapabilities.LATEST,
            rootUri: null,
            workspaceFolders: null,
        });

        const languageService = serverInit.languageService;
        const validationHandler = serverInit.validationHandler;
        const languageHandler = serverInit.languageHandler;

        languageService.configure(languageSettings);

        return {
            languageService,
            validationHandler,
            languageHandler,
            yamlSettings,
            telemetry,
        };
    }

    static async validate(SCHEMA_ID, jsonSchema, yamlContent) {

        let languageSettings = {
            validate: true,
            hover: false,
            completion: true,
            format: false,
            isKubernetes: false,
            schemas: [],
            customTags: [],
            indentation: undefined,
            yamlVersion: "1.2",
        };

        const { languageService: langService, validationHandler: valHandler } = SchemaUtils.setupLanguageService(languageSettings);

        langService.deleteSchema(SCHEMA_ID);
        langService.addSchema(SCHEMA_ID, jsonSchema);

        const testTextDocument = StringUtils.parseYaml(SCHEMA_ID, yamlContent);

       return await valHandler.validateTextDocument(testTextDocument);
    }
}

export default SchemaUtils;
