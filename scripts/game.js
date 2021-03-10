const game = new (function () {
  let scene, camera, renderer, road, hero;
  let events = {
      keydown: null,
      keypress: null,
    },
    keys = {},
    dynamicElements = [],
    inJump = "stay";

  this.moveHeroRight = () => {
    if (hero.position.x < 2.5) hero.position.x += 0.1;
  };

  this.moveHeroLeft = () => {
    if (hero.position.x > -1.5) hero.position.x -= 0.1;
  };

  this.moveHeroJump = () => {
    if (inJump == "stay") inJump = "up";
  };

  this.testDynamicGenerate = () => {
    const test_geometry = new THREE.BoxGeometry(1, 1, 1);
    const test_material = new THREE.MeshBasicMaterial({
      color: "#007100",
    });
    test = new THREE.Mesh(test_geometry, test_material);
    let X = Math.floor(Math.random() * (2.5 - -1.5)) + -1.5;
    test.position.set(X, 1, -8);

    dynamicElements.push(test);
    scene.add(test);
  };

  const jumpFunction = () => {
    switch (inJump) {
      case "up":
        if (hero.position.y < 3.6) {
          hero.position.y += 0.1;
        } else {
          inJump = "down";
        }
        break;
      case "down":
        if (hero.position.y > 2) {
          hero.position.y -= 0.1;
        } else {
          inJump = "stay";
        }
        break;
      default:
        break;
    }
  };

  const animate = (this.animate = () => {
    call_event("keydown", keys);
    jumpFunction();

    dynamicElements.forEach((element) => {
      element.position.z += 0.1;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  });

  const call_event = (evt, args) => {
    if (events[evt]) events[evt](args);
  };

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
    scene.rotation.x = 0.3;

    window.addEventListener("keydown", (e) => {
      if (!keys[e.code]) {
        keys[e.code] = true;
        call_event("keypress", keys);
      }
    });

    window.addEventListener("keyup", (e) => {
      keys[e.code] = false;
      call_event("keyup", keys);
    });

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
    scene.add(road);

    const hero_geometry = new THREE.BoxGeometry(1, 2, 1);
    const hero_material = new THREE.MeshBasicMaterial({
      color: "#0071ff",
    });
    hero = new THREE.Mesh(hero_geometry, hero_material);
    hero.position.set(0, 2, 8);

    scene.add(hero);
  });

  this.onClick = (event_name, process) => {
    events[event_name] = process;
  };
})();
