var gamePiece;

function startGame() {
	myGameArea.start();
	gamePiece = new component(20, 20, "red", 10, 120);
	updateGameArea();
}

function component(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.update = function() {
		ctx = myGameArea.context;		//hinh tron bitch
	    ctx.fillStyle = color;
	    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
	    ctx.fill();
	}
}

var myGameArea = {
	canvas: document.createElement("canvas"),
	start: function() {
		this.canvas.width = 480;
		this.canvas.height = 210;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas,document.body.childNode);
	},
	clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function updateGameArea(){
	var interval = setInterval(function() {
		myGameArea.clear();
		gamePiece.update();
		if (gamePiece.x == 480 - (gamePiece.width + 1) || gamePiece.y == 210 - (gamePiece.height + 1)) {
			clearInterval(interval);
		}
	},100);
	
}
startGame();