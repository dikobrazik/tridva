export const uniq = <T extends unknown>(array: T[]): T[] => array.filter((v, i, a) => a.indexOf(v) === i);
