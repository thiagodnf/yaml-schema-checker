
import { LanguageSettings } from "yaml-language-server";
import { YAMLValidation } from "yaml-language-server/lib/umd/languageservice/services/yamlValidation";
import { YAMLSchemaService } from "yaml-language-server/lib/umd/languageservice/services/yamlSchemaService";
import fs from "fs";
import FileUtils from "./file-utils";
import { URI } from "vscode-uri";

import { ErrorCode, getLanguageService } from "vscode-json-languageservice";

class SchemaUtils {

    static async isValid(content) {

        const settings = {
            validate: true, // Turn on validation, turn off everything else
            hover: false,
            completion: false,
            format: false,
            isKubernetes: false,
            schemas: [{
                // settings.uri,
                // settings.fileMatch,
                // settings.schema,
                // settings.name,
                // settings.description}
            }],
            customTags: [],
            yamlVersion: 1.2
        };

        const requestService = function(uri){
            console.log("hahahahahahahahahaaha");
            return new Promise((c, e) => {

                const scheme = URI.parse("deadlines.schema.json").scheme.toLowerCase();


                c(FileUtils.getContent("deadlines.schema.json"));

                // fs.readFile("deadlines.schema.json", { encoding: 'utf-8'}, (err, result) =>
                //     // If there was an error reading the file, return empty error message
                //     // Otherwise return the file contents as a string
                //     err ? e('') : c(result.toString())
                // );
            });
        };

        const contextService = {
            resolveRelativePath: (relativePath, resource) => {

                console.log("jose!");

                return URL.resolve(resource, relativePath);
            }
        };

        const a = {
            sendError: (b, c) => {
                console.log(b, c);
            }
        };

        const yamlSchemaService = new YAMLSchemaService(requestService, contextService);
        const yamlValidation = new YAMLValidation(yamlSchemaService, a);


        yamlSchemaService.clearExternalSchemas();

        // if (settings.schemas) {
        //     yamlSchemaService.schemaPriorityMapping = new Map();
        //     settings.schemas.forEach((settings) => {
        //         // const currPriority = settings.priority ? settings.priority : 0;
        //         // yamlSchemaService.addSchemaPriority(settings.uri, currPriority);
        //         // console.log("oi")

        //         // yamlSchemaService.registerExternalSchema(
        //         //     settings.uri,
        //         //     settings.fileMatch,
        //         //     settings.schema,
        //         //     settings.name,
        //         //     settings.description
        //         // );
        //     });
        // }

        yamlSchemaService.registerExternalSchema('https://some.com/some.json', ['foo.yaml'], undefined, 'Schema name', 'Schema description');

        yamlValidation.configure(settings);

        // yamlSchemaService.loadSchema("deadlines.schema.json");

        const results = await yamlValidation.doValidation(content, false);
        console.log(results);

        return 1;
    }
}

export default SchemaUtils;
