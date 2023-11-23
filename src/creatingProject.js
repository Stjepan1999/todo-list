let projectID = 0;
let allProjects = [];


function addEventListeners() {
    const showFormButton = document.querySelector(".create-form-button");
    showFormButton.addEventListener("click", () => createForm());

    const closeFormButton = document.querySelector(".button.close-form");
    closeFormButton.addEventListener("click", () => closeForm());

    const addProjectButton = document.querySelector(".button.add-project");
    addProjectButton.addEventListener("click", () => createNewProject());

    
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
        document.getElementById("project-title").value = "";
        closeForm()
        showProjects();
        console.log(allProjects)
    }
}

function deleteProject(id) {
    let index = allProjects.findIndex(project => project.id === id);
    console.log("Index:", index)
    allProjects.splice(index);
    showProjects();
    console.log("After deleting: ", allProjects)
}

function createForm() {
    const addProjectForm = document.querySelector(".add-project-form");
    addProjectForm.style.display = "flex";
}

function closeForm() {
    const addProjectForm = document.querySelector(".add-project-form");
    addProjectForm.style.display = "none";
}

function validateForm() {
    const projectTitle = document.getElementById("project-title").value;
    if (projectTitle.length < 1 || projectTitle.length > 20) {
        return false
    }
    return true
}

function showProjects() {
    let projectsListDiv = document.querySelector(".projects-list")
    let projectsHTML = '';
    

    for (let i = 0; i < allProjects.length; i++) {

        //const projectDiv = document.createElement("div");
        //projectDiv.classList.add("project");

        projectsHTML += `
        <div class="project">
            <img src="./images/project-icon.png" class="project-icon">
            <div class="projects-list-title">${allProjects[i].title}</div>
            <div class="edit-options">
                <div class="edit-container">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                <div class="options-buttons">
                    <button class="delete-project-button">Delete</button>
                    <button class="rename-project-button">Rename</button>
                </div>
            </div>
        </div>`;
    }
    projectsListDiv.innerHTML = projectsHTML
    showEditOptions()
}

function showEditOptions() {
    const editContainers = document.querySelectorAll(".edit-container");
    // For checking if options are already open, if they are they will be closed
    let openOptions = null; 

    editContainers.forEach((editContainer) => {
        editContainer.addEventListener("click", (event) => {
            const optionsButtons = event.currentTarget.nextElementSibling;
            

            if (openOptions && openOptions !== optionsButtons) {
                openOptions.classList.remove("visible")
            }

            optionsButtons.classList.toggle("visible");
            openOptions = optionsButtons;

            event.stopPropagation();
        });
    });

    document.body.addEventListener("click", () => {
        document.querySelectorAll('.options-buttons').forEach(buttons => {
            buttons.classList.remove('visible');
        });
    });
}


export { addEventListeners }