//Triple spiral set up for video

// shapes
let angle = 0;
let radius = 0;
let spot = 0;
let radInc;
let angInc;
let tone = 100;
let x;
let y;
let glitches = [];

let cnv;

//CCapture
// var capture = false; // default is to not capture frames, can be changed with button in browser
var capturer = new CCapture({
  format:'webm', 
  workersPath: 'js/',
  framerate: 5
});

function setup() {
  //cnv = createCanvas(3860, 3860);
  createCanvas(2000, 1200)
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  background(255);
  frameRate(5);
  rectMode(CENTER);
  radInc = random(2);
  angInc = random(5);
  for (let i = 0; i < 20; i++){
    glitches[i] = new Glitch(random(width), random(height), random(width), random(1,10));
  }
}

function draw() {
   if (frameCount==1) capturer.start(); //
  background(255);
  // fill(0);
  // stroke(0);
  //glitches
  for(let i = 0; i < glitches.length; i++){
    glitches[i].show();
    // if (frameCount%5==0){
      glitches[i].change();
    // }
  }

  //TRiangle
  // push();
  // translate(width/2, height/2);
  // noFill();
  // strokeWeight(random(5,20));
  // // strokeWeight(25);
  // stroke(0);

  // triangle(random(-300, 500), -300, 500, random(300, 500), -300, random(300, 500));
  // pop();
  

  //Spirals
  //change
  radInc = random(3);
  angInc = random(10);
  //spiral 1
  push();
  translate(width/2, height/2-100);
  spiral();
  pop();

  //spiral 2
  push();
  translate(width*.35, height/2+100);
  spiral();
  pop();

  //spiral 3
  push();
  translate(width*.65, height/2+100);
  spiral();
  pop();

  capturer.capture(document.getElementById('defaultCanvas0'));  
  if (frameCount==3000){
    save_record();
  }
  print(frameCount);

}
  
function spiral(){
  for (let i = 0; i < 500; i++){
    radInc = random(2);
  angInc = random(5);
    push();
    rotate(angle);
    angle += angInc;
    radius += radInc;
    stroke(0);
    strokeWeight(random(10,20));
    
    // ellipse(radius,spot,random(5,10), random(5,10));
    point(radius,spot);
    pop();
    if (radius>=10){
      radius = random(-width*.2, width*.2);
      spot = random(-width*.2, width*.2)
      tone = random(100)
    }
  }
}

class Glitch{
  constructor(x, y, wid, high){
    this.x = x;
    this.y = y;
    this.wid = wid;
    this.high = high;
  }
  change(){
    this.x = random(width);
    this.y = random(height);
    this.wid = random(width);
    this.high = random(1,10);
  }
  show(){
    //noStroke();
    //noFill();
    stroke(0);
    fill(0);
    rect(this.x, this.y, this.wid, this.high);
  }
}


function keyPressed(){
  if (key == 'c' || key == 'C') {
    saveCanvas("Morrigan", 'png');
  }
}

function save_record() {
  capturer.save();
}
