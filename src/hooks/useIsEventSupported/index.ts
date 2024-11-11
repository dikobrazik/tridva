export const useIsEventSupported = (eventType: string, tagName?: keyof HTMLElementTagNameMap) => {
    const element = document.createElement(tagName || 'div') as HTMLDivElement;

    return `on${eventType}` in element;
};
