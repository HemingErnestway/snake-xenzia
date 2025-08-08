import * as THREE from "three";
import { CONFIG } from "@/lib/constants";

export class GameController {
  /** @type {SceneController} */
  sceneController;

  /** @type {SnakeController} */
  snakeController;

  /** @type {InputController} */
  inputController;

  /** @type {Fruit[]} */
  fruits;

  /**
   * @param {SceneController} sceneController
   * @param {SnakeController} snakeController
   * @param {InputController} inputController
   */
  constructor(sceneController, snakeController, inputController) {
    this.sceneController = sceneController;
    this.snakeController = snakeController;
    this.inputController = inputController;

    this.snakeController.meshes.forEach(mesh => sceneController.scene.add(mesh));
  }

  /**
   * @param {number} delta
   */
  update(delta) {
    const { sceneController, snakeController, inputController } = this;

    const snake = snakeController.snake;
    const prevDirection = snake.direction.clone();
    const prevPosition = snake.position.clone();

    // change angle on input
    const coefficient
      = inputController.isActionActive("left") ? -1
      : inputController.isActionActive("right") ? 1
      : 0;

    const angle = coefficient * snake.agility * Math.PI / 180;  // rad

    // rotate direction vector by the angle
    const moveDirection = new THREE.Vector3(
      prevDirection.x * Math.cos(angle) - prevDirection.z * Math.sin(angle),
      0,
      prevDirection.x * Math.sin(angle) + prevDirection.z * Math.cos(angle),
    );

    const movement = moveDirection.clone().multiplyScalar(snake.speed * delta);

    snakeController.moveSnake(movement, moveDirection, angle);

    const cameraOffset = new THREE.Vector3(
      CONFIG.camera.position.x,
      CONFIG.camera.position.y,
      CONFIG.camera.position.z,
    );

    const worldOffset = cameraOffset.clone().applyMatrix4(snake.mesh.matrixWorld);

    sceneController.moveCamera(movement, prevPosition, worldOffset);
  }
}
