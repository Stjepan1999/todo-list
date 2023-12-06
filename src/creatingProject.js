import { createEditIcons, showTasks, showTasksTest } from './creatingTask';
import {
  deleteProject,
  showEditOptions,
  showRenameForm,
} from './editingProject';

let projectID = 0;
const allProjects = JSON.parse(localStorage.getItem('allProjects')) || [];

function addEventListeners() {
  const showFormButton = document.querySelector('.create-project-button');
  showFormButton.addEventListener('click', () => showForm());

  const closeFormButton = document.querySelector('.button.close-form');
  closeFormButton.addEventListener('click', () => closeForm());

  const addProjectButton = document.querySelector('.button.add-project');
  addProjectButton.addEventListener('click', () => createNewProject());

  showProjects();
}

function CreateProject(title) {
  return {
    title,
    id: projectID++,
    tasks: [],
  };
}

function createNewProject() {
  if (validateForm()) {
    const projectTitle = document.getElementById('project-title').value;
    const newProject = CreateProject(projectTitle);
    allProjects.push(newProject);
    saveToLocalStorage();
    closeForm();
    showProjects();
  }
}

// Save all changes in projects or tasks
function saveToLocalStorage() {
  localStorage.setItem('allProjects', JSON.stringify(allProjects));
}

// Show form for adding projects
function showForm() {
  const addProjectForm = document.querySelector('.add-project-form');
  addProjectForm.classList.remove('hidden')
}

// Hide form for adding projects
function closeForm() {
  const addProjectForm = document.querySelector('.add-project-form');
  addProjectForm.classList.add('hidden')
  document.getElementById('project-title').value = '';
}

// Validate project name, project name should have minimum one character
function validateForm() {
  const projectTitle = document.getElementById('project-title').value;
  if (projectTitle.length < 1 || projectTitle.length > 20) {
    return false;
  }
  return true;
}

// Show all projects in sidebar
function showProjects() {
  const projectsListDiv = document.querySelector('.projects-list');
  projectsListDiv.innerHTML = '';

  allProjects.forEach((project) => {
    const projectDiv = createProjectElement(project);
    projectsListDiv.appendChild(projectDiv)
  })
}

// Create project div for every project
function createProjectElement(project) {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');
    projectDiv.dataset.project = project.id;
    projectDiv.addEventListener('click', (event) =>
      selectProject(event, project),
    );

    const projectIcon = document.createElement('img');
    projectIcon.classList.add('project-icon');
    projectIcon.src = './images/project-icon.png';
    projectDiv.appendChild(projectIcon);

    const projectTitle = document.createElement('div');
    projectTitle.classList.add('project-list-title');
    projectTitle.textContent = project.title;
    projectDiv.appendChild(projectTitle);

    // Create edit container for editing or deleting project
    const editContainer = document.createElement('div');
    editContainer.classList.add('edit-options');
    projectDiv.appendChild(editContainer);
    editContainer.addEventListener('click', () =>
      showEditOptions(projectDiv),
    );

    // Create three dots
    const editIcons = createEditIcons();
    editContainer.appendChild(editIcons)

    const optionsButtons = document.createElement('div');
    optionsButtons.classList.add('options-buttons');
    editContainer.appendChild(optionsButtons);


    const deleteProjectButton = document.createElement('button');
    deleteProjectButton.classList.add('delete-project-button');
    deleteProjectButton.textContent = 'Delete';
    optionsButtons.appendChild(deleteProjectButton);
    deleteProjectButton.addEventListener('click', () =>
      deleteProject(project.id),
    );

    const renameProjectButton = document.createElement('button');
    renameProjectButton.classList.add('rename-project-button');
    renameProjectButton.textContent = 'Rename';
    optionsButtons.appendChild(renameProjectButton);
    renameProjectButton.addEventListener('click', () => showRenameForm());

    return projectDiv
  }


// Add selected class to the project, and display tasks for that project
function selectProject(event, project) {
  const projectDiv = event.target.closest('.project');

  // If other project have 'selected' class, remove it
  document.querySelectorAll('.selected').forEach((container) => {
    if (container !== projectDiv) {
      container.classList.remove('selected');
    }
  });

  // Add selected class to clicked project
  projectDiv.classList.add('selected');

  // Update title of main section where tasks are showed
  const title = document.querySelector('.title');
  title.textContent = project.title;

  // Show tasks of project that is clicked
  showTasks(project.tasks)

  // Show form button for adding new tasks only in projects
  const showTaskFormButton = document.querySelector('.create-task-button');
  showTaskFormButton.classList.remove('hidden')
}

export {
  addEventListeners,
  allProjects,
  showProjects,
  saveToLocalStorage,
  selectProject,
};
