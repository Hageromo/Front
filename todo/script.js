const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");


var inputEdit = document.getElementById("input");
var addBtn = document.getElementById("add");
var ul = document.getElementById("todos");


const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement("li");
        if (todo && todo.completed) {
            todoEl.classList.add("completed");
        }

        todoEl.innerText = todoText;



        todoEl.addEventListener("click", () => {

            todoEl.classList.toggle("completed");
            updateLS();
        });

/*
        todoEl.addEventListener("click", () => {

            todoEl.onclick = function () {
                var p = prompt("Edit your entry");
                var entry = this.parentElement.getElementsByClassName("userEntry")[0]; // get sibling userEntry element
                entry.innerText = p;
            }

            todos.onclick = function () {
                this.classList.toggle("checked");
            }

            input.value = "";
            updateLS();

        });*/



            todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            todoEl.remove();

            updateLS();
        });



        const deleteBtn = document.getElementById("delete");

        function deleteItem(){
            if(todoEl.classList.contains("completed")){
                todoEl.remove();
                updateLS();
            }
        }
        deleteBtn.addEventListener("click", deleteItem);


        todosUL.appendChild(todoEl);

        input.value = "";

        updateLS();
    }


}

function updateLS() {

    const todosEl = document.querySelectorAll("li");

    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

window.addEventListener("load", function(){
    document.getElementById("the-filter").addEventListener("keyup", function(){
        var search = this.value.toLowerCase();

        var all = document.querySelectorAll("#todos li");

        for (let i of all) {
            let item = i.innerHTML.toLowerCase();
            if (item.indexOf(search) == -1) { i.classList.add("hide"); }
            else { i.classList.remove("hide"); }
        }
    });
});




/*


        addBtn.onclick = function () {
            if (inputEdit.value !== "") {
                var li = document.createElement("LI");
                ul.appendChild(li);
                updateLS();
            }
            else {
                alert("List item cannot be empty");
                updateLS();
            }



            var entry = document.createElement("SPAN");
            var entryText = document.createTextNode(inputEdit.value);
            entry.className = "userEntry";
            entry.appendChild(entryText);
            li.appendChild(entry);

            var close = document.createElement("SPAN");
            var cText = document.createTextNode("\u00D7");

            close.className = "close";
            close.appendChild(cText);
            li.appendChild(close);
            close.onclick = function () {
                this.parentElement.style.display = "none";
                updateLS();
            }





            var edit = document.createElement("SPAN");
            var eText = document.createTextNode("\u270E");

            edit.className = "edit";
            edit.appendChild(eText);
            todos.appendChild(edit);
            edit.onclick = function () {
                var p = prompt("Edit your entry");
                var entry = this.parentElement.getElementsByClassName("userEntry")[0]; // get sibling userEntry element
                entry.innerText = p;
                updateLS();
            }

            li.onclick = function () {
                this.classList.toggle("checked");
                updateLS();
            }

            inputEdit.value = "";

            updateLS();

        }
*/