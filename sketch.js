
// const Engine = Matter.Engine;
// const World = Matter.World;
// const Bodies = Matter.Bodies;
// const Body = Matter.Body;

var score=0;
var life=3;
var aaa,aaa2,ship,space,aaaImg,shipImg,spaceImg,bullet,bulletGroup,aaaGroup,bulletImg;
var gameState=1,invisible,heading,scoreboard;
function preload()
{
 aaaImg=loadImage("asteroid.png");
 shipImg=loadImage("spaceship.png");
 spaceImg=loadImage("space.jpg");
 bulletImg=loadImage("bullet2.png");
}

function setup() {
	createCanvas(2300, 1300);
	// engine = Engine.create();
	// world = engine.world;

	//Create the Bodies Here.
    space = createSprite(1100, 700, 100,100);
    space.addImage(spaceImg);
	  space.scale=4;

    ship = createSprite(1150, 1000, 100,100);
    ship.addImage(shipImg);
	  ship.scale=1;
        
    invisible=createSprite(1150, 1250, 2800,50);
    //invisible.visible=false;
    invisible.setCollider("rectangle",0,0,3070, 70);
    invisible.debug = true;

    bulletGroup = createGroup();   
    aaaGroup = createGroup();   

    heading= createElement("h1");
    scoreboard= createElement("h1");
	//Engine.run(engine);
}

function draw() {
  //rectMode(CENTER);
  background("white");
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:white'); 
  scoreboard.position(width-200,20)

  // fill("white");
  // textSize(20);
  // textFont("Arial")
  // text("SHOOT THE METEORITS!!", 650,350);
  
  if(gameState===1){
    ship.x=mouseX

    if (frameCount % 100 === 0) {
      drawAAA();
    }

    if(keyDown("space")){
      shootBullet();
    }

    if (aaaGroup.collide(invisible)){
      handleGameover(aaaGroup);
    }
    
    if(aaaGroup.collide(bulletGroup)){
      handleBubbleCollision(aaaGroup);
    }

    if (aaaGroup.y===invisible.y && aaaGroup.x===invisible.x){
      handleBubbleCollision(aaaGroup);
    }
  drawSprites();
}

}

function drawAAA(){
  aaa = createSprite(random(80,2200),random(20,50),40,40);
  aaa.addImage(aaaImg);
  aaa.scale = 1;
  aaa.velocityY = 12;
  aaa.lifetime = 400;
  aaaGroup.add(aaa);
}

function shootBullet(){
  bullet= createSprite(700, ship.y-150, 50,20);
  bullet.x= ship.x-5;
  bullet.addImage(bulletImg);
  bullet.scale=0.12;
  bullet.velocityY= -6;
  bulletGroup.add(bullet);
}

function handleBubbleCollision(aaaGroup){
    if (life > 0) {
       score=score+1;
    }
    
    bulletGroup.destroyEach()
    aaaGroup.destroyEach()
}

function handleGameover(aaaGroup){
  
    life=life-1;
    aaaGroup.destroyEach();
    
    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
}