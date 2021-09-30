/**
 * Return a random number in the given range (inclusive).
 * @param min minimum value
 * @param max maximum value
 * @returns random float number
 */
export const randomInRange = (min: number, max: number) => (
  Math.random() * (max - min) + min
)
