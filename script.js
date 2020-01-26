var canvas = document.querySelector('.gameCanvs');
var gameScore = document.querySelector('#gameScore');
var pauseGame = document.querySelector('#pauseGame');
var ctx = canvas.getContext('2d');
var row = canvas.height / 20;
var col = canvas.width / 20;
var total=0;
var fruit,stone,obstacle,snake,interval,pause=true;
var flag1,flag2,flag3,speed=100;


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