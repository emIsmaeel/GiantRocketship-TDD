export interface IContactForm {
    addFirstName(firstName: string): Promise<void>;
    addLastName(lastName: string): Promise<void>;
    addEmail(email: string): Promise<void>;
    addComment(comment: string): Promise<void>;
    submitForm(): Promise<void>;
}
