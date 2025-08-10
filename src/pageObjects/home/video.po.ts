import { BasePage } from "../basePage";
import { FrameLocator, Locator, Page } from "@playwright/test";
import { IVideoHandler } from "./video.in";

export class VideoHandler extends BasePage implements IVideoHandler {
    private videoFrame: FrameLocator;
    private readonly video: string = "[aria-label='Play']";

    constructor(page: Page, frame: FrameLocator) {
        super(page);
        this.videoFrame = frame;
    }

    async videoPlayer(): Promise<Locator> {
        const video = this.videoFrame.locator(this.video);
        await video.waitFor();
        return video.first();
    }
}
