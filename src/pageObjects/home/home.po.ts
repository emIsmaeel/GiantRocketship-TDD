import { BasePage } from "../basePage";
import { FrameLocator, Locator } from "@playwright/test";
import { Header } from "./header.po";
import { VideoHandler } from "./video.po";

export class HomePage extends BasePage {
    private readonly mainMenu: string = "[aria-label='Menu']";
    private readonly pageHeading: string = '[class$="video_text"] h2';
    private readonly videoFrame: string = "iframe.elementor-video";
    private readonly contactMenu: string = '[class$="parent"]:has-text("Contact")';
    private readonly contactUs: string = '[href$="contact"]';

    async homePageTitle(): Promise<Locator> {
        return this.page.locator(this.pageHeading).first();
    }

    async videoFrameContent(): Promise<FrameLocator> {
        return this.page.locator(this.videoFrame).contentFrame();
    }

    async getHeader(): Promise<Header> {
        const header = this.page.locator(this.mainMenu);
        return new Header(this.page, header);
    }

    async getVideoFrame(): Promise<VideoHandler> {
        const videoFrame = await this.videoFrameContent();
        return new VideoHandler(this.page, videoFrame);
    }

    async openContactMenu(): Promise<void> {
        await this.page.locator(this.contactMenu).first().click();
        await this.page.locator(this.contactMenu).first().hover();
    }

    async clickContactUs(): Promise<void> {
        await this.page.locator(this.contactUs).first().click();
    }
}
