import * as THREE from "three";
import { SnakeHead } from "@/game/entities/snake-head";
import { SnakeSegment } from "@/game/entities/snake-segment";
import { CONFIG } from "@/lib/constants";

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
        new THREE.Vector3(0, 0, -i * 2),
        new THREE.Vector3(0, 0, -i * 2 - 2),
      );

      this.snake.tail.push(segment);
      if (i % 2 === 0) segment.mesh.material.setValues({ color: "darkgreen" });
      this.meshes.push(segment.mesh);
    }
  }

  /**
   * @param {import("three").Vector3} movement
   * @param {import("three").Vector3} moveDirection
   * @param {number} angle
   */
  moveSnake(movement, moveDirection, angle) {
    // move head
    this.snake.position.add(movement);
    this.snake.mesh.position.add(movement);
    this.snake.mesh.rotateY(-angle);

    this.snake.direction.set(moveDirection.x, moveDirection.y, moveDirection.z);

    // move tail
    let prevPivot = this.snake.mesh.position.clone();

    this.snake.tail.forEach(segment => {
      segment.mesh.lookAt(prevPivot);

      const direction = new THREE.Vector3(prevPivot.x - segment.mesh.position.x, 0, prevPivot.z - segment.mesh.position.z);
      const normalized = direction.clone().normalize();
      const scale = direction.length() - CONFIG.snakeSegment.depth;

      segment.mesh.position.add(new THREE.Vector3(normalized.x * scale, 0, normalized.z * scale));
      prevPivot = segment.mesh.position.clone();
    });
  }
}
