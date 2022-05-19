
import { SettingsState } from "yaml-language-server/lib/umd/yamlSettings";
import { createConnection } from "vscode-languageserver/lib/node/main";
import { schemaRequestHandler } from "yaml-language-server/lib/umd/languageservice/services/schemaRequestHandler";
import { workspaceContext } from "yaml-language-server/lib/umd/languageservice/services/schemaRequestHandler";
import { Telemetry } from "yaml-language-server/lib/umd/languageserver/telemetry";
import { YAMLServerInit } from "yaml-language-server/lib/umd/yamlServerInit";
import { ClientCapabilities } from "vscode-json-languageservice";

// import a from "yaml-language-server/"
import { YAMLValidation } from "yaml-language-server/lib/umd/languageservice/services/yamlValidation";
import { YAMLSchemaService } from "yaml-language-server/lib/umd/languageservice/services/yamlSchemaService";
import fs from "fs";
import FileUtils from "./file-utils";
import { URI } from "vscode-uri";

import { ErrorCode, getLanguageService } from "vscode-json-languageservice";

exports.testFileSystem = "default_schema_id.yaml";

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


    // static setupLanguageService()

    // static parseSetup(content, customSchemaID) {

    //     const testTextDocument = setupSchemaIDTextDocument(content, customSchemaID);

    //     yamlSettings.documents = new TextDocumentTestManager();
    //     (yamlSettings.documents as TextDocumentTestManager).set(testTextDocument);
    //     return validationHandler.validateTextDocument(testTextDocument);
    // }

    static async isValid(content) {

        SchemaUtils.setupLanguageService();

        // const settings = {
        //     validate: true, // Turn on validation, turn off everything else
        //     hover: false,
        //     completion: false,
        //     format: false,
        //     isKubernetes: false,
        //     schemas: [{
        //         // settings.uri,
        //         // settings.fileMatch,
        //         // settings.schema,
        //         // settings.name,
        //         // settings.description}
        //     }],
        //     customTags: [],
        //     yamlVersion: 1.2
        // };

        // const requestService = function(uri){
        //     console.log("hahahahahahahahahaaha");
        //     return new Promise((c, e) => {

        //         const scheme = URI.parse("deadlines.schema.json").scheme.toLowerCase();


        //         c(FileUtils.getContent("deadlines.schema.json"));

        //         // fs.readFile("deadlines.schema.json", { encoding: 'utf-8'}, (err, result) =>
        //         //     // If there was an error reading the file, return empty error message
        //         //     // Otherwise return the file contents as a string
        //         //     err ? e('') : c(result.toString())
        //         // );
        //     });
        // };

        // const contextService = {
        //     resolveRelativePath: (relativePath, resource) => {

        //         console.log("jose!");

        //         return URL.resolve(resource, relativePath);
        //     }
        // };

        // const a = {
        //     sendError: (b, c) => {
        //         console.log(b, c);
        //     }
        // };

        // const yamlSchemaService = new YAMLSchemaService(requestService, contextService);
        // const yamlValidation = new YAMLValidation(yamlSchemaService, a);


        // yamlSchemaService.clearExternalSchemas();

        // // if (settings.schemas) {
        // //     yamlSchemaService.schemaPriorityMapping = new Map();
        // //     settings.schemas.forEach((settings) => {
        // //         // const currPriority = settings.priority ? settings.priority : 0;
        // //         // yamlSchemaService.addSchemaPriority(settings.uri, currPriority);
        // //         // console.log("oi")

        // //         // yamlSchemaService.registerExternalSchema(
        // //         //     settings.uri,
        // //         //     settings.fileMatch,
        // //         //     settings.schema,
        // //         //     settings.name,
        // //         //     settings.description
        // //         // );
        // //     });
        // // }

        // yamlSchemaService.registerExternalSchema('https://some.com/some.json', ['foo.yaml'], undefined, 'Schema name', 'Schema description');

        // yamlValidation.configure(settings);

        // // yamlSchemaService.loadSchema("deadlines.schema.json");

        // const results = await yamlValidation.doValidation(content, false);
        // console.log(results);

        return 1;
    }
}

export default SchemaUtils;
