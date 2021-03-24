var balloon,background
var database;
var position;
var backgroundImg

function preload(){
   backgroundImg =loadImage("cityImage.png");
   balloonImage=loadAnimation("HotAirBallon-01.png","HotAirBallon-02.png","HotAirBallon-03.png");
   
  }


  function setup() {
  database=firebase.database();
  console.log(database);

  createCanvas(1000,800);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage);
  balloon.scale=0.4;

  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readHeight, showError);
  
}

function draw() {
  background(backgroundImg);

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x-10
   
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x+10
  }
  else if(keyDown(UP_ARROW)){
   balloon.y = balloon.y-10
    
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y+10    
    
  }
  

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
  
}


function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}
