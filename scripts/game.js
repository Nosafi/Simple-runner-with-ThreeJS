const game = new (function () {
  let scene, camera, renderer, road, hero;
  let score_Tablo;
  let events = {
      keydown: null,
      keypress: null,
    },
    keys = {},
    score = 0,
    level = 9,
    frame_enemy_cd = 0,
    frame_bullet_cd = 0,
    dynamicElements = [];

  this.moveHeroRight = () => {
    if (hero.position.x < 2.5) hero.position.x += 0.1;
  };
  this.moveHeroLeft = () => {
    if (hero.position.x > -2.5) hero.position.x -= 0.1;
  };
  this.moveHeroDown = () => {
    if (hero.position.y > 1) hero.position.y += -0.1;
  };
  this.moveHeroUp = () => {
    if (hero.position.y < 3) hero.position.y += 0.1;
  };
  this.moveHeroShoot = () => {
    const bullet_geometry = new THREE.SphereGeometry(0.1);
    const bullet_material = new THREE.MeshBasicMaterial({
      color: "#ff0000",
    });
    bullet = new THREE.Mesh(bullet_geometry, bullet_material);
    let X = Math.floor(Math.random() * (2.5 - -1.5)) + -1.5;
    bullet.position.set(hero.position.x, hero.position.y, 8);

    dynamicElements.push({
      id: bullet.uuid,
      type: "bullet",
      scored: false,
    });
    scene.add(bullet);
  };

  this.moveCameraRight = () => {
    camera.rotation.y += 0.1;
    camera.position.x += 0.3;
  };
  this.moveCameraLeft = () => {
    camera.rotation.y += -0.1;
    camera.position.x += -0.3;
  };
  this.moveCameraReset = () => {
    camera.position.set(0, 0, 15);
    camera.rotation.set(0, 0, 0);
  };

  const enemyGenerate = () => {
    const enemy_geometry = new THREE.SphereGeometry(0.5);
    const enemy_material = new THREE.MeshBasicMaterial({
      color: "#676b70",
    });
    enemy = new THREE.Mesh(enemy_geometry, enemy_material);
    let X = Math.floor(Math.random() * (2.5 - -1.5)) + -1.5;
    let Y = Math.floor(Math.random() * (3 - 1)) + 1;
    enemy.position.set(X, Y, -8);

    dynamicElements.push({
      id: enemy.uuid,
      type: "enemy",
      scored: false,
    });
    scene.add(enemy);
  };

  const animate = (this.animate = () => {
    call_event("keydown", keys);
    lazer.position.set(hero.position.x, hero.position.y, hero.position.z - 5);

    if (score > 0 && score % 10 == 0) {
      level--;
      score++;
    }

    if (frame_enemy_cd == 10 * level) {
      enemyGenerate();
      frame_enemy_cd = 0;
    } else {
      frame_enemy_cd++;
    }

    dynamicElements.forEach((element) => {
      let this_item = scene.getObjectByProperty("uuid", element.id);
      if (element.type == "enemy") {
        this_item.position.z += 0.1;
        if (this_item.position.z > 20) {
          scene.remove(this_item);
          dynamicElements.splice(dynamicElements.indexOf(element), 1);
        }
      }
      if (element.type == "bullet") {
        this_item.position.z += -0.3;

        dynamicElements.forEach((item) => {
          let enemy_item = scene.getObjectByProperty("uuid", item.id);
          if (item.type == "enemy") {
            let distance_from_enemy = this_item.position.distanceTo(
              enemy_item.position
            );
            if (distance_from_enemy < 0.5) {
              score++;
              scene.remove(enemy_item);
              dynamicElements.splice(dynamicElements.indexOf(item), 1);
            }
          }
        });

        if (this_item.position.z < -20) {
          scene.remove(this_item);
          dynamicElements.splice(dynamicElements.indexOf(element), 1);
        }
      }
    });

    score_Tablo.innerHTML = "Score: " + score + ", Level: " + (10 - level);

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
    camera.position.z = 15;
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

    score_Tablo = document.querySelector(".score_Tablo");

    sceneGenerate();
  };

  const sceneGenerate = (this.sceneGenerate = () => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    const light = new THREE.PointLight(0xc4c4c4, 10);
    light.position.set(0, 300, 500);
    scene.add(light);
    const light2 = new THREE.PointLight(0xc4c4c4, 10);
    light2.position.set(500, 100, 0);
    scene.add(light2);
    const light3 = new THREE.PointLight(0xc4c4c4, 10);
    light3.position.set(0, 100, -500);
    scene.add(light3);
    const light4 = new THREE.PointLight(0xc4c4c4, 10);
    light4.position.set(-500, 300, 500);
    scene.add(light4);

    // const road_geometry = new THREE.BoxGeometry(6, 1, 30);
    // const road_material = new THREE.MeshBasicMaterial({
    //   color: "#007100",
    // });
    // road = new THREE.Mesh(road_geometry, road_material);
    // scene.add(road);

    let loader = new THREE.GLTFLoader();
    loader.load("models/hero/scene.gltf", function (gltf) {
      hero = gltf.scene.children[0];
      hero.position.set(0, 1, 8);
      hero.scale.set(0.2, 0.2, 0.2);
      hero.rotation.z = 11;
      scene.add(gltf.scene);
      animate();
    });

    const lazer_geometry = new THREE.BoxGeometry(0.03, 0.03, 10);
    const lazer_material = new THREE.MeshBasicMaterial({
      color: "#007100",
      transparent: true,
      opacity: 0.2,
    });
    lazer = new THREE.Mesh(lazer_geometry, lazer_material);
    scene.add(lazer);
  });

  this.onClick = (event_name, process) => {
    events[event_name] = process;
  };
})();
