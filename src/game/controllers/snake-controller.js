import * as THREE from "three";
import { SnakeHead } from "@/game/entities/snake-head";
import { SnakeSegment } from "@/game/entities/snake-segment";

export class SnakeController {
  /** @type {import("three").Mesh[]} */
  meshes = [];

  /** @type {SnakeHead} */
  snake;

  /**
   * @param {number} [length = 3]
   */
  constructor(length = 3) {
    this.snake = new SnakeHead(new THREE.Vector3(0, 0, 0));
    this.meshes.push(this.snake.mesh);

    for (let i = 0; i < length; ++i) {
      const segment = new SnakeSegment(
        new THREE.Vector3(0, 0, i * 2),
        new THREE.Vector3(0, 0, i * 2 + 2),
      );

      this.snake.tail.push(segment);
      this.meshes.push(segment.mesh);
    }
  }

  /**
   * @param {import("three").Vector3} movement
   */
  moveSnake(movement) {
    // move head
    this.snake.position.add(movement);
    this.snake.mesh.position.add(movement);

    // move tail
    const lastBackPosition = this.snake.position.clone();

    this.snake.tail.forEach(segment => {
      segment.frontPosition = lastBackPosition;

    });
  }
}
