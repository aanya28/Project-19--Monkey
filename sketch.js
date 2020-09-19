var banana, bananaImage;

var player, playerRunning;

var obstacle, obstacleImage, obstacleGroup;

var backGround, ground;

var score;

var foodGroup;

function preload() {
playerRunning = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

backImage = loadImage("jungle.jpg");

bananaImage = loadImage("banana.png");

obstacleImage = loadImage("stone.png");
							}

function setup() {
  createCanvas(400, 400);
  backGround = createSprite(0, 0, 400, 400);
  backGround.addImage(backImage);
  backGround.velocityX = -5;
  backGround.x = backGround.width / 2;

  ground = createSprite(200, 400, 400, 150);
  ground.visible = false;

  player = createSprite(50, 315, 20, 20);
  player.addAnimation("playerRunning", playerRunning);
  player.scale = 0.1;
  
  score = 0;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
}
  
function draw() {
  background(220);
  
  console.log(player.y)
  
  player.velocityY = player.velocityY +0.8;
  
  if (backGround.x < 0) {
  backGround.x = backGround.width / 2;
}
  
  if(foodGroup.isTouching(player)){
  score = score +2;
  foodGroup.destroyEach();
}

  if(obstacleGroup.isTouching(player)){
  player.scale = 0.1; 
 }
  
  if(keyDown("space") && player.y >= 282){
   player.velocityY = -12;
  }
    
  switch(score){
    case 10: player.scale = 0.12;
          break;
    case 20: player.scale = 0.14;
          break;
    case 30: player.scale = 0.16
          break;
    case 40: player.scale = 0.18
          break;
    default: break;
  }
    
  player.collide(ground);

  food();
  spawnObstacles();
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text('score:'+score, 300,50);
}

function food() {
  if(frameCount % 80 === 0){
    banana = createSprite (400,200,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage("bananaImage", bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -6;
    banana.lifetime = 90;
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(400,315,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage("obstacleImage", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 80;
    obstacleGroup.add(obstacle);
  }
}