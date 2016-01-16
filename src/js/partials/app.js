var TO_RADIANS = Math.PI/180;

function Spaceship(ctx,x,y,angle) {
	this.ctx = ctx;
	this.image = document.getElementById('spaceShip');
	this.x = x;
	this.y = y;
	this.w = 30;
	this.h = 30;
	this.angle = angle;
}

Spaceship.prototype.draw = function() {
	this.ctx.clearRect(0,0,W,H);

	this.ctx.save();
	this.ctx.translate(this.x, this.y);
	this.ctx.rotate(this.angle * TO_RADIANS);
	this.ctx.drawImage(this.image, -(this.w/2), -(this.h/2));
	this.ctx.restore();
}

Spaceship.prototype.rotate = function(alpha) {	//поворот угла
	this.angle += alpha;
}

Spaceship.prototype.move = function(dx) {	//поворот угла
	if( this.x +dx*Math.cos((this.angle-90)*TO_RADIANS) > 0 && this.x + dx*Math.cos((this.angle-90)*TO_RADIANS)< 600&& this.y + dx*Math.sin((this.angle-90)*TO_RADIANS) >0 && this.y + dx*Math.sin((this.angle-90)*TO_RADIANS) < 600){
		this.x += dx*Math.cos((this.angle-90)*TO_RADIANS);
		this.y += dx*Math.sin((this.angle-90)*TO_RADIANS);
	}
}

function Strela (ctx,x,y,angle) {
	this.ctx = ctx;
	this.image = document.getElementById('strela');
	this.x = x;
	this.y = y;
	this.w = 15;
	this.h = 15;
	this.angle = angle;
}

Strela.prototype.moveSt = function(dx) {
	if( this.x > -50 && this.x < 650&& this.y >-50 && this.y < 650){
		this.x+=dx*Math.cos(this.angle*TO_RADIANS);
		this.y+=dx*Math.sin(this.angle*TO_RADIANS);
	}
}

Strela.prototype.drawSt = function() {
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.arc(this.x,this.y,10,0,2*Math.PI,true);
	this.moveSt(1);
	ctx.fill();
	ctx.closePath();
}

function Enemy(ctx,x,y,v,al) {
	this.ctx = ctx;
	this.image = document.getElementById('enemy');
	this.x = x;
	this.y = y;
	this.w = 20;
	this.h = 20;
	this.v = v;
	this.alive = al;
}

Enemy.prototype.drawenemy=function() {
	if(this.y < 600)
	this.moveEn();

	if(this.alive == true)this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
}

Enemy.prototype.moveEn = function() {
	this.y += this.v;
}

Enemy.prototype.collision = function(x,y, w, h) {
	var xcol = false;
	var ycol = false;
	if(this.x < 600 && this.y < 600 && x < 600&& y < 600 && this.x > 0 && this.y > 0 && x > 0 && y > 0)
	{
		if((this.x + this.w >= x) && (this.x <= x + w)) xcol = true;
		if((this.y + this.h >= y) && (this.y <= y + h)) ycol = true;
		if(xcol&ycol) return true;
		else return false;
	}
}

var masEnemy = [];
var count;
var ctx = document.getElementById("myCanvas").getContext('2d');
var score = 0;
var spaceship = new Spaceship(ctx,300,300,0);
var W = document.getElementById("myCanvas").width;
var H = document.getElementById("myCanvas").height;
var colSt = []; colEn = [];
var aliveEnemy = [];
window.addEventListener('load', function(){
	setInterval(function(){
		count = Math.floor(Math.random()*3);
		for (var i = 0; i < count; i ++) {
			masEnemy.push(new Enemy(ctx, Math.random()*600, 0, Math.random()*5, true));
		}
	}, Math.random()*(3000-1000) + 1000);

	setInterval(function() {
		spaceship.draw();
		for(var i = 0; i < str.length;i++)
		for(var j = 0; j < masEnemy.length; j++) {
			if(masEnemy[j].collision(str[i].x - str[i].w/2, str[i].y -str[i].h/2 , str[i].w, str[i].h)){
				colSt[i] = 1; colEn[j] = 1; score++;
			}
		}
		for(var j = 0; j < masEnemy.length; j++) {
			if(masEnemy[j].collision(spaceship.x-spaceship.w/2, spaceship.y-spaceship.h/2, spaceship.w, spaceship.h)){
				colEn[j] = 1;
				score++;
			}
		}
		for(var i = 0; i < str.length;i++)
			if(colSt[i]!=1) str[i].drawSt();
			else {
				str[i].y = 1000;
		}

		for(var j = 0; j < masEnemy.length; j++){
			if(colEn[j]==1){
				colEn.splice(j,1);

				masEnemy.splice(j,1);
			}
		}
		for(var j = 0; j < masEnemy.length; j++) masEnemy[j].drawenemy();
	}, 1000 / 60);
});
var str = [];
var numberSt = 0;

window.addEventListener('keydown', function(event) {
	if(event.keyCode==37) {
		console.log("37");

		spaceship.rotate(-5);
	}
	if(event.keyCode==39) {
		console.log("39");

		spaceship.rotate(5);
	}
	if(event.keyCode ==32) {
		console.log("32");
		p = new Strela(ctx,spaceship.x,spaceship.y,spaceship.angle-90);
		str.push(p);
		console.log(parseInt(numberSt));

		numberSt++;
	}
	if(event.keyCode == 38) {
		console.log("38");
		spaceship.move(5);
	}
});