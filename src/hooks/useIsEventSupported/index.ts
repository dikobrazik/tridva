'use client';

export const useIsEventSupported = (eventType: string, tagName?: keyof HTMLElementTagNameMap) => {
    if (typeof window !== 'undefined') {
        const element = document.createElement(tagName || 'div') as HTMLDivElement;

        return `on${eventType}` in element;
    }

    return false;
};
