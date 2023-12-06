import { showTasks } from './creatingTask';
import {
  deleteProject,
  showEditOptions,
  showRenameForm,
} from './editingProject';

let projectID = 0;
const allProjects = JSON.parse(localStorage.getItem('allProjects')) || [];

function addEventListeners() {
  const showFormButton = document.querySelector('.create-project-button');
  showFormButton.addEventListener('click', () => createForm());

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

function saveToLocalStorage() {
  localStorage.setItem('allProjects', JSON.stringify(allProjects));
}

function createForm() {
  const addProjectForm = document.querySelector('.add-project-form');
  addProjectForm.classList.remove('hidden')
}

function closeForm() {
  const addProjectForm = document.querySelector('.add-project-form');
  addProjectForm.classList.add('hidden')
  document.getElementById('project-title').value = '';
}

function validateForm() {
  const projectTitle = document.getElementById('project-title').value;
  if (projectTitle.length < 1 || projectTitle.length > 20) {
    return false;
  }
  return true;
}

function showProjects() {
  const projectsListDiv = document.querySelector('.projects-list');
  projectsListDiv.innerHTML = '';

  for (let i = 0; i < allProjects.length; i++) {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');
    projectDiv.dataset.project = i;
    projectDiv.addEventListener('click', (event) =>
      selectProject(event, allProjects[i]),
    );

    const projectIcon = document.createElement('img');
    projectIcon.classList.add('project-icon');
    projectIcon.src = './images/project-icon.png';
    projectDiv.appendChild(projectIcon);

    const projectTitle = document.createElement('div');
    projectTitle.classList.add('project-list-title');
    projectTitle.textContent = allProjects[i].title;
    projectDiv.appendChild(projectTitle);

    const editContainer = document.createElement('div');
    editContainer.classList.add('edit-options');

    const editIcons = document.createElement('div');
    editIcons.classList.add('edit-icons');
    for (let j = 0; j < 3; j++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      editIcons.appendChild(dot);
    }

    const optionsButtons = document.createElement('div');
    optionsButtons.classList.add('options-buttons');

    const deleteProjectButton = document.createElement('button');
    deleteProjectButton.classList.add('delete-project-button');
    deleteProjectButton.textContent = 'Delete';
    deleteProjectButton.addEventListener('click', () =>
      deleteProject(allProjects[i].id),
    );

    const renameProjectButton = document.createElement('button');
    renameProjectButton.classList.add('rename-project-button');
    renameProjectButton.textContent = 'Rename';
    renameProjectButton.addEventListener('click', () => showRenameForm());

    optionsButtons.appendChild(deleteProjectButton);
    optionsButtons.appendChild(renameProjectButton);

    editContainer.appendChild(editIcons);
    editContainer.appendChild(optionsButtons);

    projectDiv.appendChild(editContainer);

    projectsListDiv.appendChild(projectDiv);

    editContainer.addEventListener('click', () =>
      showEditOptions(projectDiv),
    );
  }
}

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
  showTasks(project.tasks);

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
