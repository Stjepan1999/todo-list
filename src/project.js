import { createEditIcons, showTasks, taskID, findSelectedProject } from './task';

let projectID = parseInt(localStorage.getItem('projectID')) || 0;

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

function createProject(title) {
  return {
    title,
    id: projectID++,
    tasks: [],
  };
}

function createNewProject() {
  if (isFormValid()) {
    const projectTitle = document.getElementById('project-title').value;
    const newProject = createProject(projectTitle);
    allProjects.push(newProject);
    saveToLocalStorage();
    closeForm();
    showProjects();
  }
}

function saveToLocalStorage() {
  localStorage.setItem('allProjects', JSON.stringify(allProjects));
  localStorage.setItem('projectID', projectID.toString());
  localStorage.setItem('taskID', taskID.toString());
}

function showForm() {
  const addProjectForm = document.querySelector('.add-project-form');
  addProjectForm.classList.remove('hidden');
}

function closeForm() {
  const addProjectForm = document.querySelector('.add-project-form');
  addProjectForm.classList.add('hidden');
  document.getElementById('project-title').value = '';
}

// Project name should have minimum one character
function isFormValid() {
  const projectTitle = document.getElementById('project-title').value;
  return projectTitle.length > 0 && projectTitle.length <= 20;
}

function showProjects() {
  const projectsListElement = document.querySelector('.projects-list');
  projectsListElement.innerHTML = '';

  allProjects.forEach((project) => {
    const projectElement = createProjectElement(project);
    projectsListElement.appendChild(projectElement);
  });
}

function createProjectElement(project) {
  const projectElement = document.createElement('div');
  projectElement.classList.add('project');
  projectElement.dataset.id = project.id;
  projectElement.addEventListener('click', (event) => selectProject(event, project));

  const projectIcon = document.createElement('img');
  projectIcon.classList.add('project-icon');
  projectIcon.src = './images/project-icon.png';
  projectElement.appendChild(projectIcon);

  const projectTitle = document.createElement('div');
  projectTitle.classList.add('project-list-title');
  projectTitle.textContent = project.title;
  projectElement.appendChild(projectTitle);

  // Create edit container for editing or deleting project
  const editContainer = document.createElement('div');
  editContainer.classList.add('edit-options');
  projectElement.appendChild(editContainer);
  editContainer.addEventListener('click', () => showEditOptions(projectElement));

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

  return projectElement;
}

// Add selected class to the project, and display tasks for that project
function selectProject(event, project) {
  const projectElement = event.target.closest('.project');

  document.querySelectorAll('.selected').forEach((container) => {
    if (container !== projectElement) {
      container.classList.remove('selected');
    }
  });

  projectElement.classList.add('selected');

  const title = document.querySelector('.title');
  title.textContent = project.title;

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
  const selectedProject = document.querySelector('.selected');
  selectedProject.classList.remove('selected');
  selectedProject.classList.add('edit-project');

  // Hide project title and edit dots
  const projectTitle = selectedProject.querySelector('.project-list-title');
  const editContainer = selectedProject.querySelector('.edit-options');
  projectTitle.classList.add('hidden');
  editContainer.classList.add('hidden');

  const currentProjectName = projectTitle.textContent;

  const renameProjectContainer = document.createElement('div');
  renameProjectContainer.classList.add('rename-project-container');
  renameProjectContainer.classList.remove('hidden');

  const titleInput = document.createElement('input');
  titleInput.classList.add('project-title-input');
  titleInput.setAttribute('id', 'rename-project-input');
  titleInput.value = currentProjectName;
  renameProjectContainer.appendChild(titleInput);

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

  const renameProjectContainer = selectedProject.querySelector('.rename-project-container');
  renameProjectContainer.remove();

  const projectTitle = selectedProject.querySelector('.project-list-title');
  const editContainer = selectedProject.querySelector('.edit-options');
  projectTitle.classList.remove('hidden');
  editContainer.classList.remove('hidden');
}

function saveProjectTitle() {
  const projectIndex = findSelectedProject();

  const newProjectTitle = document.getElementById('rename-project-input').value;

  allProjects[projectIndex].title = newProjectTitle;

  saveToLocalStorage();
  closeRenameForm();
  showProjects();
}

export { addEventListeners, allProjects, showProjects, saveToLocalStorage, selectProject };
