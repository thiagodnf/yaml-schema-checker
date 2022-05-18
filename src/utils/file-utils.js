import fs from "fs";
import path from "path";
import process from "process";

class FileUtils {

    static isWorkspaceEmpty(){

        return FileUtils.isEmpty(FileUtils.getWorkspace());
    }

    static getWorkspace() {

        return process.env["GITHUB_WORKSPACE"];
    }

    static exists(fileOrPath){

        return fs.existsSync(fileOrPath);
    }

    static isEmpty(path) {

        if (!FileUtils.exists(path)) {
            throw new Error(`${path} does not exist`);
        }

        return fs.readdirSync(path).length === 0;
    }

    static async getContent(file) {

        console.log(file);

        const filePath = path.join(FileUtils.getWorkspace(), file);

        console.log(filePath);

        return await fs.promises.readFile(filePath, { encoding: "utf-8" });
    }
}

export default FileUtils;
