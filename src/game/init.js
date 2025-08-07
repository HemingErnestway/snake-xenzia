import * as THREE from "three";
import { OrbitControls } from "three/addons";
import { SceneController } from "@/game/controllers/scene-controller";
import { SnakeController } from "@/game/controllers/snake-controller";
import { GameController } from "@/game/controllers/game-controller";
import { InputController } from "@/game/controllers/input-controller/input-controller";

/**
 * @param canvas
 */
export function initGame(canvas) {
  const sceneController = new SceneController();
  const snakeController = new SnakeController(7);

  const inputController = new InputController({
    "left": {
      keys: [37, 65],
    },
    "right": {
      keys: [39, 68],
    },
  });

  inputController.attach(document, document);

  const gameController = new GameController(sceneController, snakeController, inputController);

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
  let lastTime = performance.now();

  function render() {
    const now = performance.now();
    const delta = (now - lastTime) / 1000;
    lastTime = now;

    requestId = requestAnimationFrame(render);
    gameController.update(delta);
    renderer.render(sceneController.scene, sceneController.camera);
  }
  render();

  return () => {
    window.removeEventListener("resize", onResize);
    cancelAnimationFrame(requestId);

    controls.dispose();
    sceneController.scene.remove(axesHelper);
    inputController.detach();

    renderer.dispose();
  };
}
