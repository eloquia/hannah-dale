export const isInRadius = (x: number, y: number, radius: number) => {
  if (x < -radius || x > radius || y < -radius || y > radius) {
    return false;
  }
  return true;
}
