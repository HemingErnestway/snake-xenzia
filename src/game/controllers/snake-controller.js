import * as THREE from "three";
import { SnakeHead } from "@/game/entities/snake-head";
import { SnakeSegment } from "@/game/entities/snake-segment";
import { CONFIG } from "@/lib/constants";
import { segmentCircleIntersections } from "@/lib/functions";

export class SnakeController {
  /** @type {SnakeHead} */
  snake;

  /** @type {import("three").Mesh[]} */
  meshes = [];

  /** @type {import("three").Vector3[]} */
  pathPoints = [];

  /**
   * @param {number} [length = 3]
   */
  constructor(length = 3) {
    this.snake = new SnakeHead(new THREE.Vector3(0, 0, 0));
    this.meshes.push(this.snake.mesh);
    this.pathPoints.push(this.snake.mesh.position.clone());

    for (let i = 0; i < length; ++i) {
      const segment = new SnakeSegment(
        new THREE.Vector3(0, 0, -i * 2),
        new THREE.Vector3(0, 0, -i * 2 - 2),
      );

      this.snake.tail.push(segment);

      if (i % 2 === 0) {
        segment.mesh.material.setValues({ color: "darkgreen" });
      }

      this.meshes.push(segment.mesh);
      this.pathPoints.unshift(segment.mesh.position.clone());
    }
  }

  /**
   * @param {import("three").Vector3} movement
   * @param {import("three").Vector3} moveDirection
   * @param {number} angle
   */
  moveSnake(movement, moveDirection, angle) {
    const { snake, pathPoints } = this;

    // move head
    snake.position.add(movement);
    snake.mesh.position.add(movement);
    snake.mesh.rotateY(-angle);

    pathPoints.push(snake.mesh.position.clone());

    snake.direction.set(moveDirection.x, moveDirection.y, moveDirection.z);

    // move tail
    let prevPivot = snake.mesh.position.clone();
    let visitedIndex = pathPoints.length;

    snake.tail.forEach(segment => {
      // circumference
      const center = prevPivot;
      const radius = CONFIG.snakeSegment.depth;

      let intersectionPoint = prevPivot.clone();

      for (let i = visitedIndex - 1; i > 0; --i) {
        // mark as visited
        visitedIndex = i;

        // path interval
        const a = pathPoints[i];
        const b = pathPoints[i - 1];

        const intersections = segmentCircleIntersections(a, b, center, radius);

        if (intersections.length !== 1) {
          // not intersecting
          continue;
        }

        intersectionPoint = intersections[0];
        break;
      }

      // move segment
      segment.mesh.position.set(intersectionPoint.x, intersectionPoint.y, intersectionPoint.z);
      segment.mesh.lookAt(prevPivot);
      prevPivot = intersectionPoint.clone();
    });
  }
}
