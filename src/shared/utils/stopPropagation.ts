import {SyntheticEvent} from 'react';

export const stopPropagation = <E extends SyntheticEvent<any>>(cb?: (e: E) => unknown) => {
    return (e: E) => {
        e.stopPropagation();
        if (cb) {
            cb(e);
        }
    };
};
