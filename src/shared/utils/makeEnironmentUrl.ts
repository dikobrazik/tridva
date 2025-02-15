import {makeServerUrl} from '@/api/fetch';
import {appConfig} from './config';
import {replaceDoubleSlash} from './replaceDoubleSlash';

export const makeEnvironmentUrl = (path: string) => {
    return replaceDoubleSlash(appConfig.isDev ? makeServerUrl(path) : `/api/${path}`);
};
