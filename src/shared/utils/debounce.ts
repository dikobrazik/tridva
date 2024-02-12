export function debounce<Args extends unknown[]>(fn: (...args: Args) => void, interval: number) {
    let timeoutId: NodeJS.Timeout | undefined = undefined;
    return function (...args: Args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            timeoutId = undefined;
            fn(...args);
        }, interval);
    };
}
