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

    // create first tail segment
    this.snake.tail = new SnakeSegment(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 2),
    );
    this.meshes.push(this.snake.tail.mesh);

    // create rest (length - 1) tail segments
    for (let i = 0; i < length - 1; ++i) {
      const lastSegment = this.findLastSegment();

      lastSegment.next = new SnakeSegment(
        new THREE.Vector3(lastSegment.backPosition.x, lastSegment.backPosition.y, lastSegment.backPosition.z),
        new THREE.Vector3(lastSegment.backPosition.x, lastSegment.backPosition.y, lastSegment.backPosition.z + 2),
      );
      this.meshes.push(lastSegment.next.mesh);
    }
  }

  findLastSegment() {
    let segment = this.snake.tail;

    while (segment.next) {
      segment = segment.next;
    }

    return segment;
  }
}
