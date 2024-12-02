import {getSearchParams} from '../fetch';

describe('getSearchParams', () => {
    describe('if passed undefined', () => {
        it('should return empty string', () => {
            expect(getSearchParams()).toEqual('');
        });
    });

    it('should filter not string, number or boolean types', () => {
        expect(getSearchParams({a: 1, b: '2', c: true})).toEqual('a=1&b=2&c=true');
    });
});
