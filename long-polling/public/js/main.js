// Slider
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".slider");
  var instances = M.Slider.init(elems, {
    height: 480,
    indicators: false,
  });
});

// send message from the form
document.forms.publish.onsubmit = function () {
  let message = this.message.value;
  if (message) {
    sendMessage(message);
    this.message.value = "";
  }
  return false;
};
function sendMessage(message) {
  let url = "/pub";
  fetch(url, {
    method: "POST",
    body: message,
  });
}

// long polling
async function subscribe() {
  let url = "/sub?random=" + Math.random();
  let response = await fetch(url);

  if (response.status == 502) {
    // Connection timeout
    // happens when the connection was pending for too long
    // let's reconnect
    await subscribe();
  } else if (response.status != 200) {
    // Show Error
    console.error(response.statusText);
    // Reconnect in one second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await subscribe();
  } else {
    // Got message
    let message = await response.json();
    if (message.timeout) {
      console.log("⏱ Timeout: " + message.timeout);
    } else {
      message.events.forEach((event) => {
        let eventTime = new Date(event.timestamp);
        let message = event.data;
        let messageElem = document.createElement("div");
        messageElem.className = "valign-wrapper";
        messageElem.innerHTML = `<i class="tiny material-icons" title="${eventTime.toString()}">access_time</i>&nbsp;&nbsp; ${message}`;
        document.getElementById("messages").append(messageElem);
      });
    }
    await subscribe();
  }
}

subscribe();
