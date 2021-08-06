export default function computeDamage(
  distance: number,
  damage: number,
  rangeModifier: number,
  range: number,
  gainRange?: number,
) {
  if (distance === 0.0) {
    return damage;
  }

  // this calculation is done with 128 bit floats
  const rangeScalar = Math.pow(
    rangeModifier,
    0.002 * distance,
  );
  if (!gainRange || distance <= gainRange) {
    return rangeScalar * damage;
  }
  if (distance <= range) {
    const preDmg = rangeScalar * damage;
    const gainScalar = Gain(
      (distance - gainRange) / (gainRange - range) + 1.0,
      0.80,
    );
    return preDmg * gainScalar;
  }
  return 0.0;
}

// hl2sdk-l4d2
function Gain(x: number, biasAmt: number) {
  if (x < 0.5) {
    return 0.5 * Bias(2 * x, 1 - biasAmt);
  } else {
    return 1 - 0.5 * Bias(2 - 2 * x, 1 - biasAmt);
  }
}

// hl2sdk-l4d2
function Bias(x: number, biasAmt: number) {
  const exponent = Math.log(biasAmt) * -1.4427; // (-1.4427 = 1 / log(0.5))
  return Math.pow(x, exponent);
}
