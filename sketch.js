var bg,bgImg;
var tank,tankImg;
var m, mImg
var rocket, rocketImg
var watchTower1,watchTower2,wtImg
var blast,blastImg;
var rocketGroup
var gameState="play"
var missileGroup
var rock1, rock2, rock3 , rock4 , rock5 
var rock1Img, rock2Img, rock3Img, rock4Img, rock5Img  
var lives  
var tower1Lives=10
var tower2Lives=10
var death
var music
var rockGroup
var jeep, jeepImg
var jeepGroup
var score
var wall, wallImg
var border 
var heart1,heart2,heart3,heart4,heart5,heart6,heart7,heartImg
var fix, fixImg
var fixGroup
var explosion;

function preload(){

  bgImg=loadImage("bg.jpeg")
  tankImg=loadAnimation("Tank.png")
  mImg=loadImage("tankmissle.png");
  wtImg=loadImage("watch.png")
  rocketImg=loadImage("watchmissile.png")
  blastImg=loadAnimation("blast.png")
  // death=loadSound("die.wav")
  // music=loadSound("Warzone song.mp3")
  rockImg = loadImage("rocker.png")
  jeepImg = loadImage("enemy_tank.png")
  wallImg = loadImage("wall.png")
  heartImg = loadImage("heart.png")
  fixImg=loadImage("fix.png")
  // explosion=loadImage("explosion.gif")
}

function setup(){

  createCanvas(1000,700);
  bg=createSprite(500, 350);
  bg.addImage(bgImg)
  bg.scale=2.1
  rock1=createSprite(300, 100)
  rock2=createSprite(638, 280)
  rock3=createSprite(500, 300)
  rock4=createSprite(500, 437)
  rock5=createSprite(307, 500)
  
  rock1.addImage(rockImg)
  rock2.addImage(rockImg)
  rock3.addImage(rockImg)
  rock4.addImage(rockImg)
  rock5.addImage(rockImg)
  rockGroup=createGroup();
  rockGroup.add(rock1)
  rockGroup.add(rock2)
  rockGroup.add(rock3)
  rockGroup.add(rock4)
  rockGroup.add(rock5)


  tank=createSprite(350,550)
  tank.addAnimation("tank",tankImg)
  tank.addAnimation("blast",blastImg)
  tank.scale=0.3;

  watchTower1=createSprite(900,100);
  watchTower1.addAnimation("tower1", wtImg);
  watchTower1.addAnimation("blast2",blastImg)
  watchTower1.scale=0.4;

  
  watchTower2=createSprite(100,100);
  watchTower2.addAnimation("tower", wtImg)
  watchTower2.addAnimation("blast1",blastImg)

  watchTower2.scale=0.4;


  heart1=createSprite(980,670)
  heart1.addImage(heartImg)
  heart1.scale=0.04

  heart2=createSprite(950,670)
  heart2.addImage(heartImg)
  heart2.scale=0.04

  heart3=createSprite(920,670)
  heart3.addImage(heartImg)
  heart3.scale=0.04

  heart4=createSprite(890,670)
  heart4.addImage(heartImg)
  heart4.scale=0.04

  heart5=createSprite(860,670)
  heart5.addImage(heartImg)
  heart5.scale=0.04

  heart6=createSprite(830,670)
  heart6.addImage(heartImg)
  heart6.scale=0.04


  heart7=createSprite(800,670)
  heart7.addImage(heartImg)
  heart7.scale=0.04

  rocketGroup= createGroup();
  missileGroup= createGroup()
  jeepGroup=createGroup()
  fixGroup=createGroup()
  
  
  lives = 7 
  score=0
  
 
}

