let formData = document.querySelector("form");

let address = document.getElementById("para1");
let weather = document.getElementById("para2");

formData.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputBox = document.querySelector("input");
  let location = inputBox.value;
  address.innerHTML = "Loading....";
  weather.innerHTML = "";
  fetch("/weather?address=" + location)
    .then((res) => {
      res.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          address.innerHTML = data.error;
        } else {
          console.log(data.Address);
          console.log(data.weather);

          address.innerHTML = data.Address;
          weather.innerHTML = data.weather;
        }
      });
    })
    .catch((err) => console.log("Cannot fetch the data " + err));
});
