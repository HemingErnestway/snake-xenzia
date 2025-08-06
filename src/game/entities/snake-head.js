import * as THREE from "three";
import { CONFIG } from "@/lib/constants";

export class SnakeHead {
  /** @type {import("three").Mesh} */
  mesh;

  /** @type {import("three").Vector3} */
  position;

  /** @type {SnakeSegment | null} */
  tail;

  /**
   * @param {import("three").Vector3} position
   */
  constructor(position) {
    this.position = position;
    this.tail = null;

    const geometry = new THREE.BoxGeometry(
      CONFIG.snakeHead.width,
      CONFIG.snakeHead.height,
      CONFIG.snakeHead.depth,
    );

    const material = new THREE.MeshBasicMaterial({
      color: CONFIG.snakeHead.color,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(position.x, position.y, position.z);
  }
}
