import * as allure from "allure-js-commons";
import { type Page } from "@playwright/test";
import { test, expect } from "../fixtures/base-fixtures";
import { ContactUs } from "../pageObjects/contactUs/contactUs.po";
import { ContactForm } from "../pageObjects/contactUs/contactForm.po";
import { VideoHandler } from "../pageObjects/home/video.po";
import { Header } from "../pageObjects/home/header.po";
import { HomePage } from "../pageObjects/home/home.po";
import { SuccessPage } from "../pageObjects/contactUs/success.po";
import { headerTestData, homeTestData } from "../testData/home/homeTestData";
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

    const header = (await homePage.getHeader()) as Header;
    await header.openMenu(headerTestData.contact);
    await header.openSubMenu(headerTestData.contactUs);

    contactUs = new ContactUs(page);
    await contactUs.waitForPageLoad();

    contactForm = await contactUs.contactUsForm();
    await Promise.all([
        expect(await contactUs.pageTitle()).toContainText(contactTestData.title),
        expect(await contactUs.contactUsPageTitle()).toContainText(contactTestData.getInTouch),
        expect(await contactForm.contactFormTitle()).toContainText(contactTestData.contactUs),
    ]);
});

test("User should see errors on empty form submit", { tag: ["@smoke"] }, async (): Promise<void> => {
    await allure.tags("smoke");
    await allure.severity("critical");
    await contactForm.submitForm();
    await Promise.all([
        expect(await contactForm.nameError()).toBeVisible(),
        expect(await contactForm.emailError()).toBeVisible(),
        expect(await contactForm.commentError()).toBeVisible(),
        expect(await contactForm.nameError()).toContainText(formError.error),
        expect(await contactForm.emailError()).toContainText(formError.error),
        expect(await contactForm.commentError()).toContainText(formError.error),
    ]);
});

test("User should see errors on submitting form with name only", { tag: ["@smoke"] }, async (): Promise<void> => {
    await allure.tags("smoke");
    await allure.severity("critical");
    await contactForm.addFirstName(formData.firstName);
    await contactForm.addLastName(formData.lastname);
    await contactForm.submitForm();
    await Promise.all([
        expect(await contactForm.nameError()).toBeHidden(),
        expect(await contactForm.emailError()).toBeVisible(),
        expect(await contactForm.commentError()).toBeVisible(),
        expect(await contactForm.emailError()).toContainText(formError.error),
        expect(await contactForm.commentError()).toContainText(formError.error),
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
        await contactForm.submitForm();
        await Promise.all([
            expect(await contactForm.nameError()).toBeHidden(),
            expect(await contactForm.emailError()).toBeHidden(),
            expect(await contactForm.commentError()).toBeVisible(),
            expect(await contactForm.commentError()).toContainText(formError.error),
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
        await successPage.waitForFormSubmit();

        await Promise.all([
            expect(await contactForm.nameError()).toBeHidden(),
            expect(await contactForm.emailError()).toBeHidden(),
            expect(await contactForm.commentError()).toBeHidden(),
            expect(await successPage.successPageTitle()).toContainText(successTestData.thankYou),
            expect(await successPage.successMessage()).toContainText(successTestData.successMessage),
        ]);
    },
);
