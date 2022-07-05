var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerWidth - 100;

//------------------------------------------dino캐릭터
var dino = {
  x: 40,
  y: 300, //공룡 등장 좌표
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

//------------------------------------------이제 장애물들을 만들어야하는데, 장애물은 개별로 width, height가 다를 수도 있기때문에 비슷한 Object가 많이 생성될것같아.

class Cactus {
  constructor() {
    this.x = 800;
    this.y = 310;
    this.width = 40;
    this.height = 40;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

var timer = 0;
var cactus여러개 = []; //장애물을 스폰할때마다 어레이에 담기위함, but 오래할수록 어레이에 데이터가 쌓일것입니다. 그래서 어레이에서 제거를 해야댐..
var 점프timer = 0;
var animation;

//1초에 60번 코드들이 실행할 것이다..
function 프레임마다실행() {
  animation = requestAnimationFrame(프레임마다실행);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height); //잔상이 남는걸 해결하기위해 캔버스를 싹 비우면 됩니다.

  if (timer % 60 === 0) {
    var cactus = new Cactus();
    cactus여러개.push(cactus);
  }
  cactus여러개.forEach((a, i, o) => {
    //x좌표가 0미만이면 제거
    if (a.x < 0) {
      o.splice(i, 1);
    }
    a.x = a.x - 7;

    충돌하냐(dino, a); //캐릭터와 모든 장애물에 대해 충돌체크를 해야하기 때문에 forEach 안에서 체크를 함..

    a.draw(); ///120프레임마다 {장애물}을 생성하고 [어레이]에 집어넣음 그러고 나서 어레이 안에 있는 모든 장애물을 반복문으로 draw
  });

  ///------------------------------/점프에 해당하는 논리

  if (점프중 == true) {
    dino.y = dino.y - 8; //몇 프레임지나면 점프를 그만해주세요.
    점프timer++;
    if (점프카운트 > 1) {
      점프가능 = false;
    }
  }
  if (점프중 == false) {
    if (dino.y < 300) {
      dino.y = dino.y + 8;
    } else {
      점프가능 = true;
      점프카운트 = 0;
    }
  }
  if (점프timer > 15) {
    점프중 = false;
    점프timer = 0;
  }

  ///캐릭터 드로우
  dino.draw();
}

프레임마다실행();

var 점프중 = false;
var 점프가능 = true;
var 점프카운트 = 0;
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    if (점프가능 === true) {
      점프중 = true;
      점프카운트++;
    }
  }
});

//--------------------------------충돌감지

function 충돌하냐(dino, cactus) {
  var x축차이 = cactus.x - (dino.x + dino.width);
  var y축차이 = cactus.y - (dino.y + dino.height);
  if (x축차이 < 0 && y축차이 < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}

// 2단점프
// 자동 발사?
// 체력게이지
// 스킬 (시간느리게, 장애물파괴, 무적?, 진화, 동료, 힐, )
// 코옵?
// 상하단 장애물
// 보스
// 레벨업 등등
