
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var missileImage,missile,missileGroup;
var gameState="play";
var backgroundImage,backgroundImg
var helicopter, helicopterIMG;
var gameOver,score;


function preload() {
	helicopterIMG=loadImage("helicopter.png");
	backgroundImage=loadImage("sky.jpg");
	missileImage = loadImage("missile.png");
	gameOver=loadImage("gameover.jpg");
	//packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(1200, 700);
	rectMode(CENTER);

	engine = Engine.create();
	world = engine.world;
	backgroundImage

	helicopter=createSprite(width/2, 200, 10,10);
	helicopter.addImage(helicopterIMG)
	helicopter.scale=0.6

	score=0;

	//missile= new Missile(this.x,this.y,this.width,this.height);

	//helicopter=new Helicopter(width / 2, 200, 200, 100);

	missileGroup = new Group();

	//groundSprite=createSprite(width/2, height-35, width,10);
	//groundSprite.shapeColor=color(255)

	
	//ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
	//World.add(world, ground);


	Engine.run(engine);

}


function draw() {
	rectMode(CENTER);
	background(backgroundImage);
	

	//helicopter.display();
    
	fill(0,0,52);
	textSize(17);
	text("Score: " + score, 1100, 0);

	if(gameState==="play"){
		score = score + Math.round(getFrameRate() / 60);
	}
    
	if(helicopter.isTouching(missileGroup)){
		gameState="end";
	}


	if(gameState==="end"){
		missileGroup.destroyEach();
		background(gameOver);
	}


	camera.position.x= displayWidth/2;
	camera.position.y=helicopter.y;

	//missile.display();
	//missile.spawn();

	spawn();

	


	
	
	drawSprites();

}

function spawn() {
	if (frameCount % 60 === 0) {
		missile = createSprite(150, random(1, 1200), 10, 40);
		missile.addImage("missile", missileImage);
		missile.scale = 0.05;
		var rand= Math.round(random(1,4));
		switch (rand) {
			case 1:
			  missile.velocityX=6;
			  break;
			case 2:
			  missile.velocityX=8;
			  break;
			case 3:
			  missile.velocityX=10;
			  break;
			case 4:
			  missile.velocityX=12;
			  break;
			default:
			  break;
		  }
		//missile.velocityX = 4;
		missile.lifetime = 300; 
		missileGroup.add(missile);
		console.log(missile.velocityX);
	}
	


	
	
}

function keyPressed() {
	if (keyCode === 38&&gameState==="play") {
		console.log('up');
		//console.log(helicopter.body.position.x+"---"+helicopter.body.position.y)

		//Matter.Body.setPosition(helicopter.body,{x:helicopter.body.position.x,y:helicopter.body.position.y-50})
		helicopter.y=helicopter.y+50;

	}
	if (keyCode === 40&&gameState==="play") {
		console.log('down');
		//console.log(helicopter.body.position.x+"---"+helicopter.body.position.y)

		
		helicopter.y=helicopter.y-50;
		//Matter.Body.setPosition(helicopter.body,{x:helicopter.body.position.x,y:helicopter.body.position.y+50})



	}
}
