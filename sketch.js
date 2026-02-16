//WeeklySketch<2>: Use an API<#22>
//Soham Chakraborty

//------Rules and controls of the game-----------
  
  // Controls: F:Get Word on Console | P:PenTool | E:Erasor | Z:Undo | MouseWheel:Brush Size
  // Rule: The person who sketches turns the screen away from other players. Press F to get the word. Then clear the console using the clear button on the bottom of the webpage. Then turn the screen towards the remaining players and start a timer of 90 seconds in which the player gets to draw and the other players have to guess. The game can be played as individuals or in teams.

//-----------------------------------------------

//Declaring Global Variables:

//Checks placed to identify different states of the program
let play=0;         // Checks if the game has started or not
let check=0;        // Checks if something is drawn on screen or not
let counterclick=0; // Checks the number of clicks at the start of the game to avoid drawing on the                         // first click which is required to start the game!
let tool=1;         // Checks if the current tool is pen or erasor.

//-----------------------
// Variable to hold state of the program. Holds the values of all the coordinates in which drawing/erasing is done.
let arr=[];
//-----------------------


let brushsize=10;// Decides the brush size
let undolimit=10;// Number of spots removed when undo action is taken.
let pencolor="white"; // color of the pen. Currently only white for pen and black for erasor.
let pictionary_word="Waiting for Word!";// to hold the value of the random word given by the API for the //game.

//-----------------------

//Variables holding API details
const url = 'https://pictionary-charades-word-generator.p.rapidapi.com/charades?difficulty=easy';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '67255a7470msh7e3534a3daba27bp106a52jsn515342370f18',
		'x-rapidapi-host': 'pictionary-charades-word-generator.p.rapidapi.com'
	}
};

//------------------------



function setup() {
  createCanvas(windowWidth, windowHeight);
   background(0);
  fill(255);
  textAlign("center");
  textSize(30);
  text("Welcome to Pictionary Paint Tool\nClick to Start",windowWidth/2,windowHeight/2);
  textSize(20);
  text("Controls:\nF:Get Word on Console\nP:PenTool\nE:Erasor\nZ:Undo\nMouseWheel:Brush Size",windowWidth/2,(windowHeight/2)+100);
}



function draw() {
  if(play===1){
  noStroke();
  if(check==0){
    background(0);
     savedState();
    drawCursor();
     
  }
  }
 
}

// Function to draw the cursor on screen. Circle for pentool and square for erase tool.
function drawCursor(){
   if(tool===1){
      fill("white");
    circle(mouseX, mouseY, brushsize);
    }
    else if(tool==0){
      fill("white");
      rect(mouseX, mouseY, brushsize);
    }
}


// On Mouse Press the game starts and the player can draw
function mousePressed(){
  play=1;
  if(counterclick<2){
  counterclick=counterclick+1;
  }
  if(counterclick>1){
  updateState(mouseX,mouseY,brushsize);
}
}


// The player can draw using mouse.
function mouseDragged(){
  if(counterclick>1){
  updateState(mouseX,mouseY,brushsize);
  }
  
}

// When mouse released, draw function takes hold and previously saved states are displayed, i.e, the drawing doesn't disappear.
function mouseReleased(){
  check=0;
}

// Changes brush size
function mouseWheel(){
  if(event.delta<0){
    brushsize=brushsize+2;
  }
  else if(event.delta>0 && brushsize>=5){
    brushsize=brushsize-2;
  }
}

// Registers different keys for different actions
function keyPressed(){
  if(key==="e"){
    tool=0; // Erase tool 
    }
  else if(key==="p"){
    tool=1; // Pen tool
  }
  else if(key==="z"&& arr.length>0){
      for(j=0;j<undolimit;j++){
        arr.pop() // Undo
    }
    }
  else if(key==="f"){
    gettingData();// Getting data from API
  }
}


// Makes marks on the screen.
function updateState(X,Y,brsize){
  check=1;
   let currentcolor;
  if(tool===1){
    currentcolor=pencolor;
  }
  
   else if(tool===0){
     currentcolor="black";   
    }
  fill(currentcolor);
  circle(X,Y,brsize);
  storeState(X,Y,brsize,currentcolor);
}



// Saves/stores the drawing made on the screen.
function storeState(X,Y,brsize,ccolor){
   let coor={
       x: X,
       y: Y,
    bsize: brsize,
    coorcolor:ccolor,
    };
  arr.push(coor);   
}

// Renders the saved state on the screen on every frame as draw is called.
function savedState(){
  for( i=0;i<arr.length;i++){
      fill(arr[i].coorcolor);
      circle(arr[i].x,arr[i].y,arr[i].bsize);
     }
}

// Function that gets the API from the website: https://rapidapi.com/kwik-api-kwik-api-default/api/pictionary-charades-word-generator/playground/apiendpoint_e932f144-2c1d-4fab-8d7b-8a89e2d9244e

async function gettingData(){
   try {
    const response = await fetch(url, options);
    const data = await response.json(); // Convert response to JSON
    pictionary_word = data.word; // Extract the word from API response
    console.log(pictionary_word);
  } catch (error) {
    console.error("Error fetching data:", error);
    word = "Error loading word";
  }

}


