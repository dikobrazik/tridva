import {Profile} from '@/types/user';
import axios from 'axios';

type GetCodePayload = {phone: string};
type CheckCodePayload = {phone: string; code: string};

export type CheckTokenResponse = {isAnonymous: boolean; phone: string; profile?: Profile};

export const checkToken = (): Promise<CheckTokenResponse> => axios.post('auth/check').then(response => response.data);

export const getCode = (payload: GetCodePayload): Promise<void> =>
    axios.post('auth/get-code', payload).then(response => response.data);

export const checkCode = (payload: CheckCodePayload): Promise<void> =>
    axios.post('auth/check-code', payload).then(response => response.data);
