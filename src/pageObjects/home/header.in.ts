export interface IHeader {
    openMenu(menu: string): Promise<void>;
    openSubMenu(option: string): Promise<void>;
}
