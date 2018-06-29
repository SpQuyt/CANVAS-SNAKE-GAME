var gamePiece;

function startGame() {
	myGameArea.start();
	gamePiece = new List();
	gamePiece.addToLast(new component(130,100));
	gamePiece.addToLast(new component(130-10*2-10,100));
	gamePiece.addToLast(new component(130-(10*2-10)*2,100));
	gamePiece.addToLast(new component(130-(10*2-10)*3,100));
	gamePiece.dx = 30;
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

function component(x, y) {
	// this.width = width;
	// this.height = height;
	// this.dx;
	// this.dy;
	this.color = "red";
	this.radius = 10;
	this.pos_x = x;
	this.pos_y = y;
	this.next = null;
	ctx = myGameArea.context;			
	ctx.beginPath();													// luon luon phai co begin :D
    ctx.fillStyle = this.color;
    ctx.lineWidth = 10;
    ctx.arc(this.pos_x, this.pos_y, this.radius, 0, 2 * Math.PI);			//hinh tron bitch
    // ctx.rect(this.pos_x, this.pos_y, this.height, this.width);		//hinh tu giac bitch
    ctx.stroke();														// to vien
    ctx.fill();															//to mau
}

function List(){
	this.dx = 0;
	this.dy = 0;
	this.head = new component();
	this.length = 0;
	this.addToLast = function(anode){
		curnode = this.head;

		if (curnode.next == null){
			curnode.next = anode;
		}
		else{
			while(curnode.next != null){
				curnode = curnode.next;
			}
			curnode.next = anode;
			this.length++;
		}
	};
	this.deleteLast = function(){
		after = this.head;
		to_del = this.head;
		while (to_del.next != null){
			after = to_del;
			to_del = to_del.next;
		}
		after.next = null;
		delete to_del;
	};
	this.move = function(){
		temp = new component();
		temp.pos_x = this.head.next.pos_x + this.dx;
		temp.pos_y = this.head.next.pos_y + this.dy;
		temp.next = this.head.next;
		this.head.next = temp;
		this.deleteLast();
		redraw();
		// if (map[temp.pos_x][temp.pos_y] != '◦'){
		// 	this.deleteLast();
		// }
		// else{
		// 	this.length++;
		// 	generate_food()
		// }
	}
}

function redraw() {												//this function is to DRAW.
		temp = new component();
		temp.pos_x = gamePiece.head.next.pos_x;
		temp.pos_y = gamePiece.head.next.pos_y;
		temp.next = gamePiece.head.next;
		while (temp != null){
			ctx = myGameArea.context;			
			ctx.beginPath();													// luon luon phai co begin :D
		    ctx.fillStyle = temp.color;
		    ctx.lineWidth = 10;
		    ctx.arc(temp.pos_x, temp.pos_y, temp.radius, 0, 2 * Math.PI);			//hinh tron bitch
		    // ctx.rect(this.pos_x, this.pos_y, this.height, this.width);		//hinh tu giac bitch
		    ctx.stroke();														// to vien
		    ctx.fill();															//to mau
		    temp = temp.next;													
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
		gamePiece.pos_x += gamePiece.dx;
		gamePiece.pos_y += gamePiece.dy;
		gamePiece.move();
		// if (gamePiece.pos_x == myGameArea.canvas.width - gamePiece.radius || gamePiece.pos_y == myGameArea.canvas.height - gamePiece.radius) {	//TÂM CỦA NÓ Ở TOẠ ĐỘ (10,120)
		// 	clearInterval(interval);
		// }
	},100);
}

startGame();
