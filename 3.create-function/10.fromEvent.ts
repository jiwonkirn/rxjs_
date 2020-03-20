import "./styles.css";
import { fromEvent } from "rxjs";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div class="hello">
  hello~~
</div>
<button class="remove">REMOVE</button>
`;

const hello = document.querySelector(".hello");
const button = document.querySelector(".remove");

const buttonEvent = fromEvent(hello, "click").subscribe(
  e => {
    const elem = document.createElement("p");
    elem.textContent = "hello~~";
    hello.appendChild(elem);
  },
  error => console.log(error),
  () => console.log("completed")
);

fromEvent(button, "click").subscribe(() => {
  buttonEvent.unsubscribe();
});

