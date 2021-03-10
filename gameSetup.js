game.init();

game.onClick("keydown", (keys) => {
  if (keys.KeyD) game.moveHeroRight();
  if (keys.KeyA) game.moveHeroLeft();
  if (keys.KeyS) game.moveHeroJump();
});

game.onClick("keypress", (keys) => {
  if (keys.KeyH) game.testDynamicGenerate();
});
