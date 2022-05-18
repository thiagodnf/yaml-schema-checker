
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

    static parseJSON(str) {

        if (StringUtils.isBlank(str)) {
            throw new Error("json content is empty");
        }

        try {
            return JSON.parse(str);
        } catch (ex) {
            throw new Error("Invalid JSON content. " + ex);
        }
    }
}

export default StringUtils;
