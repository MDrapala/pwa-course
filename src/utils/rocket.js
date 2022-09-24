const API_URL = "https://api.spacexdata.com/v3/rockets";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const rocketID = urlParams.get("id");

if (rocketID) {
  fetch(`${API_URL}/${rocketID}`)
    .then((response) => response.json())
    .then((data) => {
      let stringifiedData = JSON.stringify(data);
      document.querySelector("#rocket").innerHTML +=
        "<p>" + data.first_flight + "</p>";
      document.querySelector("#rocket").innerHTML +=
        "<p>" + data.country + "</p>";
      document.querySelector("#rocket").innerHTML +=
        "<p>" + data.wikipedia + "</p>";
      document.querySelector("#rocket").innerHTML +=
        "<p>" + data.description + "</p>";
      localStorage.setItem("rockets", JSON.stringify(data));
    });
  localStorage.setItem("rocketslist", JSON.stringify(data));
} else {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      let ul = document.createElement("ul");
      ul.setAttribute("id", "proList");
      document.querySelector("#rockets").appendChild(ul);
      data.forEach((items) => {
        let a = document.createElement("a");
        let li = document.createElement("li");
        let linkText = document.createTextNode(items.rocket_name);

        li.setAttribute("class", "item");
        ul.appendChild(li);
        li.appendChild(a);
        a.appendChild(linkText);

        a.title = items.rocket_name;
        a.href = "http://localhost:8080/?id=" + items.rocket_id;
      });
      localStorage.setItem("rocketslist", JSON.stringify(data));
    });
}
