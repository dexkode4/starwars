const URL = "https://swapi.dev/api/people";
let list = document.querySelector("ul");

let characters = [];

fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    const RESULTS = data["results"];
    RESULTS.forEach((person) => {
      const listItem = document.createElement("li");
      listItem.textContent = person.name;
      // listItem.setAttribute("value",)
      list.appendChild(listItem);
    });
  })
  .catch((e) => console.log(e));
