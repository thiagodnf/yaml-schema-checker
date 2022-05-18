
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

    static parseJSON(content) {

        if (StringUtils.isBlank(content)) {
            throw new Error("content is empty");
        }

        return true;
    }
}

export default StringUtils;
