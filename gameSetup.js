game.init();

game.onClick("keydown", (keys) => {
  // Hero controls
  if (keys.KeyD) game.moveHeroRight();
  if (keys.KeyA) game.moveHeroLeft();
  if (keys.KeyS) game.moveHeroDown();
  if (keys.KeyW) game.moveHeroUp();

  //Camera controls
  if (keys.ArrowRight) game.moveCameraRight();
  if (keys.ArrowLeft) game.moveCameraLeft();
  if (keys.KeyR) game.moveCameraReset();
});
game.onClick("keypress", (keys) => {
  if (keys.Space) game.moveHeroShoot();
});
