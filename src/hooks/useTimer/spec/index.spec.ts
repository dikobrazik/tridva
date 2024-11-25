import {renderHook, waitFor} from '@testing-library/react';
import {useTimer} from '..';

describe('useTimer', () => {
    it('should count down until 0', async () => {
        const {result} = renderHook(() => useTimer());

        result.current.startTimer(10);

        for (let i = 10; i >= 0; i--) {
            await waitFor(() => result.current.seconds === i);
        }
    });
});
