import {NextResponse} from 'next/server';
import {NextRequest as NextRequestType} from 'next/server';
import {createAnonymous} from './api';

export async function middleware(req: NextRequestType) {
    if (!req.cookies.get('token')) {
        try {
            const token = await createAnonymous().then(r => r.token);

            const response = NextResponse.next();

            response.cookies.set('token', token);

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        {
            source: '/((?!api|static|.*\\..*|_next).*)',
            missing: [{type: 'cookie', key: 'token'}],
        },
    ],
};
