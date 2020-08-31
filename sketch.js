//Becoming a Game Developer



var PLAY = 1;
var END = 0;
var gameState = PLAY;

var obstaclegroup;
var cloudgroup;




var jumpsound;

var checkpointsound;

var diesound;

var gameover,gamerestart,gameoverimage,gamerestartimage;

var trex,trexrunning,trexcollide;

var ground,invisibleground,groundimage;

var cloudimage;

var ob1,ob2,ob3,ob4,ob5,ob6;

var score;

function preload(){
  trexrunning = loadAnimation("trex1.png","trex3.png","trex4.png");

  trexcollide = loadImage("trex_collided.png");
  
  groundimage = loadImage("ground2.png");
  
  cloudimage = loadImage("cloud.png");
  
  ob1 = loadImage("obstacle1.png");
  
  ob2 = loadImage("obstacle2.png");
  
  ob3 = loadImage("obstacle3.png");
  
  ob4 = loadImage("obstacle4.png");
  
  ob5 = loadImage("obstacle5.png");
  
  ob6 = loadImage("obstacle6.png");
  
  gameoverimage = loadImage("gameOver.png");
  
  gamerestartimage = loadImage("restart.png");
  
  jumpsound = loadSound("jump.mp3");
  
  diesound = loadSound("die.mp3");
  
  checkpointsound = loadSound("checkPoint.mp3");
  
}





function setup() {
  createCanvas(600, 300);
  
  trex = createSprite(50,280,20,20);
  trex.addAnimation ("trex",trexrunning);
  trex.addAnimation ("trex2",trexcollide);
  trex.scale = 0.5;
  
  ground = createSprite(380,285,600,20);
  ground.addImage ("ground2",groundimage);
  ground.x = ground.width /2;
  
  invisibleground = createSprite(300,290,600,20);
  invisibleground.visible = false;
  
  score = 0;
  
  obstaclegroup = new Group();
  cloudgroup = new Group();
  
   //place gameOver and restart icon on the screen
   gameover = createSprite(400,200);
   gamerestart = createSprite(400,240);
    
    gameover.addImage("gameover",gameoverimage);
    gameover.scale = 0.5;
    gamerestart.addImage("restart",gamerestartimage);
    gamerestart.scale = 0.5;

  
  
  //set text
  
  
textSize(18);
textFont("Georgia");
  fill(255,255,255);
  
}

function draw() {
  background(120);
  
  if(gameState === PLAY){
  ground.velocityX = -2;
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   if(keyDown("space") && trex.y >=256){
      trex.velocityY = -12 ;
     
     jumpsound.play();
     
   }
    
    if(score % 100 === 0){
      checkpointsound.play();
    }
  
   //add gravity
    trex.velocityY = trex.velocityY + 0.8;
  
    gameover.visible = false;
    gamerestart.visible = false;
    
  spawnClouds();
  spawnObstacles();
   //scoring
    score = Math.round(getFrameRate()/60)+score;
    
    if(obstaclegroup.isTouching(trex)){
      
      diesound.play();
      
      gameState = END;
    }
      
      
    
  }
  else if(gameState === END){
  
   ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex2",trexcollide);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
  
  
  gameover.visible = true;
    gamerestart.visible = true;
  
  if(mousePressedOver(gamerestart)){
    reset();
    
    }
  
  
  }
   
   text("Score: "+ score, 250, 100);
  
  
  
  
  
  
  trex.collide (invisibleground);
  
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var cloud = createSprite(600,220,40,10);
    cloud.y = Math.round(random(180,220));
    cloud.addImage("cloud",cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 315;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudgroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,265,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch (rand){
      case 1: obstacle.addImage(ob1);
        break;
        
        case 2: obstacle.addImage(ob2);
        break;
        
        case 3: obstacle.addImage(ob3);
        break;
        
        case 4: obstacle.addImage(ob4);
        break;
        
        case 5: obstacle.addImage(ob5);
        break;
        
        case 6: obstacle.addImage(ob6);
        break;
        
        default:break;
    }
        
        
        
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 140;
    //add each obstacle to the group
    obstaclegroup.add(obstacle);
  }
}

function reset() {
  
  gameState = PLAY;
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  trex.changeAnimation("trex",trexrunning);
  score = 0;
  
}





