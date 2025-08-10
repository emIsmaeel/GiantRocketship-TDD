import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { IHeader } from "./header.in";

export class Header extends BasePage implements IHeader {
    private menu: Locator;
    private readonly menuItems: string = "ul.elementor-nav-menu > li";
    private readonly subMenuItems: string = "ul.sub-menu > li";

    constructor(page: Page, headerMenu: Locator) {
        super(page);
        this.menu = headerMenu;
    }

    async openMenu(menu: string): Promise<void> {
        await this.menu.locator(this.menuItems, { hasText: menu }).click();
    }

    async openSubMenu(option: string): Promise<void> {
        await this.menu.locator(this.subMenuItems, { hasText: option }).click();
    }
}
