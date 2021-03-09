const game = new (function () {
  let scene, camera, rederer;

  const animate = (this.animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  });

  this.init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    animate();
  };

  this.addCube = () => {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: "#34dbeb" });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  };
})();
