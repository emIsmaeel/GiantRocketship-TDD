import { test as base } from "@playwright/test";
import { HomePage } from "../pageObjects/home/home.po";
import { SuccessPage } from "../pageObjects/contactUs/success.po";

interface BaseFixture {
    homePage: HomePage;
    successPage: SuccessPage;
}

export const test = base.extend<BaseFixture>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    successPage: async ({ page }, use) => {
        await use(new SuccessPage(page));
    },
});

export { expect } from "@playwright/test";
