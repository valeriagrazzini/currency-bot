export function dateFormat(date) {
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${addZeroDigit(date.getHours())}:${addZeroDigit(date.getMinutes())}:${addZeroDigit(date.getSeconds())}`
}

export function addZeroDigit(number) {
    return number.toString().padStart(2, '0')
}