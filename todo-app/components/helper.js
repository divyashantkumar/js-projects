

const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");

const editBtn = document.getElementById("editBtn");

const modalContainer = document.getElementById("modalContainer");

/**
 * renderTodos loads the tasks from local storage and displays them in the todo list.
 *
 * Retrieves the existing tasks from local storage, and if there are any tasks,
 * creates a string of todo list items from the tasks, and updates the todo list
 * with the new string.
 */
export function renderTodos() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    let liststr = "";
    if (Array.isArray(storedTasks) && storedTasks.length > 0) {
        storedTasks.forEach((task) => {
            liststr += ` <li class="todoItem list-group-item d-flex justify-content-between">
                            <span class="todoText">${task.text}</span>
                            <span style="width: 150px;">
                                <button type="button" class="editBtn btn btn-primary" onclick="sessionStorage.setItem('taskUpdateId', ${task.id})">
                                    Edit
                                </button>
                                <button class="deleteBtn btn btn-danger" id="deleteBtn" onclick="sessionStorage.setItem('taskDeleteId', ${task.id})">Delete</button>
                            </span>
                        </li>`
        });
        todoList.innerHTML = liststr;

        handleEditButtons();
        handleDeleteButton();
    }
    if(liststr == "") {
        todoList.innerHTML = `<h5 class="text-primary">There is no task added</h5>`;
    }
}

function handleEditButtons() {
    document.querySelectorAll('.editBtn').forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const todoInput = document.getElementById('todoInput');
            const id = sessionStorage.getItem('taskUpdateId');
            const tasks = JSON.parse(localStorage.getItem('tasks'));
            const task = tasks.filter((item) => item.id == id);

            todoInput.value = task[0].text;

            const submitBtn = document.getElementById('submitBtn');
            submitBtn.setAttribute('disabled', true);

            let updateBtn = document.getElementById('updateBtn');
            if (!updateBtn) {
                let btn = document.createElement('button');
                btn.setAttribute('type', 'submit');
                btn.setAttribute('id', 'updateBtn');
                btn.setAttribute('class', 'btn btn-success mt-3 mb-3 me-3');
                btn.innerText = 'Update Task';
                submitBtn.insertAdjacentElement('beforebegin', btn);
            }
            
            updateBtn = document.getElementById('updateBtn');
            updateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if(todoInput == "") return; 
                tasks.forEach((item, index) => {
                    if(item.id == id) {
                        tasks[index].text = todoInput.value;
                    }
                });
                
                sessionStorage.removeItem('taskUpdateId');
                window.location.reload();
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTodos();
            });
        });
    })
}

function handleDeleteButton() {
    document.querySelectorAll('.deleteBtn').forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = sessionStorage.getItem('taskDeleteId');
            const tasks = JSON.parse(localStorage.getItem('tasks'));

            let updatedTasks = tasks.filter((item) => {
                if(item.id != id) {
                    return item;
                }
            });
            
            sessionStorage.removeItem('taskUpdateId');
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            renderTodos();
        });
    })
}

/**
 * Handles the submit event of the add task form.
 *
 * Prevents the default form submission event,
 * gets the text value of the input field,
 * creates a new task object from the input text with a unique id and completed status as false,
 * and adds the new task to the list of tasks in local storage using addTask.
 *
 * @param {Event} e The submit event.
 */
export function formSubmitHandler(e) {
    e.preventDefault();

    const todo = todoInput.value;

    if (todo) {
        const newTask = {
            id: Date.now(),
            text: todo,
            completed: false,
        };

        addTask(newTask);
    }
}

/**
 * Adds a new task to the list of tasks in local storage.
 *
 * Retrieves the existing tasks from local storage, adds the new task to the list, and
 * updates local storage with the new list. If local storage is empty, it will create
 * a new list with the new task.
 *
 * @param {Object} newTask A task object with properties id, text, and completed.
 */
export function addTask(newTask) {
    let storedTasks = JSON.parse(localStorage.getItem("tasks"));
    let newList = [];
    newList.push(newTask);
    if (Array.isArray(storedTasks) && storedTasks.length > 0) {
        newList = [...newList, ...storedTasks]
    }
    localStorage.setItem("tasks", JSON.stringify(newList));
    todoInput.value = "";
    renderTodos();
}

export function deleteTask(id) {

}
