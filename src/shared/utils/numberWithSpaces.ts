export function addSpacesToNumber(number: number) {
    return number.toLocaleString().split(/\D/).join(' ');
}
