import { BasePage } from "../basePage";
import { Locator } from "@playwright/test";

export class SuccessPage extends BasePage {
    private readonly pageTitle = "h1[class*='heading-title']";
    private readonly message = "div > p";

    async waitForFormSubmit(): Promise<void> {
        await this.page.locator(this.pageTitle).waitFor({ timeout: 30000 });
    }

    async successPageTitle(): Promise<Locator> {
        return this.page.locator(this.pageTitle);
    }

    async successMessage(): Promise<Locator> {
        return this.page.locator(this.message).first();
    }
}
