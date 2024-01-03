import { createEditIcons, showTasks, taskID, findSelectedProject } from './task';

// Get ID for projects, or create default one
let projectID = parseInt(localStorage.getItem('projectID')) || 0;

// Get all projects array, or create empty one
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
  localStorage.setItem('projectID', projectID.toString());
  localStorage.setItem('taskID', taskID.toString());
}

// Show form for adding projects
function showForm() {
  const addProjectForm = document.querySelector('.add-project-form');
  addProjectForm.classList.remove('hidden');
}

// Hide form for adding projects
function closeForm() {
  const addProjectForm = document.querySelector('.add-project-form');
  addProjectForm.classList.add('hidden');
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
    projectsListDiv.appendChild(projectDiv);
  });
}

// Create project div for every project
function createProjectElement(project) {
  const projectDiv = document.createElement('div');
  projectDiv.classList.add('project');
  projectDiv.dataset.id = project.id;
  projectDiv.addEventListener('click', (event) => selectProject(event, project));

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
  editContainer.addEventListener('click', () => showEditOptions(projectDiv));

  // Create three dots
  const editIcons = createEditIcons();
  editContainer.appendChild(editIcons);

  const optionsButtons = document.createElement('div');
  optionsButtons.classList.add('options-buttons');
  editContainer.appendChild(optionsButtons);

  const deleteProjectButton = document.createElement('button');
  deleteProjectButton.classList.add('delete-project-button');
  deleteProjectButton.textContent = 'Delete';
  optionsButtons.appendChild(deleteProjectButton);
  deleteProjectButton.addEventListener('click', () => deleteProject(project.id));

  const renameProjectButton = document.createElement('button');
  renameProjectButton.classList.add('rename-project-button');
  renameProjectButton.textContent = 'Rename';
  optionsButtons.appendChild(renameProjectButton);
  renameProjectButton.addEventListener('click', () => showRenameForm());

  return projectDiv;
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

  projectDiv.classList.add('selected');

  // Update title of main section where tasks are showed
  const title = document.querySelector('.title');
  title.textContent = project.title;

  // Show tasks of project that is clicked
  showTasks(project.tasks);

  // Show form button for adding new tasks only in projects
  const showTaskFormButton = document.querySelector('.create-task-button');
  showTaskFormButton.classList.remove('hidden');
}

function deleteProject(id) {
  const index = allProjects.findIndex((project) => project.id === id);
  allProjects.splice(index, 1);
  saveToLocalStorage();
  showProjects();
}

function showEditOptions(editContainer) {
  const optionsButtons = editContainer.querySelector('.options-buttons');
  optionsButtons.classList.toggle('visible');

  // Close all open options before toggling the current one
  document.querySelectorAll('.visible').forEach((container) => {
    if (container !== editContainer) {
      container.classList.remove('visible');
    }
  });

  optionsButtons.classList.toggle('visible');

  editContainer.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  // Add a click event listener to the document body
  // If clicked, options become invisible
  const hideOptions = () => {
    optionsButtons.classList.remove('visible');
    document.body.removeEventListener('click', hideOptions);
  };

  document.body.addEventListener('click', hideOptions);
}

function showRenameForm() {
  // Select current project
  const selectedProject = document.querySelector('.selected');
  selectedProject.classList.remove('selected');
  selectedProject.classList.add('edit-project');

  // Hide project title and edit dots
  const projectTitle = selectedProject.querySelector('.project-list-title');
  const editContainer = selectedProject.querySelector('.edit-options');
  projectTitle.classList.add('hidden');
  editContainer.classList.add('hidden');

  // Get current project name
  const currentProjectName = projectTitle.textContent;

  // Create new container for input and buttons
  const renameProjectContainer = document.createElement('div');
  renameProjectContainer.classList.add('rename-project-container');
  renameProjectContainer.classList.remove('hidden');

  // Create new input and put current project name
  const titleInput = document.createElement('input');
  titleInput.classList.add('project-title-input');
  titleInput.setAttribute('id', 'rename-project-input');
  titleInput.value = currentProjectName;
  renameProjectContainer.appendChild(titleInput);

  // Create buttons for saving and closing form
  const editButtons = document.createElement('div');

  const renameButton = document.createElement('button');
  renameButton.textContent = 'Save';
  renameButton.classList.add('button');
  renameButton.classList.add('add-project');
  renameButton.style.marginRight = '3px';
  renameButton.addEventListener('click', saveProjectTitle);
  editButtons.appendChild(renameButton);

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.classList.add('button');
  cancelButton.classList.add('close-form');
  cancelButton.addEventListener('click', closeRenameForm);
  editButtons.appendChild(cancelButton);

  renameProjectContainer.appendChild(editButtons);
  selectedProject.appendChild(renameProjectContainer);
}

function closeRenameForm() {
  const selectedProject = document.querySelector('.selected');
  selectedProject.classList.remove('edit-project');

  // Select opened container and delete it from DOM
  const renameProjectContainer = selectedProject.querySelector('.rename-project-container');
  renameProjectContainer.remove();

  // Show project title and edit dots
  const projectTitle = selectedProject.querySelector('.project-list-title');
  const editContainer = selectedProject.querySelector('.edit-options');
  projectTitle.classList.remove('hidden');
  editContainer.classList.remove('hidden');
}

function saveProjectTitle() {
  // Get selected project index
  const projectIndex = findSelectedProject();

  const newProjectTitle = document.getElementById('rename-project-input').value;

  // Change project title in allProjects array and save it
  allProjects[projectIndex].title = newProjectTitle;

  saveToLocalStorage();
  closeRenameForm();
  showProjects();
}

export { addEventListeners, allProjects, showProjects, saveToLocalStorage, selectProject };
