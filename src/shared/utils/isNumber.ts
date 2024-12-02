const NUMBER_RE = /^\d+$/;

export const isNumber = (n: unknown) => NUMBER_RE.test(String(n));
