let BASE_URL = `${process.env.NEXT_PUBLIC_HOST}/api`;

if (typeof window === 'undefined') {
    BASE_URL = `${process.env.HOST}/api`;
}

// nextjs не поддерживает кэширование в axios, поэтому если нужно кэширование - используем fetch
export const appFetch = (...args: Parameters<typeof fetch>) => {
    if (typeof args[0] === 'string') {
        return fetch(`${BASE_URL}/${args[0]}`, args[1]);
    }

    return fetch(...args);
};

export const getSearchParams = (params?: Record<string, any>) => {
    if (!params) {
        return '';
    }

    return new URLSearchParams(
        Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined)),
    ).toString();
};
