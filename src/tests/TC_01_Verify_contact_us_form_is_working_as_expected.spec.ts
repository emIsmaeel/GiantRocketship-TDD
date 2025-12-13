import * as allure from "allure-js-commons";
import { type Page } from "@playwright/test";
import { test, expect } from "../fixtures/base-fixtures";
import { ContactUs } from "../pageObjects/contactUs/contactUs.po";
import { ContactForm } from "../pageObjects/contactUs/contactForm.po";
import { VideoHandler } from "../pageObjects/home/video.po";
import { HomePage } from "../pageObjects/home/home.po";
import { SuccessPage } from "../pageObjects/contactUs/success.po";
import { homeTestData } from "../testData/home/homeTestData";
import { contactTestData, formData, formError, successTestData } from "../testData/contactUs/contactTestData";

let page: Page;
let homePage: HomePage;
let contactUs: ContactUs;
let contactForm: ContactForm;
let successPage: SuccessPage;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);
    await homePage.visit(process.env.BASE_URL);
    const videoFrame = (await homePage.getVideoFrame()) as VideoHandler;

    await Promise.all([
        expect(await homePage.homePageTitle()).toContainText(homeTestData.title),
        expect(await videoFrame.videoPlayer()).toBeVisible(),
    ]);

    await homePage.openContactMenu();
    await homePage.clickContactUs();

    contactUs = new ContactUs(page);
    contactForm = new ContactForm(page);
    await Promise.all([
        expect(await contactUs.pageTitle()).toContainText(contactTestData.title),
        expect(await contactUs.contactUsPageTitle()).toContainText(contactTestData.getInTouch),
    ]);
});

test("User should see errors on empty form submit", { tag: ["@smoke"] }, async (): Promise<void> => {
    await allure.tags("smoke");
    await allure.severity("critical");
    await contactForm.submitForm();
    await Promise.all([
        expect(await contactForm.getLabelByText(formError.error)).toHaveCount(3),
        expect(await contactForm.getFirstNameError(formError.error)).toBeVisible(),
        expect(await contactForm.getLastNameError(formError.error)).toBeVisible(),
        expect(await contactForm.getEmailError(formError.error)).toBeVisible(),
    ]);
});

test("User should see errors on submitting form with name only", { tag: ["@smoke"] }, async (): Promise<void> => {
    await allure.tags("smoke");
    await allure.severity("critical");
    await contactForm.addFirstName(formData.firstName);
    await contactForm.addLastName(formData.lastname);
    await contactForm.submitForm();
    await Promise.all([
        expect(await contactForm.getFirstNameError(formError.error)).not.toBeVisible(),
        expect(await contactForm.getLastNameError(formError.error)).not.toBeVisible(),
        expect(await contactForm.getFirstNameError(formError.error)).toBeHidden(),
        expect(await contactForm.getLastNameError(formError.error)).toBeHidden(),
        expect(await contactForm.getEmailError(formError.error)).toBeVisible(),
        expect(await contactForm.getLabelByText(formError.requiredError)).toBeVisible(),
    ]);
});

test(
    "User should see error on submitting form with name and email only",
    { tag: ["@smoke"] },
    async (): Promise<void> => {
        await allure.tags("smoke");
        await allure.severity("critical");
        await contactForm.addFirstName(formData.firstName);
        await contactForm.addLastName(formData.lastname);
        await contactForm.addEmail(formData.email);
        await Promise.all([
            expect(await contactForm.getFirstNameError(formError.error)).not.toBeVisible(),
            expect(await contactForm.getLastNameError(formError.error)).not.toBeVisible(),
            expect(await contactForm.getEmailError(formError.error)).not.toBeVisible(),
            expect(await contactForm.getFirstNameError(formError.error)).toBeHidden(),
            expect(await contactForm.getLastNameError(formError.error)).toBeHidden(),
            expect(await contactForm.getEmailError(formError.error)).toBeHidden(),
            expect(await contactForm.getLabelByText(formError.requiredError)).not.toBeVisible(),
        ]);
    },
);

test(
    "User should be able to submit form successfully with all required details",
    { tag: ["@smoke"] },
    async (): Promise<void> => {
        await allure.tags("smoke");
        await allure.severity("critical");
        await contactForm.addFirstName(formData.firstName);
        await contactForm.addLastName(formData.lastname);
        await contactForm.addEmail(formData.email);
        await contactForm.addComment(formData.comment);
        await contactForm.submitForm();
        await contactForm.waitForReadiness();

        successPage = new SuccessPage(page);

        await Promise.all([
            expect((await contactForm.getLabelByText(formError.error)).nth(0)).not.toBeVisible(),
            expect((await contactForm.getLabelByText(formError.error)).nth(1)).not.toBeVisible(),
            expect((await contactForm.getLabelByText(formError.error)).nth(2)).not.toBeVisible(),
            expect(await contactForm.getLabelByText(formError.requiredError)).not.toBeVisible(),
            expect(await successPage.successMessage(successTestData.successMessage)).toBeVisible(),
        ]);
    },
);
