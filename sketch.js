var ball,ball_position;
var mydatabase;
var position;

function setup(){
    createCanvas(500,500);

    mydatabase=firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    ball_position = mydatabase.ref('ball/position');
    ball_position.on("value",readPosition,showError)
    //.on - create a listner - which will keep watching if value in data base has changed
    //.ref  - this will fetch the value stored on database.
}

function draw(){
    background("white");

    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }

    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }

    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }

    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }

    drawSprites();

}

function changePosition(x,y){

    mydatabase.ref('ball/position').set(
        {'x':position.x + x,
         'y':position.y + y
    }
    );

}

function readPosition(data){

  position = data.val()   
  ball.x = position.x;
  ball.y = position.y;

}

function showError(){

    console.log("error")
    
}
