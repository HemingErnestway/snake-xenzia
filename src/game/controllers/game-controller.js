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

  update() {

  }
}
