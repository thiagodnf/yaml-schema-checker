import { Validator } from "jsonschema";

class SchemaUtils {

    static validate(schemaContentAsJson, yamlContentAsJson) {

        console.log(new Validator().validate(yamlContentAsJson, schemaContentAsJson));
        return new Validator().validate(yamlContentAsJson, schemaContentAsJson);
    }
}

export default SchemaUtils;
