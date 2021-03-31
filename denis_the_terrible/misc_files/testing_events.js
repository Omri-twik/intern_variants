var start;
var end;
var timesFunctionFired;

function eventRemoval(func) {
  function resizeFunction() {
    func();
    window.removeEventListener("resize", resizeFunction);
    setTimeout(() => {
      addResize();
    }, 50);
  }
  function addResize() {
    window.addEventListener("resize", resizeFunction);
  }
  addResize();
}

function noEventRemoval(func) {
  window.addEventListener("resize", () => {
    func();
  });
}

function resizeCalculation() {
  timesFunctionFired++;
  for (let i = 0; i < 100; i++) {
    for (let y = 0; y < 100; y++) {
      2 + 2;
    }
  }
}

function resizeIf() {
  timesFunctionFired++;
  if (0 == 1) {
    console.log("wrong");
  }
}

function test1() {
  eventRemoval(resizeCalculation);
}

function test2() {
  eventRemoval(resizeIf);
}

function test3() {
  noEventRemoval(resizeCalculation);
}

function test4() {
  noEventRemoval(resizeIf);
}

function test5() {
  window.addEventListener("resize", () => {});
}

var processingTime = 0;
timesFunctionFired = 0;
for (let i = 0; i < 20000; i++) {
  start = new Date().getTime();
  window.dispatchEvent(new Event("resize"));
  end = new Date().getTime();
  processingTime = processingTime + (end - start);
}
console.log("processingTime", processingTime);
console.log("timesFunctionFired", timesFunctionFired);
