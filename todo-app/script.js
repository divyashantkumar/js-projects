import { renderTodos, formSubmitHandler } from "./components/helper.js";

const submitBtn = document.getElementById("submitBtn");

// Load todos from local storage
document.addEventListener('DOMContentLoaded', renderTodos);

// Add todo on submit
submitBtn.addEventListener("click", formSubmitHandler);

