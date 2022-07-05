var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerWidth - 100;

var dino = {
  x: 10,
  y: 200, //공룡 등장 좌표
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

dino.draw();

//이제 장애물들을 만들어야하는데, 장애물은 개별로 width, height가 다를 수도 있기때문에 비슷한 Object가 많이 생성될것같아.

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

var cactus = new Cactus();
cactus.draw();

var timer = 0;
var cactus여러개 = []; //장애물을 스폰할때마다 어레이에 담기위함

function 프레임마다실행() {
  requestAnimationFrame(프레임마다실행);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 120 === 0) {
    var cactus = new Cactus();
    cactus여러개.push(cactus);
  }
  cactus여러개.forEach((a) => {
    a.x--;
    a.draw(); ///120프레임마다 {장애물}을 생성하고 [어레이]에 집어넣음 그러고 나서 어레이 안에 있는 모든 장애물을 반복문으로 draw
  });
  //잔상이 남는걸 해결하기위해 캔버스를 싹 비우면 됩니다.
  dino.draw();
}

프레임마다실행();
