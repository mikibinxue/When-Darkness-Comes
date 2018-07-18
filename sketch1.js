"use strict";

var dialkeys = [];
var tempString = "";
var callkey;

var cvs;

//to change the html
var myLink;

function setup() {
	cvs = createCanvas(600, 600);
	cvs.parent('cvs_div');

	//7
	dialkeys.push(new Dialkey(100, 250, "7"));
	//8
	dialkeys.push(new Dialkey(300, 250, "8"));
	//9
	dialkeys.push(new Dialkey(500, 250, "9"));
	//4
	dialkeys.push(new Dialkey(100, 350, "4"));
	//5
	dialkeys.push(new Dialkey(300, 350, "5"));
	//6
	dialkeys.push(new Dialkey(500, 350, "6"));
	//1
	dialkeys.push(new Dialkey(100, 450, "1"));
	//2
	dialkeys.push(new Dialkey(300, 450, "2"));
	//3
	dialkeys.push(new Dialkey(500, 450, "3"));

	//call key
	callkey = new Callkey(300, 550, "Call");


	//for the link
	myLink = createA('6.html', 'this is a link');
	myLink.style('display', 'none');
}

function draw() {
	background(200);

	//the showing screen;
	rectMode(CENTER);
	textAlign(CENTER);

	fill(255);
	rect(300, 50, 600, 200);
	fill(0);
	textSize(70);
	text(tempString, 300, 100);


	//the keys
	for (var i = 0; i < 9; i++) {
		dialkeys[i].checkEdges();
		dialkeys[i].update();
		dialkeys[i].display();
	}


	callkey.checkEdges();
	callkey.update();
	callkey.display();

}

class Dialkey {
	constructor(x, y, number) {
		this.x = x;
		this.y = y;
		this.width = 150;
		this.height = 80;
		// this.clr = 255;
		this.number = number;
		this.clicked = false;
		this.dialed = false;
		this.iscounting = false;
		this.counter = 20;

	}

	update() {
		if ((this.clicked) && (!this.dialed)) {
			tempString += this.number;
			this.dialed = !this.dialed;
			this.iscounting = true;
		}

		if (this.iscounting) {
			this.counter--;

			if (this.counter == 0) {
				this.counter = 20;
				this.dialed = false;
				this.iscounting = false;
			}
		}
	}

	display() {
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
		textSize(45);
		text(this.number, this.x, this.y);
	}

	checkEdges() {
		if ((mouseX > this.x - this.width / 2) && (mouseX < this.x + this.width / 2) && (mouseY > this.y - this.height / 2) && (mouseY < this.y + this.height / 2) && (mouseIsPressed)) {
			this.clicked = true;
		} else {
			this.clicked = false;
		}
	}
}


class Callkey extends Dialkey {
	constructor(_x, _y, _number) {
		super(_x, _y, _number);
	}

	update() {
		if (this.clicked) {
			
			if (this.checkNumber()) {
				textSize(50);
				fill(0,255,0);
				text("Correct",width/2,height/2);
				window.location.href = "9.html";
				document.getElementById("explain").style.display = "none";
			}else{
                textSize(50);
                fill(255,0,0);
				text("Wrong Number!",width/2,height/2);
				document.getElementById("bg7").style.display = "block";
				document.getElementById("book").style.display = "block";
				document.getElementById("cvs_div").style.display = "none";
				document.getElementById("explain").style.display = "none";
			}

		}
	}

	display() {
		rectMode(CENTER);
		textAlign(CENTER);

		//key
		noStroke();
		if (this.clicked) {
			fill(color(100, 255, 0));
		} else {
			fill(color(0, 255, 0));
		}

		rect(this.x, this.y, this.width, this.height, 20);

		//key number
		fill(255);
		textSize(45);
		text(this.number, this.x, this.y);
	}


	checkNumber() {
		if (tempString == "287694") {
			print("here");
			return true;
		} else {
			tempString="";
			return false;

		}
	}
}