import {Profile} from '@/types/user';
import axios from 'axios';
import {appFetch} from './fetch';

type GetCodePayload = {phone: string};
export type CheckCodePayload = {phone: string; code: string};

export type CheckTokenResponse = {isAnonymous: boolean; phone: string; profile: Profile};

export const checkToken = async (): Promise<CheckTokenResponse> =>
    axios.post('auth/check').then(response => response.data);

export const createAnonymous = (): Promise<{token: string}> =>
    appFetch<{token: string}>('auth/create-anonymous', {method: 'POST'}).then(response => response.data);

export const getCode = (payload: GetCodePayload): Promise<void> =>
    axios.post('auth/get-code', payload).then(response => response.data);

export const checkCode = (payload: CheckCodePayload): Promise<Profile> =>
    axios.post('auth/check-code', payload).then(response => response.data);
