var things = [];
var users = {};
var img;
var imgArray = [];
var foeImg;
var folderPrefix = {0:"plus",1:"minus"};
// var selec
const socket = io();
socket.on("users",function(info){

    //Get all other users' mouse positions
    users = info;
    // console.log(info);
  });
function setup() {
  //Basic p5.js setup
  createCanvas(900,600);
  background(color("#728e51"));
  // img = loadImage('./smaller/plus_1.png');
  for (var i = 0; i < 6; i++){
    var deck = Math.round(random(1));
    console.log(deck);
    var card = Math.floor(random(5));
    card++;
    imgArray.push(loadImage("./smaller/"+folderPrefix[deck]+"/"+folderPrefix[deck]+"-"+(card)+".png"));
    foeImg = loadImage("./smaller/foe.png");
  }


}

function draw() {

  noStroke();
  // image(img, 0, height / 8, img.width / 8, img.height / 8);
  drawBoardPlayingStage();
  drawSideDeck();
  drawFoeSideDeck();


    //Loop through all of the objects, and show them
    

  //Add new item to the list where the mouse is...
  things.push(new Thing(mouseX,mouseY));

  //Now...add all of the other user's mouse positions to the array (FUN!)
  for(var user in users){
    var u = users[user];
    things.push(new Thing(u.x,u.y));

  };

  //We need to send the server our information so the other players can see it
  socket.emit("info",{"x":mouseX,"y":mouseY});

}

function keyPressed(){
  if (keyCode === LEFT_ARROW){
    img = loadImage('./smaller/plus/plus_2.png');
    console.log("key pressed");
  }
}


function drawSideDeck(){
  var playerWidth = width/2-width/40;
  for (var i = 0; i < 4; i++){
    image(imgArray[i], imgArray[i].width/32+i*(playerWidth/4), height -(height/8)-20, imgArray[i].width / 8, imgArray[i].height / 8);
  }
}

function drawFoeSideDeck(){
  var playerWidth = width/2-width/40;
  for (var i = 0; i < 4; i++){
    image(foeImg, imgArray[i].width/8+i*(playerWidth/4)+width/2, height -(height/8)-20, imgArray[i].width / 8, imgArray[i].height / 8);
  }
}

function drawBoardPlayingStage(){
  fill(0);
  rect(width/2-width/40,0,width/20,height);
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      noFill();
      stroke(50);
      strokeWeight(4);
      rect(j*150+20,i*150+20,75,100);
    }
  }
}
