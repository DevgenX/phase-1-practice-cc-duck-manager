// write your code here!

const getDuckLikes = document.querySelector("#duck-display-likes");
const getDuckImg = document.querySelector("#duck-display-image");
const getDuckName = document.querySelector("#duck-display-name");
const getDuckNav = document.querySelector("#duck-nav");

const fetchData = async () => {
  const response = await fetch("http://localhost:3000/ducks");

  const data = await response.json();

  data.forEach((duck) => displayDuck(duck));
  data.forEach((duck) => duckNav(duck));
};

const displayDuck = (data) => {
  getDuckLikes.textContent = data.likes;
  getDuckImg.src = data.img_url;
  getDuckName.textContent = data.name;
};

getDuckLikes.addEventListener("click", () => {
  getDuckLikes.textContent = Number(getDuckLikes.textContent) + 1;
});

const duckNav = (data) => {
  const duckImg = document.createElement("img");
  duckImg.src = data.img_url;

  duckImg.addEventListener("click", () => {
    displayDuck(data);
  });

  getDuckNav.appendChild(duckImg);
};

const duckForm = document.getElementById("new-duck-form");

duckForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("new-name").value;
  const img_url = document.getElementById("new-image").value;

  const duck = {
    name,
    img_url,
  };

  displayDuck(duck);

  getDuckLikes.textContent = 0;

  duckForm.reset();
});

fetchData();
