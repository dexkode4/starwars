import { User } from "./scripts/users.js";

const URL = "https://swapi.dev/api/people";
let list = document.querySelector("ul");
let modal = document.querySelector("#modal");

fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    const RESULTS = data["results"];
    RESULTS.forEach((person, index) => {
      // console.log(person.name);
      let user = new User(
        person.name,
        person.birth_year,
        person.height,
        person.gender
      );
      // console.log(user);
      const listItem = document.createElement("li");
      listItem.textContent = person.name;
      listItem.setAttribute("value", index);
      list.appendChild(listItem);

      listItem.addEventListener("click", (e) => {
        // console.log(RESULTS[e.target.value].name);

        modal.setAttribute("class", "modal");
        modal.setAttribute("id", "popup-modal");
        const modalClose = document.createElement("a");
        modalClose.setAttribute("class", "modal-close");
        modalClose.innerHTML = `<i class="fas fa-times-circle"></i>`;
        const modalImg = document.createElement("div");
        modalImg.setAttribute("class", "modal-img");
        const image = document.createElement("img");
        image.setAttribute(
          "src",
          `https://robohash.org/${index}?set=set2&size=180x180`
        );

        const modalContent = document.createElement("div");
        modalContent.setAttribute("class", "modal-content");
        modal.appendChild(modalContent);
        modalContent.appendChild(modalImg);
        modalImg.appendChild(image);
        modalContent.appendChild(modalClose);

        modal.style.display = "block";
        modalClose.onclick = function () {
          modal.style.display = "none";
          modal.innerHTML = "";
        };

        const details = document.createElement("div");
        details.setAttribute("class", "details");
        const list = document.createElement("ul");

        ///////    character bio info
        for (const property in user) {
          const listItem = document.createElement("li");
          listItem.innerHTML = `<span>${property}: </span>${user[property]}`;
          list.appendChild(listItem);
        }

        details.appendChild(list);
        modalContent.appendChild(details);
      });
    });
  })
  .catch((e) => console.log(e));

/// close modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.innerHTML = "";
  }
};
