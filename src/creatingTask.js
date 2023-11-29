import { allProjects } from "./creatingProject";

let taskID = 0;

function createTaskEvents () {
    const showFormButton = document.querySelector(".create-task-button")
    showFormButton.addEventListener("click", () => showForm())

    const closeFormButton = document.querySelector(".button.close-task-form");
    closeFormButton.addEventListener("click", () => closeForm());

    const addTaskButton = document.querySelector(".button.add-task");
    addTaskButton.addEventListener("click", createNewTask)
}


function CreateTask(title, description, date) {
    return {
        id: taskID++,
        title,
        description,
        date,
        important: "no"
    }
}

function createNewTask() {
    const taskTitle = document.getElementById("task-title").value;
    const taskDescription = document.getElementById("task-description").value;
    const taskDate = document.getElementById("task-date").value;

    const projectIndex = findSelectedProject()
    const project = allProjects[projectIndex].tasks

    const newTask = CreateTask(taskTitle, taskDescription, taskDate);
    project.push(newTask)
  
    closeForm();
    showTasks(project)
}

function deleteTask(project, index) {
    project.splice(index, 1);
    showTasks(project)
}

function showForm() {
    const taskForm = document.querySelector(".add-task-form");
    taskForm.style.display = "flex"
}

function closeForm() {
    const taskForm = document.querySelector(".add-task-form");
    taskForm.style.display = "none"

    document.getElementById("task-title").value = "";
    document.getElementById("task-description").value = "";
    document.getElementById("task-date").value = "";
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
        if (projectTasks[i].date === "") {
            taskDate.textContent = "No Due Date"
        } else {
            taskDate.textContent = projectTasks[i].date;
        }

        const importantStar = document.createElement("div");
        importantStar.classList.add("important-star");
        if (projectTasks[i].important === "yes") {
            importantStar.innerHTML = "&#9733;";
            importantStar.style.color = "#fec811"
        } else {
            importantStar.innerHTML = "&#9734;"
        }
        importantStar.addEventListener("click", () => addToImportant(projectTasks[i], importantStar))

        const editContainer = document.createElement("div");
        editContainer.classList.add("edit-options");
        editContainer.addEventListener("click", () => showEditOptions(editContainer))

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
        deleteTaskButton.addEventListener("click", () => deleteTask(projectTasks, i))

        const editTaskButton = document.createElement("button");
        editTaskButton.classList.add("rename-project-button");
        editTaskButton.textContent = "Edit";

        optionsButtons.appendChild(deleteTaskButton)
        optionsButtons.appendChild(editTaskButton)
        editContainer.appendChild(editIcons)
        editContainer.appendChild(optionsButtons)

        taskDiv.appendChild(circle);
        taskInfo.appendChild(taskTitle);
        taskInfo.appendChild(taskDescription);
        taskDiv.appendChild(taskInfo);
        taskDiv.appendChild(taskDate);
        taskDiv.appendChild(importantStar);
        taskDiv.appendChild(editContainer);
        tasksContainer.appendChild(taskDiv);
    }
}

function addToImportant(task, importantStar) {
    if (task.important === "no") {
        task.important = "yes"
        importantStar.innerHTML = "&#9733;"
        importantStar.style.color = "#fec811"
    } else {
        task.important = "no";
        importantStar.innerHTML = "&#9734;"
        importantStar.style.color = "black"
    }
}

function showEditOptions(editContainer) {
    const optionsButtons = editContainer.querySelector(".options-buttons");

    // Close all open options before toggling the current one
    document.querySelectorAll('.visible').forEach(container => {
        if (container !== editContainer) {
            container.classList.remove('visible');
        }
    });
    optionsButtons.classList.toggle("visible");

    // Add a click event listener to the document body
    // If clicked, options become invisible
    document.body.addEventListener("click", () => {
        optionsButtons.classList.remove("visible");
        });

    editContainer.addEventListener("click", (event) => {
        event.stopPropagation();
    })
}

function findSelectedProject() {
    const selected = document.querySelector(".selected");
    return selected.dataset.project
}


export { createTaskEvents, showTasks }