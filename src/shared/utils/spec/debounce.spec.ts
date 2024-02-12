import {debounce} from '../debounce';

const fn = jest.fn();

jest.useFakeTimers();

describe('debounce', () => {
    beforeEach(() => {
        fn.mockReset();
    });
    describe('если интервал 1 секунда', () => {
        describe('и в течении 1 секунды', () => {
            describe('не было вызовов', () => {
                it('не должен вызвать функцию сразу', () => {
                    const debouncedFn = debounce(fn, 1000);
                    debouncedFn();
                    expect(fn).not.toHaveBeenCalled();
                });
                it('должен вызвать функцию через секунду', () => {
                    const debouncedFn = debounce(fn, 1000);
                    debouncedFn();
                    jest.advanceTimersByTime(1000);
                    expect(fn).toHaveBeenCalled();
                });
            });

            describe('был вызов через 600 мс', () => {
                it('должен вызвать функцию через секунду после последнего вызова', () => {
                    const debouncedFn = debounce(fn, 1000);
                    debouncedFn();
                    jest.advanceTimersByTime(600);
                    debouncedFn();
                    jest.advanceTimersByTime(1000);
                    expect(fn).toHaveBeenCalled();
                });
                it('не должен вызвать функцию через секунду', () => {
                    const debouncedFn = debounce(fn, 1000);
                    debouncedFn();
                    jest.advanceTimersByTime(600);
                    debouncedFn();
                    expect(fn).not.toHaveBeenCalled();
                    jest.advanceTimersByTime(1000);
                });
            });
        });
    });
});
