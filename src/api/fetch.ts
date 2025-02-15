import {appConfig} from '@/shared/utils/config';
import {replaceDoubleSlash} from '@/shared/utils/replaceDoubleSlash';

let BASE_URL = `${appConfig.host}/api`;

if (typeof window === 'undefined') {
    BASE_URL = `${appConfig.host}/api`;
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
        console.error(response.url, response.status, data);

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
export const appFetch = <Data>(path: string, requestInit: RequestInit = {}): Promise<AppFetchResponse<Data>> => {
    // в проде куки передаем только на свой домен
    // при разработке разницы нет + сервер запускается на другом порте, поэтому используем include
    requestInit.credentials = appConfig.isDev ? 'include' : 'same-origin';

    // Говнохак, пока не посадим сервер и клиент на один домен
    if (typeof window === 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const token = require('next/headers').cookies().get('token');

        requestInit.headers = {...requestInit.headers, Authorization: `Bearer ${token?.value}`};
    }

    return fetch(makeServerUrl(path), requestInit).then(r => handleResponse<Data>(r));
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

export const makeServerUrl = (pathname: string) => replaceDoubleSlash([BASE_URL, pathname].join('/'));
