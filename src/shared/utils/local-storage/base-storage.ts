export class BaseStorage<Item> {
    constructor(private itemKey: string) {}

    public set(itemOrUpdateFn: Item | ((lastItem: Item | undefined) => Item)): void {
        if (itemOrUpdateFn instanceof Function) {
            window.localStorage.setItem(this.itemKey, JSON.stringify(itemOrUpdateFn(this.get())));
        } else {
            window.localStorage.setItem(this.itemKey, JSON.stringify(itemOrUpdateFn));
        }
    }

    public get(): Item | undefined {
        const storedItem = window.localStorage.getItem(this.itemKey);

        if (storedItem !== null) {
            return JSON.parse(storedItem);
        }

        return undefined;
    }

    public remove(): void {
        window.localStorage.removeItem(this.itemKey);
    }
}
