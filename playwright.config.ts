import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
    testDir: "./src/tests/",
    fullyParallel: false,
    timeout: 300 * 1000,
    workers: 4,
    retries: 0,
    reporter: [
        ["html", { open: false }],
        [
            "allure-playwright",
            {
                detail: true,
                outputFolder: "allure-results",
                suiteTitle: false,
            },
        ],
    ],
    use: {
        baseURL: process.env.BASE_URL,
        actionTimeout: 80 * 1000,
        navigationTimeout: 60 * 1000,
        video: "on",
        screenshot: "on",
        contextOptions: {
            recordVideo: {
                dir: "./test-results/",
            },
        },
    },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        // {
        //   name: "firefox",
        // },
        // {
        //   name: "safari",
        // },
    ],
});
