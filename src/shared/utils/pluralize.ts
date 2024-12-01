/**
 * Функция для склонения русских слов
 * Пример использования: pluralize(5, ['человек', 'человека', 'человек'])
 * */
export function pluralize(number: number, w: [string, string, string]) {
    const n = Math.abs(number * 1); // abs на случай отрицательного значения
    return n % 10 == 1 && n % 100 != 11
        ? w[0]
        : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
          ? w[1]
          : w[2];
}
