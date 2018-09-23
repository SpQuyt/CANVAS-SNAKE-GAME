var snake;
var radius = 5;
var border = 5;
var stop = 0;

function startGame() {
	myGameArea.start();
	snake = new List();
	snake.addToLast(new component(130, 100));
	// snake.addToLast(new component(130 - radius * 2 - border, 100));				//pos_x-(radius*2-border)*n, pos_y
	// snake.addToLast(new component(130 - (radius * 2 - border) * 2, 100));
	// snake.addToLast(new component(130 - (radius * 2 - border) * 3, 100));
	snake.dx = (radius * 2 + border);
	snake.dy = 0;
	document.addEventListener("keydown", (event) => {
		switch (event.keyCode) {
			case 37:
				snake.dx = -(radius * 2 + border);
				snake.dy = 0;
				break;
			case 38:
				snake.dx = 0;
				snake.dy = -(radius * 2 + border);
				break;
			case 39:
				snake.dx = (radius * 2 + border);
				snake.dy = 0;
				break;
			case 40:
				snake.dx = 0;
				snake.dy = (radius * 2 + border);
				break;
		}
	});
	updateGameArea();
}

function create_obs() {
	obstacle(180, 120);
	obstacle(150, 160);
}


function obstacle(x, y) {
	// this.width = width;
	// this.height = height;
	// this.ax;
	// this.ay;
	// this.px;
	// this.py;
	this.delta = 30;
	ctx = myGameArea.context;
	ctx.beginPath();													// luon luon phai co begin :D
	ctx.moveTo(x, y);
	ctx.lineTo(x, y + this.delta);
	ctx.lineWidth = border;
	ctx.strokeStyle = "red";
	ctx.stroke();
}

function component(x, y) {
	// this.width = width;
	// this.height = height;
	// this.ax;
	// this.ay;
	// this.px;
	// this.py;
	this.colorbody = "red";
	this.colorhead = "white";
	this.radius = radius;
	this.pos_x = x;
	this.pos_y = y;
	this.next = null;
}

function List() {
	this.dx = 0;
	this.dy = 0;
	this.head = new component();
	this.length = 0;
	this.addToLast = function (anode) {
		curnode = this.head;

		if (curnode.next == null) {
			curnode.next = anode;
		}
		else {
			while (curnode.next != null) {
				curnode = curnode.next;
			}
			curnode.next = anode;
		}
		this.length++;
	};
	this.deleteLast = function () {
		after = this.head;
		to_del = this.head;
		while (to_del.next != null) {
			after = to_del;
			to_del = to_del.next;
		}
		after.next = null;
		delete to_del;
	};
	this.move = function () {
		temp = new component();
		temp.pos_x = this.head.next.pos_x + this.dx;
		temp.pos_y = this.head.next.pos_y + this.dy;
		temp.next = this.head.next;
		this.head.next = temp;
		this.deleteLast();
		redraw();
		if (this.head.next.pos_x == 490 ||
			this.head.next.pos_y == 490 ||
			this.head.next.pos_x == -5 ||
			this.head.next.pos_y == -5) {
			stop = 1;
		}
		// if (map[temp.pos_x][temp.pos_y] != '◦'){
		// 	this.deleteLast();
		// }
		// else{
		// 	this.length++;
		// 	generate_food()
		// }
	};
}

function redraw() {												//this function is to DRAW.
	temp = new component();
	temp.pos_x = snake.head.next.pos_x;
	temp.pos_y = snake.head.next.pos_y;
	temp.next = snake.head.next;
	while (temp != null) {											//neu la dau con ran thi to white
		ctx = myGameArea.context;
		ctx.beginPath();													// luon luon phai co begin :D
		if (temp == snake.head.next) {
			ctx.fillStyle = temp.colorhead;
		}
		else {
			ctx.fillStyle = temp.colorbody;
		}
		ctx.lineWidth = 10;
		ctx.arc(temp.pos_x, temp.pos_y, temp.radius, 0, 2 * Math.PI);			//hinh tron bitch
		// ctx.rect(temp.pos_x, temp.pos_y, temp.radius*2, temp.radius*2);		//hinh tu giac bitch
		ctx.strokeStyle = "black";
		ctx.stroke();														// to vien
		ctx.fill();															//to mau
		temp = temp.next;
	}
}

var myGameArea = {
	canvas: document.getElementById("mycanvas"),
	start: function () {
		this.canvas.width = 480;
		this.canvas.height = 480;
		this.context = this.canvas.getContext("2d");
	},
	clear: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);			//phai xoa duoc hinh tron
	}
}

function updateGameArea() {
	var interval = setInterval(function () {
		myGameArea.clear();
		snake.pos_x += snake.dx;
		snake.pos_y += snake.dy;
		snake.move();
		if (stop == 1) {
			clearInterval(interval);
		}
	}, 100);
}

startGame();
