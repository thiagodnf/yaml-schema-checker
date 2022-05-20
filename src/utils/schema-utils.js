import { Validator } from "jsonschema";

class SchemaUtils {

    static validate(schemaContentAsJson, yamlContentAsJson) {

        return new Validator().validate(yamlContentAsJson, schemaContentAsJson);
    }
}

export default SchemaUtils;
