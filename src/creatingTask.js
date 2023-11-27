import { allProjects } from "./creatingProject";

let taskID = 0;

function createTaskEvents () {
    const showFormButton = document.querySelector(".create-task-button")
    showFormButton.addEventListener("click", () => showForm())

    const closeFormButton = document.querySelector(".button.close-task-form");
    closeFormButton.addEventListener("click", () => closeForm())
}


function CreateTask(title, description, date) {
    return {
        id: taskID++,
        title,
        description,
        date
    }
}

function createNewTask(projectTasks) {
    const taskTitle = document.getElementById("task-title").value;
    const taskDescription = document.getElementById("task-description").value;
    const taskDate = document.getElementById("task-date").value;

    const newTask = CreateTask(taskTitle, taskDescription, taskDate);
    projectTasks.push(newTask)
    //taskTitle.value = "";
    //taskDescription.value = "";
    //taskDate.value = "";    
    closeForm();
    showTasks(projectTasks)
}

function createButton(project) {
    const formButtons = document.querySelector(".task-buttons");
    formButtons.innerHTML = "";

    const addTaskButton = document.createElement("button");
    addTaskButton.classList.add("button")
    addTaskButton.classList.add("add-task")
    addTaskButton.addEventListener("click", () => createNewTask(project))

    formButtons.appendChild(addTaskButton)
    
}

function showForm() {
    const taskForm = document.querySelector(".add-task-form");
    taskForm.style.display = "flex"
}

function closeForm() {
    const taskForm = document.querySelector(".add-task-form");
    taskForm.style.display = "none"

    //document.getElementById("task-title").value = "";
    //document.getElementById("task-description").value = "";
    //document.getElementById("task-date").value = "";
}

function showTasks(projectTasks) {
    const tasksContainer = document.querySelector(".tasks-container");
    tasksContainer.innerHTML = ""
    
    for (let i = 0; i < projectTasks.length; i++) {

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        const circle = document.createElement("span");
        circle.classList.add("circle");

        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");

        const taskTitle = document.createElement("div");
        taskTitle.classList.add("task-title");
        taskTitle.textContent = projectTasks[i].title;

        const taskDescription = document.createElement("div");
        taskDescription.classList.add("task-description");
        taskDescription.textContent = projectTasks[i].description;

        const taskDate = document.createElement("div");
        taskDate.classList.add("date");
        taskDate.textContent = projectTasks[i].date;

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
    
    createButton(projectTasks)
}




export { createTaskEvents, showTasks, createButton }