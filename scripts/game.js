const game = new (function () {
  let scene, camera, renderer, road;

  const animate = (this.animate = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  });

  this.init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 12;
    scene.rotation.y = -0.25;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    sceneGenerate();
    animate();
  };

  const sceneGenerate = (this.sceneGenerate = () => {
    const road_geometry = new THREE.BoxGeometry(6, 1, 20);
    // const text_loader = new THREE.TextureLoader();
    const road_material = new THREE.MeshBasicMaterial({
      color: "#676b70",
      // map: text_loader.load("img/road.jpg"),
    });
    road = new THREE.Mesh(road_geometry, road_material);
    road.rotation.x = 0.3;

    scene.add(road);

    const hero_geometry = new THREE.BoxGeometry(1, 2, 1);
    const hero_material = new THREE.MeshBasicMaterial({
      color: "#0071ff",
    });
    hero = new THREE.Mesh(hero_geometry, hero_material);
    hero.position.y = -1.1;
    hero.position.z = 8;
    hero.rotation.x = 0.3;

    scene.add(hero);
  });
})();
