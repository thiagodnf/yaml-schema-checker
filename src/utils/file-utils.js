const fs = require("fs");
const path = require("path");
const process = require("process");
const { glob } = require("glob");
const StringUtils = require("./string-utils");
const core = require("@actions/core");

class FileUtils {

    static isWorkspaceEmpty() {

        return FileUtils.isEmpty(FileUtils.getWorkspacePath());
    }

    static getWorkspacePath() {

        return process.env["GITHUB_WORKSPACE"] || "";
    }

    static exists(fileOrPath) {

        return fs.existsSync(fileOrPath);
    }

    static loadFiles(array) {

        core.debug("Loading all files");

        const files = new Set();

        array.forEach(el => {

            core.debug(`Processing: ${el}`);

            FileUtils.searchFiles(el).forEach(file => {

                core.debug(`Adding file: ${file}`);

                files.add(file);
            });
        });

        return files;
    }

    static searchFiles(pattern) {

        const options = {
            cwd: FileUtils.getWorkspacePath()
        };

        return glob.sync(pattern, options);
    }

    static isEmpty(path) {

        if (!FileUtils.exists(path)) {
            throw new Error(`${path} does not exist`);
        }

        return fs.readdirSync(path).length === 0;
    }

    static getContent(file, encoding = "utf-8") {

        const filePath = path.join(FileUtils.getWorkspacePath(), file);

        return fs.readFileSync(filePath, { encoding });
    }

    static getContentFromJson(file, encoding = "utf-8") {

        const content = FileUtils.getContent(file, encoding);

        return StringUtils.parseJson(file, content);
    }

    static getContentFromYaml(file, encoding = "utf-8") {

        const content = FileUtils.getContent(file, encoding);

        return StringUtils.parseYaml(file, content);
    }
}

module.exports = FileUtils;
