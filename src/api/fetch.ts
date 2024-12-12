let BASE_URL = `${process.env.NEXT_PUBLIC_HOST}/api`;

if (typeof window === 'undefined') {
    BASE_URL = `${process.env.HOST}/api`;
}

export type AppFetchResponse<Data> = {
    data: Data;
    status: number;
    ok: boolean;
};

const handleResponse = async <Data>(response: Response): Promise<AppFetchResponse<Data>> => {
    let data: any;

    try {
        data = await response.json();
    } catch (error) {
        console.error(error);

        data = await response.text();
    }

    if (!response.ok) {
        throw {
            data,
            status: response.status,
            ok: response.ok,
            url: response.url,
        };
    }

    return {data, status: response.status, ok: response.ok};
};

// nextjs не поддерживает кэширование в axios, поэтому если нужно кэширование - используем fetch
export const appFetch = <Data>(path: string, init?: RequestInit): Promise<AppFetchResponse<Data>> => {
    const customInit: RequestInit = init ?? ({} as RequestInit);

    customInit.credentials = 'same-origin';

    // Говнохак, пока не посадим сервер и клиент на один домен
    if (typeof window === 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const token = require('next/headers').cookies().get('token');

        customInit.headers = {...customInit.headers, Authorization: `Bearer ${token?.value}`};
    }

    return fetch(`${BASE_URL}/${path}`, customInit).then(r => handleResponse<Data>(r));
};

export const getSearchParams = (params?: Record<string, any>) => {
    if (!params) {
        return '';
    }

    return new URLSearchParams(
        Object.fromEntries(
            Object.entries(params).filter(([, v]) => ['string', 'number', 'boolean'].includes(typeof v)),
        ),
    ).toString();
};
