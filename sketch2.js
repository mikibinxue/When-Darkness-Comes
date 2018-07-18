"use strict";
var cvs;
//var fontRegular, fontItalic;
var displayRot = 0;


var clock;
var button;

//for the link
var myLink;

// function preload() {
// 	fontRegular = loadFont("fonts/JosefinSans-Regular.ttf");
// 	fontItalic = loadFont("fonts/JosefinSans-Italic.ttf");
// }


function setup() {
	cvs = createCanvas(windowWidth, windowHeight);
	cvs.parent('cvs_div');

	background(0);
	clock = new Rotateclock(width / 2, height / 2);
	button = new Button(width-200, 500, "confirm");

	//for the link
	myLink = createA('10.html', 'this is a link');
	myLink.style('display', 'none');

}

function draw() {
	// rotA -= 0.01;
	background(0);
	// textFont(fontRegular);

	clock.checkDrag();
	clock.update();
	clock.display();
	//for the instruction
	push();
	textSize(30);
	fill(255);
	text("Rotate the handle to put in the number:", 20, 80);
	pop();

	//for the angle display:
	push();
	fill(255);
	//display the angle
	textSize(30);
	text("the angle is", 100, 100);

	//check if or not the angle is over 180
	displayRot = floor(degrees(clock.rotA));
	if (displayRot < 0) {
		displayRot += 360;
	}
	text(displayRot, 100, 200);
	pop();


	//for the submit button
	button.checkEdges();
	button.update(displayRot);
	button.display();

}


class Rotateclock {
	constructor(x, y) {
		this.rad = 500;
		this.pos = createVector(x, y);
		this.rotA = 0;
		this.cursor = createVector(0, 0);
		this.startDrag = false;
		this.color = color(255, 0, 0);
		this.vectorMove = createVector(0, 0);
	}

	update() {

		// to caculate the vector of the movement
		if (this.startDrag) {
			var currentMouse = createVector(mouseX, mouseY);
			var mouseVector = p5.Vector.sub(currentMouse, this.pos);
			this.rotA = mouseVector.heading();
			print(this.rotA);
		}

		this.cursor.x = this.pos.x + cos(this.rotA) * this.rad / 2;
		this.cursor.y = this.pos.y + sin(this.rotA) * this.rad / 2;

	}

	display() {

		//for the clock 
		push();
		noStroke();
		fill(76, 64, 0);
		ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
		pop();

		//for the arm
		push();
		strokeWeight(5);
		line(this.pos.x, this.pos.y, this.cursor.x, this.cursor.y);
		pop();

		pop();

		//for the arm cursor
		push();
		fill(this.color);
		// rotate(this.rotA);
		ellipse(this.cursor.x, this.cursor.y, 50, 50);
		pop();
	}

	checkDrag() {
		var dis = dist(mouseX, mouseY, this.cursor.x, this.cursor.y);
			console.log("dis: "+dis);

			if(dis < 50){
				cursor(HAND);
	}else{
		cursor(ARROW);
	}	
	if (mouseIsPressed) {
			
			if (dis < 50) {
				this.startDrag = true;
				
				this.color = color(0, 255, 0);
			}
		} else {
			// cursor(CROSS);
			this.color = color(255, 0, 0);
			this.startDrag = false;
		}
	}
}

class Button {
	constructor(x, y, txt) {
		this.x = x;
		this.y = y;
		this.width = 100;
		this.height = 60;
		this.text = txt;
		this.clicked = false;
		this.dialed = false;
		this.iscounting = false;
		this.counter = 20;
	}

	update(displayRot) {

		if ((this.clicked) && (!this.dialed)) {
			//check if the number input is right
			print(displayRot);
			if (displayRot == 135) {
				window.location.href = "12.html"; //enable the next div
				print("yes");
			} else {
				push();
				textSize(45);
				fill(255, 0, 0);
				text("Wrong! Try again!", width / 2, height / 2);
				pop();
			}


			// push();
			// fill(255, 0, 0);
			// textSize(45);
			// text("submitted", width / 2, height / 2);
			// pop();
		}
	}

	display() {
		push();
		rectMode(CENTER);
		textAlign(CENTER);

		//key
		noStroke();
		if (this.clicked) {
			fill(100);
		} else {
			fill(255);
		}
		rect(this.x, this.y, this.width, this.height, 20);

		//key number
		fill(0);
		textSize(25);
		text(this.text, this.x, this.y);
		pop();
	}

	checkEdges() {
		if ((mouseX > this.x - this.width / 2) && (mouseX < this.x + this.width / 2) && (mouseY > this.y - this.height / 2) && (mouseY < this.y + this.height / 2) && (mouseIsPressed)) {
			this.clicked = true;
		} else {
			this.clicked = false;
		}
	}
}



// function submitData() {
// 	if (displayRot == 135) {
// 		print("yes");
// 	} else {
// 		print("no");
// 	}
// }