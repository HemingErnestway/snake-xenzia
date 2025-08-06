import * as THREE from "three";
import { CONFIG } from "@/lib/constants";

export class SnakeSegment {
  /** @type {import("three").Mesh} */
  mesh;

  /** @type {import("three").Vector3} */
  frontPosition;

  /** @type {import("three").Vector3} */
  backPosition;

  /** @type {SnakeSegment | null} */
  next;

  /**
   * @param {import("three").Vector3} frontPosition
   * @param {import("three").Vector3} backPosition
   */
  constructor(frontPosition, backPosition) {
    this.frontPosition = frontPosition;
    this.backPosition = backPosition;
    this.next = null;

    const geometry = new THREE.BoxGeometry(
      CONFIG.snakeSegment.width,
      CONFIG.snakeSegment.height,
      CONFIG.snakeSegment.depth,
    );

    const material = new THREE.MeshBasicMaterial({
      color: CONFIG.snakeSegment.color,
    });

    this.mesh = new THREE.Mesh(geometry, material);

    const segmentPosition = new THREE.Vector3()
      .addVectors(frontPosition, backPosition)
      .multiplyScalar(0.5);

    this.mesh.position.set(segmentPosition.x, segmentPosition.y, segmentPosition.z);
  }
}
