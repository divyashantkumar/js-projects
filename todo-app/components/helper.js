

const todoList = document.getElementById("todoList"); 
const todoInput = document.getElementById("todoInput");

// Load todos from local storage
export function loadTodos() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    let liststr = "";
    if (Array.isArray(storedTasks) && storedTasks.length > 0) {
        storedTasks.forEach((task) => {
            liststr += ` <li class="todoItem list-group-item d-flex justify-content-between">
                            <span class="todoText">${task.text}</span>
                            <span style="width: 150px;">
                                <button class="btn btn-success" id="editBtn">Edit</button>
                                <button class="btn btn-danger" id="deleteBtn">Delete</button>
                            </span>
                        </li>`
        });
        todoList.innerHTML = liststr;
    }
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



export function editTaskFormHandler(e) {
    e.preventDefault();
    e.stopPropagation();
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
    console.log("asdfjjhasfdhaksdf ")
    loadTodos();
}

export function deleteTask(id) {
    
}