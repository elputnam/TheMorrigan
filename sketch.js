//Triple spiral set up for screenprinting

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

function setup() {
  //cnv = createCanvas(3860, 3860);
  createCanvas(windowHeight, windowHeight)
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  background(0);
  frameRate(1);
  rectMode(CENTER);
  radInc = random(2);
  angInc = random(5);
  for (let i = 0; i < 20; i++){
    glitches[i] = new Glitch(random(width), random(height), random(width), random(1,10));
  }
}

function draw() {
  background(255);
  // fill(0);
  // stroke(0);
  //glitches
  for(let i = 0; i < glitches.length; i++){
    glitches[i].show();
    if (frameCount%8==0){
      glitches[i].change();
    }
  }

  //TRiangle
  push();
  translate(width/2, height/2);
  noFill();
  strokeWeight(random(1,10));
  // strokeWeight(25);
  stroke(180, random(100), tone);

  triangle(random(-500, 500), -1500, 1500, random(500, 2000), -1500, random(500, 2000));
  pop();
  

  //Spirals
  //change
  radInc = random(4);
  angInc = random(10);
  //spiral 1
  push();
  translate(width/2, height/2-100);
  spiral();
  pop();

  //spiral 2
  push();
  translate(width*.35, height/2+250);
  spiral();
  pop();

  //spiral 3
  push();
  translate(width*.65, height/2+250);
  spiral();
  pop();

}
  
function spiral(){
  for (let i = 0; i < 500; i++){
    radInc = random(2);
  angInc = random(5);
    push();
    rotate(angle);
    angle += angInc;
    radius += radInc;
    stroke(random(300, 360), 100, tone);
    strokeWeight(random(1,10));
    
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
    stroke(70, 100, 100);
    fill(70, 100, 100, random(100));
    rect(this.x, this.y, this.wid, this.high);
  }
}


function keyPressed(){
  if (key == 'c' || key == 'C') {
    saveCanvas("Morrigan", 'png');
  }
}
