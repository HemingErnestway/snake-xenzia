import * as THREE from "three";
import { CONFIG } from "@/lib/constants";

export class SceneController {
  /** @type {THREE.Scene} */
  scene;

  /** @type {THREE.PerspectiveCamera} */
  camera;

  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      CONFIG.camera.settings.fov,
      CONFIG.camera.settings.aspect,
      CONFIG.camera.settings.near,
      CONFIG.camera.settings.far,
    );

    this.camera.position.set(
      CONFIG.camera.position.x,
      CONFIG.camera.position.y,
      CONFIG.camera.position.z,
    );

    this.camera.lookAt(
      CONFIG.camera.direction.x,
      CONFIG.camera.direction.y,
      CONFIG.camera.direction.z,
    );
  }

  /**
   * Resize camera aspect ratio to new width and height values.
   *
   * @param {number} width
   * @param {number} height
   */
  resize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  /**
   * @param {import("three").Vector3} movement
   * @param {import("three").Vector3} snakePosition
   * @param {import("three").Vector3} worldOffset
   */
  moveCamera(movement, snakePosition, worldOffset) {
    this.camera.position.copy(worldOffset);
    this.camera.lookAt(snakePosition.add(movement));
  }
}
