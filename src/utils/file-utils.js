import fs from "fs";
import path from "path";
import process from "process";
import { glob } from "glob";
import { TextDocument } from "vscode-languageserver-textdocument"

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

    static getYaml(file) {

        try {

            const fileContents = FileUtils.getContent(file, "utf-8");

            return TextDocument.create(
                path.join(FileUtils.getWorkspacePath(), file),
                "yaml",
                0,
                fileContents
            );
        } catch (ex) {
            throw new Error(ex);
        }
    }
}

export default FileUtils;
