export const CONFIG = {
  camera: {
    settings: {
      fov: 75,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 1000,
    },
    position: {
      x: 10,
      y: 10,
      z: 10,
    },
    direction: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  fruit: {
    radius: 0.5,
    widthSegments: 16,
    heightSegments: 16,
    color: "red",
  },
  snakeSegment: {
    width: 1,
    height: 1,
    depth: 2,
    color: "green",
  },
  snakeHead: {
    width: 1,
    height: 1,
    depth: 1,
    color: "yellow",
  },
};
