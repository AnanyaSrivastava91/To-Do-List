ScrollReveal().reveal('.headline',{ delay: 200 });
ScrollReveal().reveal('.input-field',{ delay: 500 });

const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
let editTodo = null;

// Function to add todo
const addTodo = () => {
    const inputText = inputBox.value.trim();
    const category = document.getElementById('categorySelect').value;

    if (inputText.length <= 0) {
        alert("Please enter a task.");
        return false;
    }

    if (addBtn.value === "Edit") {
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML.split(" (")[0]);
        editTodo.target.previousElementSibling.innerHTML = `${inputText} (${category})`;
        addBtn.value = "Add";
        inputBox.value = "";
    } else {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = `${inputText} (${category})`;
        li.appendChild(p);

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = "";

        saveLocalTodos({ text: inputText, category: category });
    }
}

// function to update
const updateTodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML.split(" (")[0];
        document.getElementById('categorySelect').value = e.target.previousElementSibling.innerHTML.split(" (")[1].slice(0, -1);
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
}

// to save locally
const saveLocalTodos = (todo) => {
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

const getLocalTodos = () => {
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    todos.forEach(todo => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = `${todo.text} (${todo.category})`;
        li.appendChild(p);

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
}

// delete local stored data
const deleteLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoText = todo.children[0].innerHTML.split(" (")[0];
    let todoIndex = todos.findIndex(t => t.text === todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

const editLocalTodos = (todoText) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.findIndex(t => t.text === todoText);
    todos[todoIndex].text = inputBox.value;
    todos[todoIndex].category = document.getElementById('categorySelect').value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
ScrollReveal().reveal('.headline');


