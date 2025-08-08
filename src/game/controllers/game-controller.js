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
    const prevPosition = snake.mesh.position.clone();

    // turn direction based on active keys
    // left:      1
    // right:    -1
    // none/both: 0
    const turnDirectionCoefficient
      = Number(inputController.isActionActive("left"))
      - Number(inputController.isActionActive("right"));

    const angle = turnDirectionCoefficient * snake.agility * Math.PI / 180;  // rad
    snake.mesh.rotateY(angle);

    const direction = new THREE.Vector3();
    snake.mesh.getWorldDirection(direction);

    const movement = direction.clone().multiplyScalar(snake.speed * delta);
    snakeController.moveSnake(movement);

    const cameraOffset = new THREE.Vector3(
      CONFIG.camera.position.x,
      CONFIG.camera.position.y,
      CONFIG.camera.position.z,
    );

    const worldOffset = cameraOffset.clone().applyMatrix4(snake.mesh.matrixWorld);
    sceneController.moveCamera(movement, prevPosition, worldOffset);
  }
}
