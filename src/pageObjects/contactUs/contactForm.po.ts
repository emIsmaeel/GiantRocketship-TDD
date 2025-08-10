import { BasePage } from "../basePage";
import { FrameLocator, Locator, Page } from "@playwright/test";
import { IContactForm } from "./contactForm.in";

export class ContactForm extends BasePage implements IContactForm {
    // private form: FrameLocator;
    private readonly firstName: string = '[id^="firstname"]';
    private readonly lastName: string = '[id^="lastname"]';
    private readonly email: string = "[id^='email']";
    private readonly comment: string = "[id^='contact_notes']";
    private readonly submitBtn: string = 'input[value="Submit"]';
    private readonly firstNameError: string = '[class^="hs_firstname"]';
    private readonly lastNameError: string = '[class^="hs_lastname"]';
    private readonly emailError: string = '[class^="hs_email"]';
    // constructor(page: Page, formFrame: FrameLocator) {
    //     super(page);
    //     this.form = formFrame;
    // }

    async addFirstName(firstName: string): Promise<void> {
        await this.page.locator(this.firstName).first().fill(firstName);
    }

    async addLastName(lastName: string): Promise<void> {
        await this.page.locator(this.lastName).first().fill(lastName);
    }

    async addEmail(email: string): Promise<void> {
        await this.page.locator(this.email).first().fill(email);
    }

    async addComment(comment: string): Promise<void> {
        await this.page.locator(this.comment).first().fill(comment);
    }

    async submitForm(): Promise<void> {
        await this.page.locator(this.submitBtn).first().click({delay: 1000});
    }

    async getLabelByText( text: string) {
        return this.page.locator(`label:has-text("${text}")`);
    }

    async getFirstNameError(error:string): Promise<Locator> {
        return this.page.locator(this.firstNameError)
        .filter({ hasText: `${error}`}).first();
    }

    async getLastNameError(error:string): Promise<Locator> {
        return this.page.locator(this.lastNameError)
        .filter({ hasText: `${error}`}).first();
    }

    async getEmailError(error:string): Promise<Locator> {
        return this.page.locator(this.emailError)
        .filter({ hasText: `${error}`}).first();
    }
}
