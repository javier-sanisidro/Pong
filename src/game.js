//To do refactoring code
//iniciar las variables y parametrizar los valores comunes
var PlayerOne;
var PlayerTwo;
var Field;
var borderRight;
var borderLeft;
var borderTop;
var borderBottom;
var score1=0;
var score2=0;
let speedball=6;
var ball;
let finish=10;
let speedPlayer=5;
let stopmovement=0;
let height=screen.height;
let width=screen.width;
let centerHeight=screen.height/2;
let centerWidth=screen.width/2;
let borderField=5;
//inicias todos los objetos de el juego

function startGame() {
    myGameArea.start();
   PlayerOne=new component(15,70,"white",15,10);
   PlayerTwo=new component(15,70,"white",screen.width/1.1,10);
  Field=new component(borderField,height,"white",centerWidth,0);
  borderRight=new component(borderField,height,"black",width-5,0);
  borderLeft=new component(borderField,height,"black",0,0);
    borderTop=new component(width,borderField,"black",5,0);
    borderBottom=new component(width,borderField,"black",0,height-5);
    ball=new component(20, 20,"blue",centerWidth,centerHeight);
    ball.speedX=speedball;
      ball.speedY=-speedball;
    
}
//aqui es la creacion de el campo,las dimensiones que tiene
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval=setInterval(updateGameArea,20);
        //esto son valores para que recoga las acciones pulsadas en el teclado
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
    });
    
    window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
    });
    },
    //esto es hacer el resfrescado de imagen
    clear : function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    //Para parar el juego cuando lleguen a 10
    stop : function() {
        clearInterval(this.interval);
    }
}
//funcion que sirve para hacer el marcador de el equipo 1
function drawScoreTeamOne() {
    ctx.font = "48px Arial";
    ctx.fillStyle = "White";
    ctx.fillText(score1, screen.width/4, 75);
}
//funcion que sirve para hacer el marcador de el equipo 2
function drawScoreTeamTwo() {
    ctx.font = "48px Arial";
    ctx.fillStyle = "White";
    ctx.fillText(score2, screen.width/1.5, 75);
}
//aqui viene la creacion de cada componente de el campo
function component(width, height, color, x, y,id) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.id=id
    this.y = y;
    this.speedX = speedPlayer;
    this.speedY = speedPlayer;
    //esto es para que cada vez que el canvas es refrescado,se vuelva a pintar en la posicion en la que estaba
   this.update= function(){
       ctx=myGameArea.context;
       ctx.fillStyle=color;
       ctx.fillRect(this.x,this.y,this.width,this.height);
   
}
//sirve para colocar en nueva posicion el elemento
   this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  //esto es la deteccion de colisiones 
  this.crashWith=function(otherobj){
      var myleft=this.x;
      var myright=this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = otherobj.x;
      var otherright = otherobj.x + (otherobj.width);
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + (otherobj.height);
      var crash = true;
      if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
          crash = false;
      }
      return crash;
  }

  
    
  }
  //esto es para actualizar la pantalla frame a frame
  function updateGameArea(){

      myGameArea.clear();
      PlayerOne.update();
      PlayerTwo.update();
      borderRight.update();
      borderLeft.update();
      borderTop.update();
      borderBottom.update();
      Field.update();
      ball.update();

     
      //para que no se muevan constantemente,establecemos los valores a 0 de los movimientos
      PlayerOne.speedX=stopmovement;
      PlayerOne.speedY=stopmovement;
      
      PlayerTwo.speedX = stopmovement;
      PlayerTwo.speedY = stopmovement;
      //captar los movimientos de el jugador 1
    if (myGameArea.keys && myGameArea.keys[65]) {PlayerOne.speedX = -speedPlayer; }
    if (myGameArea.keys && myGameArea.keys[68]) {PlayerOne.speedX = speedPlayer; }
    if (myGameArea.keys && myGameArea.keys[87]) {PlayerOne.speedY = -speedPlayer; }
    if (myGameArea.keys && myGameArea.keys[83]) {PlayerOne.speedY = speedPlayer; }
          //captar los movimientos de el jugador 2
    if (myGameArea.keys && myGameArea.keys[37]) {PlayerTwo.speedX = -speedPlayer; }
    if (myGameArea.keys && myGameArea.keys[39]) {PlayerTwo.speedX = speedPlayer; }
    if (myGameArea.keys && myGameArea.keys[38]) {PlayerTwo.speedY = -speedPlayer; }
    if (myGameArea.keys && myGameArea.keys[40]) {PlayerTwo.speedY = speedPlayer; }
    //Aqui comienza las colisiones de la pelota con el resto de los elementos
    if(ball.crashWith(borderTop)){
        ball.speedY=speedball;
    }
    if(ball.crashWith(borderBottom)){
        ball.speedY=-speedball;
    }
    if(ball.crashWith(PlayerTwo)){
        ball.speedX=-speedball;
    }
    if(ball.crashWith(PlayerOne)){
        ball.speedX=speedball;
    }
    if(ball.crashWith(borderLeft)){
        score2++;
        ball.x=centerWidth;
        ball.y=centerHeight;
    }
    if(ball.crashWith(borderRight)){
        score1++;
        ball.x=centerWidth;
        ball.y=centerHeight;
    }
    //Aqui comienza las colisiones de el jugador 1 con el resto de elementos en pantalla
    if(PlayerOne.crashWith(borderLeft)){
        PlayerOne.speedX=speedPlayer;
    }
    if(PlayerOne.crashWith(Field)){
        PlayerOne.speedX=-speedPlayer;
    } if(PlayerOne.crashWith(borderBottom)){
        PlayerOne.speedY=-speedPlayer;
    }  if(PlayerOne.crashWith(borderTop)){
        PlayerOne.speedY=speedPlayer;
    }
     //Aqui comienza las colisiones de el jugador 2 con el resto de elementos en pantalla
    if(PlayerTwo.crashWith(borderRight)){
        PlayerTwo.speedX=-speedPlayer;
    }
    if(PlayerTwo.crashWith(Field)){
        PlayerTwo.speedX=speedPlayer;
    } if(PlayerTwo.crashWith(borderBottom)){
        PlayerTwo.speedY=-speedPlayer;
    }  if(PlayerTwo.crashWith(borderTop)){
        PlayerTwo.speedY=speedPlayer;
    }
    //funciones que sirven para hacer que los elementos se muevan
    ball.newPos();
    PlayerOne.newPos();
    PlayerTwo.newPos();
    drawScoreTeamOne();
    drawScoreTeamTwo();
    //aqui tenemos 2 if para hacer los limites de puntuacion para parar el juego al llegar a un determinado numero de puntos
    if(score2==finish){
        myGameArea.stop()
        alert("Juego acabado,ha ganado el Equipo 2!");

    }
    if(score1==finish){
        myGameArea.stop()
        alert("Juego acabado,ha ganado el Equipo 1!");

    }

  }



