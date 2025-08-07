import * as THREE from "three";
import { CONFIG } from "@/lib/constants";

export class GameController {
  /** @type {SceneController} */
  sceneController;

  /** @type {SnakeController} */
  snakeController;

  /** @type {Fruit[]} */
  fruits;

  /**
   * @param {SceneController} sceneController
   * @param {SnakeController} snakeController
   */
  constructor(sceneController, snakeController) {
    this.sceneController = sceneController;
    this.snakeController = snakeController;

    this.snakeController.meshes.forEach(mesh => sceneController.scene.add(mesh));
  }

  /**
   * @param {number} delta
   */
  update(delta) {
    const snake = this.snakeController.snake;
    const prevDirection = snake.direction.clone();
    const prevPosition = snake.position.clone();

    // change direction on input
    const angle = 0.8 * Math.PI / 180;  // rad

    // rotate direction vector by the angle
    const moveDirection = new THREE.Vector3(
      prevDirection.x * Math.cos(angle) - prevDirection.z * Math.sin(angle),
      0,
      prevDirection.x * Math.sin(angle) + prevDirection.z * Math.cos(angle),
    );

    const movement = moveDirection.clone().multiplyScalar(snake.speed * delta);

    this.snakeController.moveSnake(movement, moveDirection, angle);

    const cameraOffset = new THREE.Vector3(
      CONFIG.camera.position.x,
      CONFIG.camera.position.y,
      CONFIG.camera.position.z,
    );

    const worldOffset = cameraOffset.clone().applyMatrix4(snake.mesh.matrixWorld);

    this.sceneController.moveCamera(movement, prevPosition, worldOffset);
  }
}
