export const appConfig = {
    get isDev() {
        return process.env.IS_DEV || process.env.NEXT_PUBLIC_IS_DEV;
    },
    get host() {
        return process.env.HOST || process.env.NEXT_PUBLIC_HOST;
    },
};
