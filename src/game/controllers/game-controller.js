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
    const movement = snake.direction.clone().multiplyScalar(snake.speed * delta);

    this.snakeController.moveSnake(movement);
    this.sceneController.moveCamera(movement, snake.position.clone());
  }
}
