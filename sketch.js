var bgImg;
var hotAirBallon,hotAirBallonImg, balloonImage2;
var database,positions;

function preload(){
  hotAirBallonImg=loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png");
  balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
 "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  bgImg=loadImage("cityimage.png");
}
function setup() {
  createCanvas(1350,600);

  database=firebase.database();

  hotAirBallon = createSprite(400, 200, 50, 50);
  hotAirBallon.addAnimation("ground",hotAirBallonImg);
  hotAirBallon.scale=0.5;

  var hotAirBallonposition=database.ref('hotAirBallon/height');
  hotAirBallonposition.on("value",readpos , showError)
}
//readHeight
function draw() {
  background(bgImg); 
  if(keyDown(LEFT_ARROW)){
    // changePosition(-1,0);
    hotAirBallon.x = hotAirBallon.x -10;
}
else if(keyDown(RIGHT_ARROW)){
    // changePosition(1,0);
    hotAirBallon.x = hotAirBallon.x +10;
}
else if(keyDown(UP_ARROW)){

  hotAirBallon.addAnimation("ground",hotAirBallonImg);
  hotAirBallon.scale=hotAirBallon.scale -0.01;
  hotAirBallon.y = hotAirBallon.y -10;
}
else if(keyDown(DOWN_ARROW)){
    // changePosition(0,+1);
    hotAirBallon.addAnimation("ground",hotAirBallonImg);
    hotAirBallon.scale=hotAirBallon.scale +0.01;

    hotAirBallon.y = hotAirBallon.y +10;

}
  drawSprites();
}
function changePosition(x,y)
{
    database.ref("hotAirBallon/position").set({
        x : position.x+x,
        y: position.y + y 
    })
}
// .on  = read , .set = write , .update = modify

function readpos(data)
{
 position = data.val();
 hotAirBallon.x = position.x 
 hotAirBallon.y = position.y
}

function updateHeight()
{
  database.ref('balloon/height').set({
   'x' : height.x + x,
    'y' : height.y+y
  })
}
 
function readHeight(data)
{
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError()
{
  console.log("Error in writing to the database");
}
