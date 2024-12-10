import { addTask, loadTodos, formSubmitHandler } from "./components/helper.js";



const submitBtn = document.getElementById("submitBtn");
const editBtn = document.getElementById("editBtn");
const deleteBnt = document.getElementById("deleteBtn");

// Load todos from local storage
document.addEventListener('DOMContentLoaded', loadTodos);

// Add todo on submit
submitBtn.addEventListener("click", formSubmitHandler);