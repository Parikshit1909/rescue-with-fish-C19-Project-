var fish,fishImg;
var badfish,badfishImg,badfishGroup;
var sea,seaImg;
var coin,coinImg,coinsGroup;
var invisibleBlock,invisibleBlockGroup;
var gameState = 'play';
var score = 0;

function preload(){
fishImg = loadImage("fish.png");
badfishImg = loadImage("badfish.png");
seaImg = loadImage("sea.png");
coinImg = loadImage("coin.png")
}

function setup() {
 createCanvas(600,600);

 sea = createSprite(300,300);
 sea.addImage("sea",seaImg);
 sea.scale = 3.5;
 sea.velocityX = -1;

 coinsGroup = new Group();
 badfishGroup = new Group();
 invisibleBlockGroup = new Group();

 fish = createSprite(100,300,50,50);
 fish.addImage("fish",fishImg);
 fish.scale = 0.1;
 
}

function draw() {
 background(0);
 
 if(gameState === 'play'){

    if(keyDown("up_arrow")){
        fish.y = fish.y - 3;
    }

    if(keyDown("down_arrow")){
        fish.y = fish.y + 3;
    }

    if(sea.x < 200){
        sea.x = 300;
    }
 }
    spawnCoins();
    spawnbadFish();

    if(coinsGroup.isTouching(fish)){
       coinsGroup.destroyEach();
       score=score+5;
    }

   if(badfishGroup.isTouching(fish)){
       fish.velocityX = 0;
    }

    if(invisibleBlockGroup.isTouching(fish)){
        fish.destroy();
        gameState = 'end';
    }

    
    drawSprites();

 if(gameState === 'end'){
    coin.velocityX = 0;
    coin.visible = false;

    badfishGroup.velocityX = 0;
    badfishGroup.visible = false;
    badfishGroup.destroyEach();

    invisibleBlockGroup.visible = false;
    invisibleBlockGroup.destroyEach();
    
    sea.velocityX = 0;

    stroke('red');
    fill('red');
    text("Game Over",300,300);
    textSize(30);
 }
 text("score: "+ score,400,30); 
 textSize(15);

 
}
function spawnCoins(){
    if(frameCount % 180 === 0){
        coin = createSprite(500)
        coin.addImage(coinImg);

        coin.y = Math.round(random(100,500));
        coin.velocityX = -3;

        coin.scale = 0.2;
 
        coin.lifetime = 800;
        coinsGroup.add(coin);
    }
}

function spawnbadFish(){
    if(frameCount % 35 === 0){
        badfish = createSprite(500);
        badfish.addImage(badfishImg);

        invisibleBlock = createSprite(300,310);
        invisibleBlock.height = 0.3;

        badfish.y = Math.round(random(100,500));
        badfish.velocityX = -3;
        
        badfish.velocityX = -3;

        badfish.scale = 0.2;

        invisibleBlock.x = badfish.x;
        invisibleBlock.velocityX = badfish.velocityX;

        invisibleBlock.y = badfish.y;

        badfishGroup.add(badfish);

        invisibleBlock.lifetime = 800;
        badfish.lifetime = 800;

        invisibleBlock.debug = true;
        invisibleBlockGroup.add(invisibleBlock);
    }
}