export function getRandomNumberInRange(min: number, max: number) {
    const random = Math.random()

    const range = max - min + 1

    const result = Math.floor(random * range) + min

    return result
}