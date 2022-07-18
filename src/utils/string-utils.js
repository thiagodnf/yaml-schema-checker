const yaml = require("js-yaml");

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

    static parseJson(file, content) {

        if (StringUtils.isBlank(content)) {
            throw new Error("file content is blank");
        }

        try {
            return JSON.parse(content);
        } catch (ex) {
            throw new Error(`${file} is invalid. Reason: ${ex}`);
        }
    }

    static parseYaml(file, content) {

        if (StringUtils.isBlank(content)) {
            throw new Error("file content is blank");
        }

        try {
            return yaml.load(content);
        } catch (ex) {
            throw new Error(`${file} is invalid. Reason: ${ex}`);
        }
    }
}

module.exports = StringUtils;
