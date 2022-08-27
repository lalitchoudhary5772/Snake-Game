let enter = () =>{
    document.getElementById("main").style.visibility = "visible";
   
    document.getElementById("resetbtn").style.visibility = "visible";
    document.getElementById("btn").style.visibility = "hidden";
    document.getElementById("btn1").style.visibility = "visible";
    Start();
};
let exit =() =>{
    document.getElementById("main").style.visibility = "hidden";
    document.getElementById("resetbtn").style.visibility = "visible";
    document.getElementById("btn").style.visibility = "hidden";
    document.getElementById("score").style.visibility = "visible";
    document.getElementById("score").innerHTML = "Your Score is : " +Score;
};
let reset = () =>{
    document.getElementById("main").style.visibility = "visible";
    document.getElementById("score").innerHTML = "Your Last Score is : "+Score;
}
const gameBox = document.querySelector("#gamebox");
const context = gameBox.getContext("2d");
const ScoreText = document.querySelector("#scoretext");
const Reset  = document.querySelector("#resetbtn");
const gameWidth = gameBox.width;
const gameHeight = gameBox.height;
const boxBackground = "black";
const snakeColor = "white";
const snakeBorder = "black";
const foodColor = "yellow";
const unitSize = 25;
let running = true;
let xDistance = unitSize;
let yDistance = 0;
let foodX;
let foodY;
let Score = 0;
snake = [
    {x:unitSize*2 , y:0},
    {x:unitSize , y:0},
    {x:0, y:0}
];
window.addEventListener("keydown", changeDirection);
Reset.addEventListener("click", resetGame);
//Start();


function Start(){
    running = true;
    ScoreText.textContent = Score;
    create();
    drawFood();
    Tick();
};
function Tick(){
    if(running){
        setTimeout(()=>{
            Box();
            drawFood();
            drawSnake();
            moveSnake();
            checkGameOver();
            Tick();
        },130);
    }
        else{
            displayGameOver();
        }
    
};
function Box(){
    context.fillStyle = boxBackground;
    context.fillRect(0,0,gameWidth,gameHeight);
};
function create(){
    function randomFood(min,max){
        const randNum = Math.round((Math.random()*(max-min)+min)/unitSize)*unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth-unitSize);
    foodY = randomFood(0, gameWidth-unitSize);
    
};
function drawFood(){
    context.fillStyle = foodColor;
    context.fillRect(foodX,foodY,unitSize,unitSize);
};
function moveSnake(){
    const head = {x:snake[0].x + xDistance,
                    y: snake[0].y + yDistance};
    snake.unshift(head);
    if(snake[0].x==foodX && snake[0].y==foodY){
        Score+=1;
        ScoreText.textContent = Score;
        create();
    }
    else{
        snake.pop();
    }
};
function drawSnake(){
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorder;
    snake.forEach(snakePart =>{
        context.fillRect(snakePart.x, snakePart.y,unitSize,unitSize);
        context.strokeRect(snakePart.x, snakePart.y,unitSize,unitSize);
    })
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    
    const LEFT = 37 || 65;
    const UP = 38 || 87;
    const RIGHT = 39 || 68;
    const DOWN = 40 || 83;

    const goingUP = (yDistance == -unitSize);
    const goingDOWN = (yDistance == unitSize);
    const goingRIGHT = (xDistance == unitSize);
    const goingLEFT = (xDistance == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRIGHT):
            xDistance = -unitSize;
            yDistance = 0;
            break;
        case(keyPressed == UP && !goingDOWN):
            xDistance = 0;
            yDistance = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLEFT):
            xDistance = unitSize;
            yDistance = 0;
            break;
        case(keyPressed == DOWN && !goingUP):
            xDistance = 0;
            yDistance = unitSize;
            break;
    }
    
};
function checkGameOver(){
    switch(true){
        case (snake[0].x <0):
            running = false;
            break;
        case (snake[0].x >=gameWidth):
                running = false;
                break;
        case (snake[0].y <0):
                    running = false;
                    break;
        case (snake[0].y >= gameHeight):
                        running = false;
                        break;
    }
    for(let i =1; i<snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};
function displayGameOver(){
    context.font = "70px impact";
    context.color = "white";
    context.textAlign = "center";
    context.fillText("Game Over!!",gameWidth/2, gameHeight/2);
    running = false;
};
function resetGame(){
    Score = 0;
    xDistance = unitSize;
    yDistance = 0;
    snake = [
        {x:unitSize*2 , y:0},
        {x:unitSize , y:0},
        {x:0, y:0}
    ];
    Start();
};
