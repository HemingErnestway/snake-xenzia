import * as THREE from "three";

/**
 * Find intersection points of a line segment and a circle.
 *
 * @param {import("three").Vector3} segmentStart
 * @param {import("three").Vector3} segmentEnd
 * @param {import("three").Vector3} circleCenter
 * @param {number} circleRadius
 * @returns {import("three").Vector3[]}
 */
export function segmentCircleIntersections(segmentStart, segmentEnd, circleCenter, circleRadius) {
  const dx = segmentEnd.x - segmentStart.x;
  const dz = segmentEnd.z - segmentStart.z;

  const fx = segmentStart.x - circleCenter.x;
  const fz = segmentStart.z - circleCenter.z;

  const a = dx * dx + dz * dz;
  const b = 2 * (fx * dx + fz * dz);
  const c = fx * fx + fz * fz - circleRadius * circleRadius;

  const discriminant = b * b - 4 * a * c;

  if (discriminant < -1e-10) {
    // no intersection
    return [];
  }

  /** @type {import("three").Vector3[]} */
  const results = [];

  const EPS = 1e-10;

  if (Math.abs(discriminant) < EPS) {
    // one intersection (tangent)
    const t = -b / (2 * a);
    if (t >= -EPS && t <= 1 + EPS) {
      results.push(new THREE.Vector3(
        segmentStart.x + t * dx,
        0,
        segmentStart.z + t * dz,
      ));
    }
  } else {
    // two intersections
    const sqrtDisc = Math.sqrt(discriminant);
    const t1 = (-b + sqrtDisc) / (2 * a);
    const t2 = (-b - sqrtDisc) / (2 * a);

    [t1, t2].forEach((t) => {
      if (t >= -EPS && t <= 1 + EPS) {
        results.push(new THREE.Vector3(
          segmentStart.x + t * dx,
          0,
          segmentStart.z + t * dz,
        ));
      }
    });
  }

  return results;
}
