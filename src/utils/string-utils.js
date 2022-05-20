
import { TextDocument } from "vscode-languageserver-textdocument";

class StringUtils {

    static isString(str) {

        return typeof str === "string" || str instanceof String;
    }

    static isBlank(str) {

        if (!str) {
            return true;
        }

        if (!StringUtils.isString(str)) {
            return false;
        }

        return str.trim().length === 0;
    }

    static parseJSON(fileUri, content) {

        if (StringUtils.isBlank(content)) {
            throw new Error("json content is blank");
        }

        try {
            return JSON.parse(content);
        } catch (ex) {
            throw new Error(`${fileUri} is invalid. Reason: ${ex}`);
        }
    }

    static parseYaml(fileUri, content) {

        if (StringUtils.isBlank(content)) {
            throw new Error("yaml content is blank");
        }

        return TextDocument.create(fileUri, "yaml", 0, content);
    }
}

export default StringUtils;
