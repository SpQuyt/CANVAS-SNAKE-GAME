var gamePiece;

function startGame() {
	myGameArea.start();
	gamePiece = new component(10, "red", 10, 120);
	gamePiece.dx = 1;
	gamePiece.dy = 0;
	document.addEventListener("keydown", (event) => {
			    switch (event.keyCode) {
			    	case 37:
			    		gamePiece.dx = -1;
			    		gamePiece.dy = 0;
			    		break;
			    	case 38:
			    		gamePiece.dx = 0;
			    		gamePiece.dy = -1;
			    		break;
			    	case 39:
			    		gamePiece.dx = 1;
			    		gamePiece.dy = 0;
			    		break;
			    	case 40:
			    		gamePiece.dx = 0;
			    		gamePiece.dy = 1;
			    		break;
			    }
			});
	updateGameArea();
}

function component(radius, color, x, y) {
	// this.width = width;
	// this.height = height;
	this.dx;
	this.dy;
	this.radius = radius;
	this.x = x;
	this.y = y;
	this.update = function() {										//this function is to DRAW.
		ctx = myGameArea.context;			
		ctx.beginPath();											// luon luon phai co begin :D
	    ctx.fillStyle = color;
	    ctx.lineWidth = 10;
	    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);		//hinh tron bitch
	    // ctx.rect(this.x, this.y, this.height, this.width);		//hinh tu giac bitch
	    ctx.stroke();												// to vien
	    ctx.fill();													//to mau
	}
}

var myGameArea = {
	canvas: document.getElementById("mycanvas"),
	start: function() {
		this.canvas.width = 480;
		this.canvas.height = 480;
		this.context = this.canvas.getContext("2d");
	},
	clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);			//phai xoa duoc hinh tron
	}
}

function updateGameArea(){
	var interval = setInterval(function() {
		myGameArea.clear();
		gamePiece.x += gamePiece.dx;
		gamePiece.y += gamePiece.dy;
		gamePiece.update();
		if (gamePiece.x == myGameArea.canvas.width - gamePiece.radius || gamePiece.y == myGameArea.canvas.height - gamePiece.radius) {	//TÂM CỦA NÓ Ở TOẠ ĐỘ (10,120)
			clearInterval(interval);
		}
	},10);
	
}

startGame();
