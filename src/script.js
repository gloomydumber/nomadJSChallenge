// background image starts here

function backgroundImageHandler() {
  fetch("https://picsum.photos/1920/1080")
    .then((data) => data.url)
    .then((data) => {
      document.body.style.backgroundImage = `url(${data})`;
    })
    .catch((e) => console.error(e, "Error : Image Loading error Occured."));
}

// background image ends here

// weather info starts here

const $location = document.getElementById("location");
const $weather = document.getElementById("weather");

function weatherInfoHandler() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const API_KEY = "7d315a8df00388a1d322b7b1709cb0a9";
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          $location.innerText = data.name;
          $weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
        });
    },
    () => {
      alert("Can't find you. No weather for you.");
    }
  );
}

// weather info ends here

// timer starts from here

const $ymd = document.getElementById("ymd");
const $hms = document.getElementById("hms");

function zeroChecker(number) {
  if (number < 10) return `0${number}`;
  return number;
}

function timeHandler() {
  const now = new Date();
  const year = now.getFullYear();
  const month = zeroChecker(now.getMonth() + 1);
  const date = zeroChecker(now.getDate());
  const hour = zeroChecker(now.getHours());
  const minute = zeroChecker(now.getMinutes());
  const second = zeroChecker(now.getSeconds());

  $ymd.innerText = `${year}-${month}-${date}`;
  $hms.innerText = `${hour}:${minute}:${second}`;

  setTimeout(() => {
    timeHandler();
  }, 1000);
}

// timer ends here

// login starts here

const $loginForm = document.getElementById("loginForm");
$loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userValue = e.target[0].value;
  localStorage.setItem("id", userValue);
  loginHandler();
});

const $loginWrapper = document.getElementById("loginWrapper");

function loginHandler() {
  const id = localStorage.getItem("id");
  if (id) {
    $loginForm.remove();
    const id = localStorage.getItem("id");
    const $greetingDiv = document.createElement("div");
    $greetingDiv.innerText = `Hello, ${id}`;
    $greetingDiv.style.fontSize = "4rem";
    $greetingDiv.style.color = "lime";
    $loginWrapper.append($greetingDiv);
  }
}

// login ends here

// todoHandler starts here

const $todoForm = document.getElementById("todoForm");
$todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userValue = e.target[0].value;
  e.target[0].value = "";
  todoSetter(userValue);
});

function todoSetter(userValue) {
  const todos = localStorage.getItem("todos");
  if (todos) {
    const parsed = JSON.parse(todos);
    if (parsed.length > 9) return alert("Too many to do");
    const newTodos = [...parsed, userValue];
    localStorage.setItem("todos", JSON.stringify(newTodos));
  } else {
    localStorage.setItem("todos", JSON.stringify([userValue]));
  }
  return todoHandler();
}

$todosWrapper = document.getElementById("todosWrapper");
function todoHandler() {
  $todosWrapper.innerHTML = "";
  const todos = localStorage.getItem("todos");
  if (todos) {
    const parsed = JSON.parse(todos);
    parsed.forEach((element, idx) => {
      const div = document.createElement("div");
      div.innerText = element;
      div.style.height = "10%";
      div.style.fontSize = "1.5rem";
      div.classList.add("todos");
      div.setAttribute("idx", idx);
      div.addEventListener("click", (e) => {
        todoRemover(e.target.getAttribute("idx"));
      });
      $todosWrapper.append(div);
    });
  }
}

function todoRemover(idx) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(idx, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  todoHandler();
}

// todoHandler ends here

function init() {
  backgroundImageHandler();
  weatherInfoHandler();
  timeHandler();
  loginHandler();
  todoHandler();
}

init();
