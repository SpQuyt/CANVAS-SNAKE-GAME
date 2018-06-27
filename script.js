var gamePiece;

function startGame() {
	myGameArea.start();
	gamePiece = new component(10, "red", 10, 120);
	updateGameArea();
}

function component(radius, color, x, y) {
	// this.width = width;
	// this.height = height;
	this.radius = radius;
	this.x = x;
	this.y = y;
	this.update = function() {										//this function is to DRAW.
		ctx = myGameArea.context;		
		ctx.beginPath();
	    ctx.fillStyle = color;
	    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);		//hinh tron bitch
	    // ctx.rect(this.x, this.y, this.height, this.width);		//hinh tu giac bitch
	    ctx.fill();
	}
}

var myGameArea = {
	canvas: document.getElementById("mycanvas"),
	start: function() {
		this.canvas.width = 480;
		this.canvas.height = 210;
		this.context = this.canvas.getContext("2d");
		// document.body.insertBefore(this.canvas,document.body.childNode);
	},
	clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);			//phai xoa duoc hinh tron
	}
}

function updateGameArea(){
	var interval = setInterval(function() {
		myGameArea.clear();
		gamePiece.x += 1;
		gamePiece.update();
		if (gamePiece.x == myGameArea.canvas.width - gamePiece.radius || gamePiece.y == myGameArea.canvas.height - gamePiece.radius) {	//TÂM CỦA NÓ Ở TOẠ ĐỘ (10,120)
			clearInterval(interval);
		}
	},10);
	
}
		
startGame();
