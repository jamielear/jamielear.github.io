"use strict"
var x1 = document.getElementById("robot1");
var x2 = document.getElementById("robot2");

var x = ["",x1,x2];

var go = [null,0,0];

var Program = [
  null,
  [null,0,0,0,0,0,0,0],
  [null,0,0,0,0,0,0,0]
];

var Place = ["",1,16];
var newPlace = ["",1,16];
var rotation = ["",270,90];
var k;
var l;
var m;
var loser;
document.getElementById(1).appendChild(x[1]);
document.getElementById(16).appendChild(x[2]);

document.getElementById(111).checked = true;
document.getElementById("#1").checked = true;

function RobotForward(l,m) {
  if (rotation[m] == 180) {
    if (Place[l] > 4) {
      newPlace[l] = Place[l] - 4;
    } else if (l!=m) {
      loser = l;
    }
  }
  if (rotation[m] == 270) {
    if (Place[l] % 4 !== 0) {
      newPlace[l] = Place[l] + 1;
    } else if (l!=m) {
      loser = l;
    }
  }
  if (rotation[m] == 0) {
    if (Place[l] < 13) {
      newPlace[l] = Place[l] + 4;
    } else if (l!=m) {
      loser = l;
    }
  }
  if (rotation[m] == 90) {
    if (Place[l] % 4 !== 1) {
      newPlace[l] = Place[l] - 1;
    } else if (l!=m) {
      loser = l;
    }
  }
}

function Move() {
  if (newPlace[1] == Place[2]) {
    if (newPlace[2] == Place[2]) {
      //1 pushes 2
      Place[1]=newPlace[1];
      RobotForward(2,1);
      Place[2]=newPlace[2];
      return;
    } else {
      return;
    }
  } else if (newPlace[2] == Place[1]) {
    if (newPlace[1] == Place[1]) {
      //2 pushes 1
      Place[2]=newPlace[2];
      RobotForward(1,2);
      Place[1]=newPlace[1];
      return;
    } else {
      // I don't think this is even possible, but 1&2 bounce
      return;
    }
  } else if (newPlace[1] == newPlace[2]) {
    //1&2 bounce
    return;
  } else {
    Place[1] = newPlace[1];
    Place[2] = newPlace[2];
  }
}

function Rotate(l) {
  rotation[l] = (rotation[l] + 90) % 360;
  x1.style.transform = "rotate(" + rotation[1] + "deg)"
  x2.style.transform = "rotate(" + rotation[2] + "deg)"
}


function Forward() {
  if (go[Player()] == 0) {
    for (var i = 1; i < 8; i++) {
      if (document.getElementById(110 + i).checked) {
        if (Program[Player()][i] == "T") {
          Program[Player()][i] = "F";
          go[Player()] = 1;
        } else if (Program[Player()][i] == "F") {

        } else {
          for (var j = 1; j < i+1; j++) {
            console.log(Program);
            if (Program[Player()][i-j] != "0") {
              Program[Player()][i-j+1] = "F";
              go[Player()] = 1;
              break;
            }
          }
        }
      }
    }
    Array1();
    Run();
  }
}


function Turn() {
  if (go[Player()] == 0) {
    for (var i = 1; i < 8; i++) {
      if (document.getElementById(110 + i).checked) {
        if (Program[Player()][i] == "F") {
          Program[Player()][i] = "T";
          go[Player()] = 1;
        } else if (Program[Player()][i] == "T") {

        } else {
          for (var j = 1; j < i + 1; j++) {
            console.log(Program);
            if (Program[Player()][i-j] != "0") {
              Program[Player()][i-j+1] = "T";
              go[Player()] = 1;
              break;
            }
          }
        }
      }
    }
    Array1();
    Run();
  }
}

function Run() {
  window.Moving = 1;
  window.MoveStep = 0;
  if (go[1]==1 && go[2]==1) {
    for (var i = 1; i < 8; i++) {
      if (Program[1][i] || Program[2][i]) {
        window.setTimeout(moveone, 2000*(i-1), i);
      }
    }
    go = ["",0,0];
  }
}

function moveone(i) {
  newPlace[1] = Place[1];
  newPlace[2] = Place[2];
  for (var l = 1; l < 3; l++) {
    if (Program[l][i] == "T") {
      Rotate(l);
    }
    if (Program[l][i] == "F") {
      RobotForward(l,l);
    }
  }
  console.log(Place,newPlace);
  Move();
  document.getElementById(Place[1]).appendChild(x[1]);
  document.getElementById(Place[2]).appendChild(x[2]);
  if (loser) {
    x[loser].remove();
  }
}


function Array1() {
  for (k = 1; k < 8; k++) {
    if (Program[Player()][k] == "F") {
      ForwardCard();
    }
    if (Program[Player()][k] == "T") {
      TurnCard();
    }
  }
}

function ForwardCard() {
  var y = document.createElement("img");
  y.setAttribute("src", "forwardCard.jpg");
  y.setAttribute("width", "72");
  y.setAttribute("height", "90");
  y.setAttribute("alt", "Robot");
  document.getElementById("Robot" + Player() + k).innerHTML = "";
  document.getElementById("Robot" + Player() + k).appendChild(y);
}

function TurnCard() {
  var z = document.createElement("img");
  z.setAttribute("src", "turnCard.jpg");
  z.setAttribute("width", "72");
  z.setAttribute("height", "90");
  z.setAttribute("alt", "Robot");
  document.getElementById("Robot" + Player() + k).innerHTML = "";
  document.getElementById("Robot" + Player() + k).appendChild(z);
}

function Player() {
  for (var i = 1; i < 3; i++) {
    if (document.getElementById("#" + i).checked){
      return i;
    }
  }
}
