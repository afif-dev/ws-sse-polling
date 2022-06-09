async function catFact() {
  const catTextEl = document.querySelector(".cat-facts-text");
  let url = "https://catfact.ninja/fact";
  let response = await fetch(url);
  let data = await response.json();
  catTextEl.innerHTML = data.fact;
}

// load cat fact
catFact();

// fetch cat fact every 15 seconds
setInterval(async function () {
  catFact();
}, 15000);
