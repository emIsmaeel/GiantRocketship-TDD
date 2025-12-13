import { Page } from "@playwright/test";
import { Timeout } from "../utils/enums";

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async visit(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async waitForReadiness(number:number = Timeout.THREE_SECONDS): Promise<void> {
        return this.page.waitForTimeout(number);
    }
}
