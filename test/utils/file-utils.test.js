import os from "os";
import process from "process";

import FileUtils from "../../src/utils/file-utils";

test("should return empty if workspace path is not provided", async () => {

    expect(FileUtils.getWorkspacePath()).toBe("");
});

test("should return a valid workspace path", async () => {

    const tempDir = os.tmpdir();

    process.env["GITHUB_WORKSPACE"] = tempDir;

    expect(FileUtils.getWorkspacePath()).toBe(tempDir);
});
