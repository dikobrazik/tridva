import {appConfig} from '@/shared/utils/config';

type RequestMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export class RequestBuilder {
    private url = new URL(appConfig.host!);
    private method: RequestMethods = 'GET';

    private headers = new Headers();

    // в проде куки передаем только на свой домен
    // при разработке разницы нет + сервер запускается на другом порте, поэтому используем include
    private cridentials: RequestCredentials = appConfig.isDev ? 'include' : 'same-origin';

    constructor() {
        // Говнохак, пока не посадим сервер и клиент на один домен
        if (typeof window === 'undefined') {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const token = require('next/headers').cookies().get('token');

            this.headers.append('Authorization', `Bearer ${token?.value}`);
        }
    }

    public setPathname(pathname: string) {
        this.url.pathname = pathname;
        return this;
    }

    public setSearchParams(searchParams: Record<string, string>) {
        for (const [key, value] of Object.entries(searchParams)) {
            this.url.searchParams.set(key, value);
        }
        return this;
    }

    public setMethod(method: RequestMethods) {
        this.method = method;
        return this;
    }

    public build() {
        return new Request(this.url.toString(), {
            credentials: this.cridentials,
            headers: this.headers,
            method: this.method,
        });
    }
}
