export const sum = (...nums: number[] | number[][]) =>
    ([] as number[]).concat(...nums).reduce((acc, num) => acc + num, 0);
