if (typeof EventSource !== "undefined") {
  var msg_source = new EventSource("/sse-fastify");
  msg_source.onmessage = function (event) {
    document.getElementById("result").innerHTML += event.data + "<br>";
  };
  var notify_source = new EventSource("/sse-rand-notify");
  notify_source.onmessage = function (event) {
    document.querySelector("#notify .badge").innerHTML = `${event.data}`;
  };
} else {
  document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
}
