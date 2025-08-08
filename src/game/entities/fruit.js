import * as THREE from "three";
import { CONFIG } from "@/lib/constants";

export class Fruit {
  /** @type {import("three").Mesh} */
  mesh;

  constructor() {
    const geometry = new THREE.SphereGeometry(
      CONFIG.fruit.radius,
      CONFIG.fruit.widthSegments,
      CONFIG.fruit.heightSegments,
    );

    const material = new THREE.MeshBasicMaterial({
      color: CONFIG.fruit.color,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 0, 0);
  }
}
