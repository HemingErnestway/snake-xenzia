import * as THREE from "three";
import { CONFIG } from "@/lib/constants";
import { AxesHelper } from "three";

export class SnakeHead {
  /** @type {import("three").Mesh} */
  mesh;

  /** @type {number} */
  speed;

  /** @type {number} */
  agility;

  /** @type {SnakeSegment[]} */
  tail;

  /**
   * @param {import("three").Vector3} position
   */
  constructor(position) {
    this.speed = CONFIG.snakeHead.speed;
    this.agility = CONFIG.snakeHead.agility;
    this.tail = [];

    const geometry = new THREE.BoxGeometry(
      CONFIG.snakeHead.width,
      CONFIG.snakeHead.height,
      CONFIG.snakeHead.depth,
    );

    geometry.translate(0, 0, CONFIG.snakeHead.depth / 2);

    const material = new THREE.MeshBasicMaterial({
      color: CONFIG.snakeHead.color,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.add(new AxesHelper(3));

    this.mesh.position.set(position.x, position.y, position.z);
  }
}
