export const uniq = <T>(array: T[]): T[] => array.filter((v, i, a) => a.indexOf(v) === i);
