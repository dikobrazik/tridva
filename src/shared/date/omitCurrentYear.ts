const currentYear = new Date().getFullYear();

const currentYearRe = new RegExp(`\\s?${currentYear}\\s?`);

export const omitCurrentYear = (date: string) => date.replace(currentYearRe, '');
