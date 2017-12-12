// Paint CE - popup.js

function sendMessageToTab(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let currentTab = tabs[0];
    chrome.tabs.sendMessage(currentTab.id, message);
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("red_button").onclick = function() {
    sendMessageToTab({ action: "start", color: { r: 255, g: 0, b: 0 } });
  };

  document.getElementById("green_button").onclick = function() {
    sendMessageToTab({ action: "start",  color: { r: 0, g: 255, b: 0 } });
  };

  document.getElementById("blue_button").onclick = function() {
    sendMessageToTab({ action: "start", color: { r: 0, g: 0, b: 255 } });
  };

  document.getElementById("orange_button").onclick = function() {
    sendMessageToTab({ action: "start",  color: { r: 255, g: 165, b: 0 } });
  };

  document.getElementById("stop_button").onclick = function() {
    sendMessageToTab({ action: "stop" });
  };

  document.getElementById("reset_button").onclick = function() {
    sendMessageToTab({ action: "reset" });
  };
});
