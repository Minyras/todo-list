// Select main elements for interaction
let sortIcon = document.querySelector(".sort");
let deleteIcon = document.querySelector(".delete");
let todos = document.querySelector(".todos");
let plusIcon = document.querySelector(".plus");
let inputContainer = document.querySelector(".input");
// let sortDownIcon = document.querySelector(".sort-down");
// let sortUpIcon = document.querySelector(".sort-up");

deleteIcon.addEventListener("click", () => {
  inputContainer.style.display = "none";
  todos.style.display = "block";
});

plusIcon.addEventListener("click", (e) => {
  inputContainer.style.display = "block";
  todos.style.display = "none";
  e.preventDefault();
});

let todoss = [];

class Todo {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}

class List {
  constructor() {
    this.input = document.querySelector("input");
    this.btn = document.querySelector(".button");
    this.sorted = true;

    this.btn.addEventListener("click", (e) => {
      this.addTodo();
      e.preventDefault();
    });
  }

  addTodo = () => {
    let todoText = this.input.value.trim();
    if (todoText) {
      let newTodo = new Todo(todoText, Date.now());
      todoss.push(newTodo);
      this.displayTodos();
      inputContainer.style.display = "none";
      todos.style.display = "block";
    }
    this.input.value = "";
  };

  displayTodos = () => {
    todos.innerHTML = "";
    let ul = document.createElement("ul");
    if (todoss.length === 0) {
      todos.style.display = "none";
      this.sorted = true;
      sortDownIcon.style.display = "block";
      sortUpIcon.style.display = "none";
    } else {
      todos.style.display = "block";
      todoss.forEach((todo) => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        let img = document.createElement("img");
        span.textContent = todo.name;
        img.src = "./assets/svg/delete.svg";
        img.classList.add("delete-todo");
        img.addEventListener("click", () => this.deleteTodo(todo.id));
        li.appendChild(span);
        li.appendChild(img);
        ul.appendChild(li);
      });
      todos.appendChild(ul);
    }
  };

  deleteTodo = (id) => {
    todoss = todoss.filter((todo) => todo.id !== id);
    this.displayTodos();
  };

  sortTodo = () => {
    // console.log(todoss.length);
    let sortDownIcon = document.querySelector(".sort-down");
    let sortUpIcon = document.querySelector(".sort-up");
    if (todoss.length > 0) {
      console.log("sjfdhjkb");

      todoss.sort((a, b) => {
        return this.sorted
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
      this.sorted = !this.sorted;
      //   console.log(this.sorted, "hukj");
      let sortdowndisplay = getComputedStyle(sortDownIcon).display;
      let sortupdisplay = getComputedStyle(sortUpIcon).display;
      //   sortDownIcon.style.display =
      //     sortdowndisplay === "none" ? "block" : "none";
      //   sortUpIcon.style.display = sortupdisplay === "block" ? "none" : "block";
      //   console.log(sortdowndisplay === "none" ? "block" : "none");
      //   console.log(getComputedStyle(sortDownIcon).display);
      //   console.log(sortUpIcon.style.display);

      this.displayTodos();
    }
  };
}

let todo = new List();
sortIcon.addEventListener("click", (e) => {
  e.preventDefault();
  todo.sortTodo();
  //   console.log("sjndm");
});
