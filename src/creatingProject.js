import { showTasks } from './creatingTask'
import { deleteProject, showEditOptions } from './editingProject';

let projectID = 0;
let allProjects = JSON.parse(localStorage.getItem("allProjects")) || [];
console.log(allProjects)

function addEventListeners() {
    const showFormButton = document.querySelector(".create-project-button");
    showFormButton.addEventListener("click", () => createForm());

    const closeFormButton = document.querySelector(".button.close-form");
    closeFormButton.addEventListener("click", () => closeForm());

    const addProjectButton = document.querySelector(".button.add-project");
    addProjectButton.addEventListener("click", () => createNewProject());

    showProjects()
}

function CreateProject(title) {
    return {
        title,
        id: projectID++,
        tasks: []
    }
}

function createNewProject() {
    if (validateForm()) {
        const projectTitle = document.getElementById("project-title").value;
        const newProject = CreateProject(projectTitle);
        allProjects.push(newProject);
        saveToLocalStorage()
        closeForm()
        showProjects();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('allProjects', JSON.stringify(allProjects));
}

function createForm() {
    const addProjectForm = document.querySelector(".add-project-form");
    addProjectForm.style.display = "flex";
}

function closeForm() {
    const addProjectForm = document.querySelector(".add-project-form");
    addProjectForm.style.display = "none";
    document.getElementById("project-title").value = "";
}

function validateForm() {
    const projectTitle = document.getElementById("project-title").value;
    if (projectTitle.length < 1 || projectTitle.length > 20) {
        return false
    }
    return true
}

function showProjects() {
    let projectsListDiv = document.querySelector(".projects-list");
    projectsListDiv.innerHTML = "";
    const storedProjects = JSON.parse(localStorage.getItem("allProjects"));

    for (let i = 0; i < storedProjects.length; i++) {

        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.dataset.project = i;
        projectDiv.addEventListener("click", () => selectProject(projectDiv, allProjects[i]))

        const projectIcon = document.createElement("img");
        projectIcon.classList.add("project-icon");
        projectIcon.src = "./images/project-icon.png"
        projectDiv.appendChild(projectIcon);

        const projectTitle = document.createElement("div");
        projectTitle.classList.add("project-list-title");
        projectTitle.textContent = allProjects[i].title
        projectDiv.appendChild(projectTitle)

        const editContainer = document.createElement("div");
        editContainer.classList.add("edit-options");

        const editIcons = document.createElement("div");
        editIcons.classList.add("edit-icons")
        for (let j = 0; j < 3; j++) {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            editIcons.appendChild(dot)
        }

        const optionsButtons = document.createElement("div");
        optionsButtons.classList.add("options-buttons")

        const deleteProjectButton = document.createElement("button");
        deleteProjectButton.classList.add("delete-project-button");
        deleteProjectButton.textContent = "Delete";
        deleteProjectButton.addEventListener("click", () => deleteProject(allProjects[i].id))
        
        const renameProjectButton = document.createElement("button");
        renameProjectButton.classList.add("rename-project-button");
        renameProjectButton.textContent = "Rename";
        renameProjectButton.addEventListener("click", () => renameProject())

        optionsButtons.appendChild(deleteProjectButton)
        optionsButtons.appendChild(renameProjectButton)

        editContainer.appendChild(editIcons)
        editContainer.appendChild(optionsButtons)

        projectDiv.appendChild(editContainer)

        projectsListDiv.appendChild(projectDiv)

        editContainer.addEventListener("click", () => showEditOptions(editContainer))
    }
}

function selectProject(projectDiv, project) {
    document.querySelectorAll(".selected").forEach(container => {
        if(container !== projectDiv) {
            container.classList.remove("selected")
        }
    })
    projectDiv.classList.add("selected")

    const title = document.querySelector(".title");
    title.textContent = project.title

    showTasks(project.tasks)

    const showFormButton = document.querySelector(".create-task-button");
    showFormButton.style.display = "flex"
}

export { addEventListeners, allProjects, showProjects, saveToLocalStorage}