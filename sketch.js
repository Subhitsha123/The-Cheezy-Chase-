var bg,tomImg,cheeseImg,spatulaImg,trapImg,jerryImg,cheeseGroup,tom,next,pan;
var score = 0;
score>=0;
var timer = 60;
var val = 0;

var INTRO = 0;
var PLAY = 2;
var END = 1;
var gameState = INTRO;

function preload(){
  bg = loadImage("background.jpg");
  tomImg = loadAnimation("tom.png");
  tomhitImg = loadAnimation ("tom hit.png");
  cheeseImg = loadImage("cheese.png");
  spatulaImg = loadImage("spatula.png");
  trapImg = loadImage("trap.png");
  jerryImg = loadAnimation("jerry 1.png");
  jerry2Img = loadAnimation("jerry 2.png");
  overImg = loadImage("over1.jpg");
  restartImg = loadImage("restart.png");
  panImg = loadImage("pan.png");
  tjImg = loadImage("intropic.jpg");
  nextImg = loadImage("next.png");
  bg1Img = loadImage("bg.jpg");
  bg2Img = loadImage("bg2.jpg");
  cheeseSound = loadSound("cheese.wav");
  introSound = loadSound("intro.mp3");
  overSound = loadSound("over.mp3");
}

function setup() {
  createCanvas(1000,600);

  jerry = createSprite(80,500,50,100);
  jerry.addAnimation("jerry",jerryImg);
  jerry.scale = 0.7;
  
  over = createSprite(500,300);
  over.addImage("over",overImg);
  
  restart = createSprite(850,100);
  restart.addImage("restart",restartImg);
  restart.scale = 0.3;

  next = createSprite(850,500);
  next.addImage("next",nextImg);
  next.scale = 0.3;

  pan = createSprite(845,315);
  pan.addImage("pan",panImg);
  pan.scale = 0.2;

  cheeseGroup = new Group();
  tomGroup = new Group();
  trapGroup = new Group();
  spatulaGroup = new Group();

  edges = createEdgeSprites();

}

function draw(){

  if(gameState === INTRO){
    next.visible = true;
    pan.visible = false;
    jerry.visible = false;
    if(mousePressedOver(next)){
      val = val+1;
    }

    if(val === 0){
      background(tjImg);
      introSound.play();
    }

    if(val === 4){
      background(bg1Img);
      introSound.stop();
    }

    if(val === 8){
     background(bg2Img);
    }

    if(val === 12){
      gameState = PLAY;
    }
  } else{
    next.visible = false;
    }
  
  if(gameState === PLAY){
    jerry.visible = true;
    pan.visible = true;

  background(bg);

  textSize(25);
  fill(0);
  textFont("merienda");
  text("Time Remaining: "+Math.round(timer)+" Seconds",500,50);
  text("Score: "+score,500,100);
    
  timer = timer - 0.04;

  if(keyDown("UP_ARROW")){
    jerry.velocityY = -9;
    jerry.addAnimation("jerry",jerry2Img);
    jerry.scale = 0.25
    jerry.changeAnimation("jerry2Img");
    jerry.setCollider("rectangle",0,0,100,440);
  }

  jerry.velocityY = jerry.velocityY+0.8;

  if(keyDown("LEFT_ARROW")){
    jerry.velocityX = -9;
  }

  if(keyDown("RIGHT_ARROW")){
    jerry.velocityX = 9;
  }

  spawnCheese();
  spawnTom();
  spawnTrap();
  spawnSpatula();

  if(cheeseGroup.isTouching(jerry)){
    cheeseGroup.destroyEach();
    jerry.scale = jerry.scale + 0.02;
    score = score+3;
    cheeseSound.play();
  }

  if(tomGroup.isTouching(jerry)){
    tomGroup.destroyEach();
  }

  if(trapGroup.isTouching(jerry)){
    trapGroup.destroyEach();
    gameState = END;
    overSound.play();
  }

  if(spatulaGroup.isTouching(jerry)){
    spatulaGroup.destroyEach();
    gameState = END;
    overSound.play();
  }

  if(timer < 0 ){
    gameState = END; 
   } 

   if(mousePressedOver(pan)){
    tom.addAnimation("tom",tomhitImg);
    tom.changeAnimation("tomhitImg");
    score = score+5;
    pan.x = 0;
    pan.y = 0;
    //pan.visible = false;
    pan.lifetime = 0;
    }
  }

if(gameState ===END){
  jerry.velocityY = 0;
  jerry.velocityX = 0;
  cheeseGroup.destroyEach();
  spatulaGroup.destroyEach();
  tomGroup.destroyEach();
  cheeseGroup.destroyEach();

  over.depth = pan.depth+1;
  restart.depth = over.depth+1;

  pan.visible = false;
  over.visible = true;
  restart.visible = true;
 
  textSize(25);
  fill(255);
  textFont("merienda");
  text("Score: "+score,500,100);
  
  if(mousePressedOver(restart)){
    reset();
  }
} else{
  over.visible = false;
  restart.visible = false;
}

  jerry.collide(edges);
  drawSprites();

}

function reset(){
  gameState = PLAY;
  score = 0;
  timer = 60;
 
}

function spawnCheese(){
  if(frameCount%70 === 0){
    cheese = createSprite(random(50,750),random(50,500),10,10);
    cheese.addImage(cheeseImg);
    cheese.scale = 0.1;
    cheese.lifetime = 60;
    cheeseGroup.add(cheese);
    cheese.setCollider("rectangle",0,0,500,500);
  }
}

function spawnTom(){
  if(frameCount%300 === 0){
    tom = createSprite(random(50,750),random(50,500),20,100);
    tom.addAnimation("tom",tomImg);
    tom.scale = 0.45;
    tom.lifetime = 100;
    tomGroup.add(tom);
    
    pan = createSprite(845,315);
    pan.addImage("pan",panImg);
    pan.scale = 0.2;
  }
}

function spawnTrap(){
  if(frameCount%100 === 0){
    trap = createSprite(random(100,900),500,30,30);
    trap.addImage("trap",trapImg);
    trap.scale = 0.2;
    trap.lifetime = 60;
    trapGroup.add(trap);
  }
}

function spawnSpatula(){
  if(frameCount%160 === 0){
    spatula = createSprite(random(100,900),500,30,30);
    spatula.addAnimation("spatula",spatulaImg);
    spatula.scale = 0.3;
    spatula.lifetime = 60;
    spatulaGroup.add(spatula);
  }
}