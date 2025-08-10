import { BasePage } from "../basePage";
import { FrameLocator, Locator, Page } from "@playwright/test";
import { IContactForm } from "./contactForm.in";

export class ContactForm extends BasePage implements IContactForm {
    private form: FrameLocator;
    private readonly formTitle: string = "[class='frmTitle']";
    private readonly firstName: string = "[elname='First']";
    private readonly lastName: string = "[elname='Last']";
    private readonly email: string = "[name='Email']";
    private readonly comment: string = "[name='MultiLine']";
    private readonly submitBtn: string = "button[elname='submit']";
    private readonly nameFieldError: string = "[id='error-Name']";
    private readonly emailFieldError: string = "[id='error-Email']";
    private readonly commentFieldError: string = "[id='error-MultiLine']";

    constructor(page: Page, formFrame: FrameLocator) {
        super(page);
        this.form = formFrame;
    }

    async contactFormTitle(): Promise<Locator> {
        return this.form.locator(this.formTitle).first();
    }

    async addFirstName(firstName: string): Promise<void> {
        await this.form.locator(this.firstName).first().fill(firstName);
    }

    async addLastName(lastName: string): Promise<void> {
        await this.form.locator(this.lastName).first().fill(lastName);
    }

    async addEmail(email: string): Promise<void> {
        await this.form.locator(this.email).first().fill(email);
    }

    async addComment(comment: string): Promise<void> {
        await this.form.locator(this.comment).first().fill(comment);
    }

    async nameError(): Promise<Locator> {
        return this.form.locator(this.nameFieldError);
    }

    async emailError(): Promise<Locator> {
        return this.form.locator(this.emailFieldError);
    }

    async commentError(): Promise<Locator> {
        return this.form.locator(this.commentFieldError);
    }

    async submitForm(): Promise<void> {
        await this.form.locator(this.submitBtn).first().click();
    }
}
