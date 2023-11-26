let taskID = 0;
let allTasks = [];


function createTaskEvents () {
    const showFormButton = document.querySelector(".create-task-button")
    showFormButton.addEventListener("click", () => showForm())

    const closeFormButton = document.querySelector(".button.close-task-form");
    closeFormButton.addEventListener("click", () => closeForm())

    const addTaskButton = document.querySelector(".button.add-task");
    addTaskButton.addEventListener("click", () => createNewTask())
}

function CreateTask(title, description, date) {
    return {
        id: taskID++,
        title,
        description,
        date
    }
}

function createNewTask() {
    const taskTitle = document.getElementById("task-title");
    const taskDescription = document.getElementById("task-description");
    const taskDate = document.getElementById("task-date");

    const newTask = CreateTask(taskTitle.value, taskDescription.value, taskDate.value);
    allTasks.push(newTask);
    taskTitle.value = "";
    taskDescription.value = "";
    taskDate.value = "";    
}

function showForm() {
    const taskForm = document.querySelector(".add-task-form");
    taskForm.style.display = "flex"
}

function closeForm() {
    const taskForm = document.querySelector(".add-task-form");
    taskForm.style.display = "none"
}



export { createTaskEvents }