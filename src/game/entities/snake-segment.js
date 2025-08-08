import * as THREE from "three";
import { CONFIG } from "@/lib/constants";
import { AxesHelper } from "three";

export class SnakeSegment {
  /** @type {import("three").Mesh} */
  mesh;

  /**
   * @param {import("three").Vector3} position
   */
  constructor(position) {
    const geometry = new THREE.BoxGeometry(
      CONFIG.snakeSegment.width,
      CONFIG.snakeSegment.height,
      CONFIG.snakeSegment.depth,
    );

    geometry.translate(0, 0, CONFIG.snakeSegment.depth / 2);

    const material = new THREE.MeshBasicMaterial({
      color: CONFIG.snakeSegment.color,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.add(new AxesHelper(3));

    this.mesh.position.set(position.x, position.y, position.z);
  }
}
