import { Locator } from "@playwright/test";

export interface IVideoHandler {
    videoPlayer(): Promise<Locator>;
}