function draw(){
 background("black")
  
  
  console.log(gameState)
  console.log(tower1Lives);
  console.log(tower2Lives)

  if (gameState=="play"){

    if (tower1Lives<=1 && tower2Lives<=1){
      gameState="win"
    }
    if (lives<=6.9 && lives>=5.9) {
      heart1.destroy()
    }
    
    if (lives<=5.9 && lives>=4.9) {
      heart2.destroy()
    }
    
    if (lives<=4.9 && lives>=3.9) {
      heart3.destroy()
    }
    
    if (lives<=3.9 && lives>=2.9) {
      heart3.destroy()
    }
    
    if (lives<=2.9 && lives>=1.9) {
      heart4.destroy()
    }
    
    if (lives<=1.9 && lives>=0.9) {
      heart5.destroy()
    }
    
    if (lives<=0.9 && lives>=0) {
      heart6.destroy()
    }
    if(lives<=0){

      heart7.destroy()
    }
    
   
    if (lives>=1){
      if (keyDown("W")){
        tank.y-=10
      }
    
      if (keyDown("A")){
        tank.x-=10
      }
    
      if (keyDown("S")){
        tank.y+=10
      }
    
      if (keyDown("D")){
        tank.x+=10
      }
    
      if (keyWentDown("space")){
        tankShooty()
      }


    }
    if (tower1Lives<=0){

      
      watchTower1.destroy()
      
    }
    if (tower2Lives<=1){

      
      watchTower2.destroy()
    }
    if (lives<=0){
      gameState="death"
       tank.changeAnimation("blast")
      
    }

    for(var i=0; i<rocketGroup.length;i++){
      if (rocketGroup[i].isTouching(tank)){
        rocketGroup[i].destroy();
        lives=lives-0.2;

      }
    }
    
      for(var i =0; i<missileGroup.length-1; i++){
        if (missileGroup[i].isTouching(watchTower1)){
          
          tower1Lives=tower1Lives-1
          missileGroup[i].destroy()
         
        }
        
        if (missileGroup[i].isTouching(watchTower2)){
          
          tower2Lives=tower2Lives-1
          missileGroup[i].destroy()
         
        }
      }


    
    if (watchTower2.isTouching(missileGroup)){
      watchTower2.changeAnimation("blast1")
      tower2Lives=tower2Lives-1
     
      score=score+100
    }

    

    for(var i =1; i<jeepGroup.length; i++){
      if(jeepGroup[i].isTouching(missileGroup)){
        jeepGroup[i].changeAnimation("blast1");
        jeepGroup[i].destroy()
       score= score+20

      }
    }
    
    if(jeepGroup.x<=700){
      lives=lives-1
    }
    
    if(frameCount%200==0){

      score=score+20
    }
    
    rockety()
    jeepspawner()
  }

  drawSprites()

  
  if(gameState=="death"){

    // image(explosion,0,0,700,800)
    jeepGroup.destroyEach();
    fill("red")
    textSize(31);
    text("YOU HAVE BEEN BEATEN BY THE ENEMY, JUST GET BETTER", 50,300)
    rock1.destroy()
    rock2.destroy()
    rock3.destroy()
    rock4.destroy()

  }
  if(gameState=="win"){
    jeepGroup.destroyEach()
    rock1.destroy()
    rock2.destroy()
    rock3.destroy()
    rock4.destroy()
    watchTower1.destroy()
    watchTower2.destroy()
    missileGroup.destroyEach()
    fill("green")
    textSize(40);
    text("YOU HAVE BEATEN THE ENEMY", 200,300)
    

  }
  
  

  fill ("black");
  textSize(17)
  text("SCORE: " +score, 660, 680 )

 
  
}

function tankShooty(){
  m=createSprite(tank.x,tank.y)
  m.addImage(mImg);
  m.velocityY=-9;
  m.scale=0.3;
  missileGroup.add(m)
}

function rockety(){
  
  if (tower1Lives>=1){
    if (frameCount % 7 == 0){
      rocket=createSprite(watchTower1.x,watchTower1.y)
      rocket.setVelocity(random(-20,4),10);
      rocket.addImage(rocketImg)
      rocket.scale=0.4;
      rocket.velocityY=20;
      rocketGroup.add(rocket)
    }



  }
  
  if (tower2Lives>=1){
    if (frameCount % 9 == 0){
      rocket=createSprite(watchTower2.x,watchTower2.y)
      rocket.setVelocity(random(-5,20),10);
      rocket.addImage(rocketImg)
      rocket.scale=0.4;
      rocket.velocityY=20;
      rocketGroup.add(rocket)
    }

  }
  
}






function instructions(){
  


}

function jeepspawner(){
  if(gameState=="play"){
     if(frameCount%200==0){
    jeep=createSprite(random(200,800), 00)
    jeep.addImage(jeepImg) 
    jeep.scale=0.45
    jeep.velocityY=3
    jeepGroup.add(jeep)

  }
  }
  
   if(jeepGroup.positionY<=700){
    // gameState="end"

   }

}


function fix(){
  if(gameState=="play"){
     if(frameCount%200==0){
    fix=createSprite(random(200,800), random(900, 100))
    fix.addImage(fixImg) 
    fix.scale=0.45
   
    jeepGroup.add(jeep)

  }
  }
   if(gameState=="death"){

    fix.destroyEach()
   }

   if(jeepGroup.positionY<=700){
     gameState="death"

   }

}