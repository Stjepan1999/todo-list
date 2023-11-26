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
    //taskTitle.value = "";
    //taskDescription.value = "";
    //taskDate.value = "";    
    closeForm();
    showTasks();
}

function showForm() {
    const taskForm = document.querySelector(".add-task-form");
    taskForm.style.display = "flex"
}

function closeForm() {
    const taskForm = document.querySelector(".add-task-form");
    taskForm.style.display = "none"
}

function showTasks() {
    const tasksContainer = document.querySelector(".tasks-container");
    tasksContainer.innerHTML = ""

    for (let i = 0; i < allTasks.length; i++) {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        const circle = document.createElement("span");
        circle.classList.add("circle");

        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");

        const taskTitle = document.createElement("div");
        taskTitle.classList.add("task-title");
        taskTitle.textContent = allTasks[i].title;

        const taskDescription = document.createElement("div");
        taskDescription.classList.add("task-description");
        taskDescription.textContent = allTasks[i].description;

        const taskDate = document.createElement("div");
        taskDate.classList.add("date");
        taskDate.textContent = allTasks[i].date;

        const importantStar = document.createElement("div");
        importantStar.classList.add("important-star");
        importantStar.textContent = "Star"

        const editIcons = document.createElement("div");
        editIcons.classList.add("edit-icons");
        for (let j = 0; j < 3; j++) {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            editIcons.appendChild(dot);
        }

        const optionsButtons = document.createElement("div");
        optionsButtons.classList.add("options-buttons");

        const deleteTaskButton = document.createElement("button");
        deleteTaskButton.classList.add("delete-project-button");
        deleteTaskButton.textContent = "Delete";

        const editTaskButton = document.createElement("button");
        editTaskButton.classList.add("rename-project-button");
        editTaskButton.textContent = "Edit";

        taskDiv.appendChild(circle);
        taskInfo.appendChild(taskTitle);
        taskInfo.appendChild(taskDescription);
        taskDiv.appendChild(taskInfo);
        taskDiv.appendChild(taskDate);
        taskDiv.appendChild(importantStar);
        taskDiv.appendChild(editIcons);
        tasksContainer.appendChild(taskDiv);

    }
}



export { createTaskEvents }