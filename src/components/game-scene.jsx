"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function GameScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    camera.position.set(8, 3, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasRef.current,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "green" });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    let requestId;

    function animate() {
      requestId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(requestId);

      geometry.dispose();
      material.dispose();

      scene.remove(cube);

      renderer.dispose();
    };
  }, []);

  return (
    <canvas ref={canvasRef} />
  );
}
