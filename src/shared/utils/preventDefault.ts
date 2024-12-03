import {SyntheticEvent} from 'react';

export const preventDefault = <E extends SyntheticEvent<any>>(cb?: (e: E) => unknown) => {
    return (e: E) => {
        e.preventDefault();

        if (cb) {
            cb(e);
        }
    };
};
