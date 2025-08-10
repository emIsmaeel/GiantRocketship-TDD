import { BasePage } from "../basePage";
import { FrameLocator, Locator } from "@playwright/test";
import { ContactForm } from "./contactForm.po";

export class ContactUs extends BasePage {
    private readonly pageHeading: string = '[class$="banner_text"] h1';
    private readonly contactFormFrame: string = "iframe[src*='forms.zohopublic.com']";
    private readonly formHeading: string = '[id*="cos_wrapper_widget"]>h2';

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForURL("/contact/");
    }

    async contactUsPageTitle(): Promise<Locator> {
        return this.page.locator(this.formHeading).first();
    }

    /**
     * Retrieves the first frame locator for the "Contact Us" form iframe.
     * @returns {Promise<FrameLocator>} - A promise that resolves to a FrameLocator object,
     * allowing interaction with the content of the "Contact Us" form iframe.
     */
    async contactUsFrameContent(): Promise<FrameLocator> {
        return this.page.frameLocator(this.contactFormFrame).first();
    }
     
    async pageTitle(): Promise<Locator> {
        return this.page.locator(this.pageHeading).first();
    }
    
    /**
     * Creates an instance of the `ContactForm` class for interacting with the "Contact Us" form.
     * @returns {Promise<ContactForm>} - A promise that resolves to an instance of the `ContactForm` class,
     * providing methods to interact with the "Contact Us" form.
     */
    // async contactUsForm(): Promise<ContactForm> {
    //     const contactForm = await this.contactUsFrameContent();
    //     return new ContactForm(this.page, contactForm);
    // }
}
