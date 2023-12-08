import {
  showProjects,
  allProjects,
  saveToLocalStorage,
} from './creatingProject';
import { findSelectedProject } from './creatingTask';
import { showAllTasks } from './homeSection';

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
  const renameProjectContainer = selectedProject.querySelector(
    '.rename-project-container',
  );
  renameProjectContainer.remove();

  // Show project title and edit dots
  const projectTitle = selectedProject.querySelector('.project-list-title');
  const editContainer = selectedProject.querySelector('.edit-options');
  projectTitle.classList.remove('hidden');
  editContainer.classList.remove('hidden');
}

function saveProjectTitle() {
  // Get selected project index
  const projectIndex = findSelectedProject()

  const newProjectTitle = document.getElementById('rename-project-input').value;

  // Change project title in allProjects array and save it
  allProjects[projectIndex].title = newProjectTitle;

  saveToLocalStorage();
  closeRenameForm();
  showProjects();
}

export { deleteProject, showEditOptions, showRenameForm, closeRenameForm };
