var canvas = document.querySelector('.gameCanvs');
var gameScore = document.querySelector('#gameScore');
var pauseGame = document.querySelector('#pauseGame');
var ctx = canvas.getContext('2d');
var row = canvas.height / 20;
var col = canvas.width / 20;
var total=0;
var fruit,stone,obstacle,snake,interval,pause=true;
var flag1,flag2,flag3,speed=100;

function Fruit() {
	
	this.x;
	this.y;
	this.pickLocation = function() {
		this.x = (Math.floor(Math.random()*row-1)+1)*20;
		this.y = (Math.floor(Math.random()*row-1)+1)*20;
	}
	this.draw = function() {
		ctx.fillStyle = 'red'
		ctx.fillRect(this.x,this.y,20,20);
	}
}

function Stones() {
	
	this.x;
	this.y;
	this.pickLocation = function() {
		this.x = (Math.floor(Math.random()*row-1)+1)*20;
		this.y = (Math.floor(Math.random()*row-1)+1)*20;
	}
	this.draw = function() {
		ctx.fillStyle = 'green'
		ctx.fillRect(this.x,this.y,20,20);
	}
}

function Obstacles() {
	
	this.x;
	this.y;
	this.pickLocation = function() {
		this.x = (Math.floor(Math.random()*row-1)+1)*20;
		this.y = (Math.floor(Math.random()*row-1)+1)*20;
	}
	this.draw = function() {
		ctx.fillStyle = 'purple'
		ctx.fillRect(this.x,this.y,20,20);
	}
}

function Snake() {

	this.x=20;
	this.y=20;
	this.xSpeed = 20;
	this.ySpeed = 0;
	this.tail = [];
	this.total = 0;
	this.check = 0;

	this.draw = function() {
		ctx.fillStyle = 'white'

		for(var i=0;i<this.tail.length;i++)
		{
			ctx.fillRect(this.tail[i].x,this.tail[i].y,20,20);
		}
		 ctx.fillRect(this.x,this.y,20,20);
	}
	this.update = function() {
		//console.log(this.tail);
		for(var i=0;i<this.tail.length-1;i++)
		{
			this.tail[i] = this.tail[i+1];
		}
		console.log(this.tail)
		this.tail[this.total-1]={x:this.x,y:this.y};
		this.x += this.xSpeed;
		this.y += this.ySpeed; 

		if(this.x > canvas.width)
		  this.x = 0;	
		if(this.y > canvas.height)
		  this.y = 0;
		if(this.x<0)
			this.x = canvas.width;
		if(this.y<0)
			this.y = canvas.height;
	}
	this.changeDir = function(direction) {
		//console.log(direction)
		switch(direction)
		{
			case 'Up':
			this.xSpeed = 0;
			this.ySpeed = -20
			break;
			case 'Down':
			this.xSpeed = 0;
			this.ySpeed = 20;
			break;
			case 'Right':
			this.xSpeed = 20;
			this.ySpeed = 0;
			break;
			case 'Left':
			this.xSpeed = -20;
			this.ySpeed = 0;
		}
	}
	this.eatFruit = function(fruit,stone,obstacle) {
		
		if(this.x == fruit.x && this.y == fruit.y)
		{
			this.total++;
			this.check = this.check+5;
			gameScore.innerHTML = "Total Score: " + this.check;
			gameScore.append();
			flag1=1;
			return true;
		}
		else if(this.x == stone.x && this.y == stone.y)
		{
			this.total++;
			this.check = this.check+8;
			gameScore.innerHTML = "Total Score: " + this.check;
			gameScore.append();
			flag2=1;
			return true;
		}
		else if(this.x == obstacle.x && this.y == obstacle.y)
		{
			this.total++;
			this.check = this.check+10;
			gameScore.innerHTML = "Total Score: " + this.check;
			gameScore.append();

			flag3=1;
			return true;
		}
		else if(this.check>200)
		{
			speed -= 20;
		}
		else if(this.check>500)
		{
			speed -= 50;
		}
		else
		{
			return false;
		}
	}
}

setup();

function setup() {
	
	fruit = new Fruit();
	stone = new Stones();
	obstacle = new Obstacles();
	snake = new Snake();
	fruit.pickLocation();
	stone.pickLocation();
	obstacle.pickLocation();
	start();
	function start()
	{
		interval = window.setInterval(()=>{

			ctx.clearRect(0,0,canvas.width,canvas.height);
			fruit.draw();
			stone.draw();
			obstacle.draw();
			snake.update()
			snake.draw();
			if(snake.eatFruit(fruit,stone,obstacle))
			{
				if(flag1==1)
				{
					//speed = 10;
					fruit.pickLocation();
					flag1=0;	
				}
				if(flag2==1)
				{
					stone.pickLocation();
					flag2=0;	
				}
				if(flag3==1)
				{
					obstacle.pickLocation();
					flag3=0;	
				}			
				
			}
			//console.log(speed)
		},speed)
		
	}
	window.addEventListener("keyup", ((e)=> {

		if(e.keyCode == 32)
		{
			if(pause)
			{
				clearInterval(interval);
				pause = false;	
				gameScore.setAttribute("style", "display:none");
				pauseGame.setAttribute("style","display:block");
			}
			else
			{
				pause = true;	
				gameScore.setAttribute("style", "display:block");
				pauseGame.setAttribute("style","display:none");
				start();
			}
		}

		const dir = e.key.replace('Arrow', '')
		snake.changeDir(dir);



	}));

}