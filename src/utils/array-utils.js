class ArrayUtils {

    static split(array, separator = ",") {

        let result = [];

        array.forEach(e => {
            result = [...result, ...ArrayUtils.splitFromString(e, separator)];
        });

        return result;
    }

    static splitFromString(str, separator = ",") {

        return str
            .split(separator)
            .map(s => s.trim())
            .filter(x => x !== "");
    }
}

module.exports = ArrayUtils;
