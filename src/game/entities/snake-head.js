import * as THREE from "three";
import { CONFIG } from "@/lib/constants";

export class SnakeHead {
  /** @type {import("three").Mesh} */
  mesh;

  /** @type {import("three").Vector3} */
  position;

  /** @type {import("three").Vector3} */
  direction;

  /** @type {number} */
  speed;

  /** @type {SnakeSegment[]} */
  tail;

  /**
   * @param {import("three").Vector3} position
   */
  constructor(position) {
    this.position = position;
    this.direction = new THREE.Vector3(0, 0, -1);
    this.speed = CONFIG.snakeHead.speed;
    this.tail = [];

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
