// Paint CE - sketch.js

var instance = function(sketch) {
  sketch.activated = false;
  sketch.drawingCanvas = null;
  sketch.drawColor = { r: 255, g: 0, b: 0 };

  sketch.setup = function() {
    sketch.activated = false;
    chrome.runtime.onMessage.addListener((message, sender, response) => {
      if (message.action === "start") {
        sketch.drawColor = message.color;
        if (!sketch.activated) {
          sketch.createApp();
        }
      } else if (message.action === "stop") {
        if (sketch.activated) {
          sketch.closeApp();
        }
      } else if (message.action === "reset") {
        if (sketch.activated) {
          sketch.resetApp();
        }
      }
    });
  }

  sketch.createApp = function() {
    if (!sketch.drawingCanvas) {
      sketch.drawingCanvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    }
    let doc = document.documentElement;
    let x = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    let y = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    sketch.drawingCanvas.position(x, y);
    sketch.clear();
    sketch.drawingCanvas.style("pointer-events", "");
    sketch.activated = true;
  }

  sketch.closeApp = function() {
    if (sketch.drawingCanvas) {
      sketch.drawingCanvas.style("pointer-events", "none");
      sketch.activated = false;
    }
  }

  sketch.resetApp = function() {
    if (sketch.drawingCanvas) {
      sketch.clear();
      sketch.drawingCanvas.style("pointer-events", "none");
      sketch.activated = false;
    }
  }

  sketch.draw = function() {
    if (sketch.activated) {
      if (sketch.mouseIsPressed) {
        sketch.stroke(sketch.drawColor.r, sketch.drawColor.g, sketch.drawColor.b);
        sketch.strokeWeight(5);
        sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
      }
    }
  }
}

var p5Instance = new p5(instance);
