import fs from "fs";
import path from "path";

class FileUtils {

    static getWorkspace() {
        return process.env["GITHUB_WORKSPACE"];
    }

    static async getContent(file) {

        const filePath = path.join(FileUtils.getWorkspace(), file);

        console.log(filePath);

        return await fs.promises.readFile(filePath, { encoding: "utf-8" });
    }
}

export default FileUtils;
