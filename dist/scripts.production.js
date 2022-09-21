const neededKeys = ["name", "detailsUrl"],
  pokemonRepository = (() => {
    let e = [],
      t = (t) => validKeys(t) && e.push(t),
      a = (e) => {
        i(e).then(() => {
          l(e);
        });
      },
      s = () => (
        showLoadingMessage(),
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
          .then((e) => (hideLoadingMessage(), e.json()))
          .then((e) => {
            e.results.forEach((e) => {
              t({ name: e.name, detailsUrl: e.url });
            });
          })
          .catch((e) => {
            hideLoadingMessage(), console.error(e);
          })
      ),
      i = (e) =>
        fetch(e.detailsUrl)
          .then((e) => e.json())
          .then((t) => {
            (e.imageUrl = t.sprites.front_default),
              (e.height = t.height),
              (e.weight = t.weight),
              (e.types = t.types);
          })
          .catch((e) => console.error(e));
    function o(e) {
      let t = document.querySelector(".list-group"),
        s = document.createElement("li"),
        i = document.createElement("button");
      (i.innerText = e.name),
        i.classList.add("btn", "btn-outline-success", "item"),
        i.setAttribute("data-toggle", "modal"),
        i.setAttribute("data-target", "#exampleModal"),
        s.appendChild(i),
        t.appendChild(s),
        i.addEventListener("click", function (t) {
          a(e);
        });
    }
    function l(e) {
      let t = $(".modal-title"),
        a = $(".modal-body");
      t.empty(),
        a.empty(),
        t.append(e.name.charAt(0).toUpperCase() + e.name.slice(1));
      let s = $('<p class="modal-title"></p>');
      s.append(`<em>Name:</em> ${
        e.name.charAt(0).toUpperCase() + e.name.slice(1)
      }<br> 
    <em>Height:</em> ${e.height}<br>
    <em>Weight:</em> ${e.weight}<br>
     Lets GO!!`),
        a.append(s);
      let i = $('<img class="modal-img">').attr("src", e.imageUrl);
      a.append(i);
      let o = $('<img class="modal-img">').attr("src", e.imageBackUrl);
      a.append(o);
    }
    return { getAll: () => e, addListItem: o, loadList: s };
  })(),
  validKeys = (e) =>
    "object" == typeof e && neededKeys.every((t) => Object.keys(e).includes(t)),
  showLoadingMessage = () => {
    let e = document.querySelector("#loading-message");
    e.classList.add("show");
  },
  hideLoadingMessage = () => {
    let e = document.querySelector("#loading-message");
    e.classList.remove("show");
  };
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((e) => pokemonRepository.addListItem(e));
});
