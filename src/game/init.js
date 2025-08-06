import * as THREE from "three";
import { OrbitControls } from "three/addons";
import { SceneController } from "@/game/controllers/scene-controller";
import { SnakeController } from "@/game/controllers/snake-controller";
import { GameController } from "@/game/controllers/game-controller";

/**
 * @param canvas
 */
export function initGame(canvas) {
  const sceneController = new SceneController();
  const snakeController = new SnakeController();
  const gameController = new GameController(sceneController, snakeController);

  const controls = new OrbitControls(sceneController.camera, canvas);

  const axesHelper = new THREE.AxesHelper();
  sceneController.scene.add(axesHelper);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneController.resize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", onResize);

  let requestId;

  function render() {
    requestId = requestAnimationFrame(render);
    gameController.update();
    renderer.render(sceneController.scene, sceneController.camera);
  }
  render();

  return () => {
    window.removeEventListener("resize", onResize);
    cancelAnimationFrame(requestId);

    controls.dispose();
    sceneController.scene.remove(axesHelper);

    renderer.dispose();
  };
}
