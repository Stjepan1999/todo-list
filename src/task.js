import { allProjects, saveToLocalStorage } from './project';
import { showAllTasks, showTodayTasks, showImportantTasks, showThisWeekTasks } from './homeSection';

export let taskID = parseInt(localStorage.getItem('taskID')) || 0;

export function createTaskEvents() {
  const showFormButton = document.getElementById('button-new-task');
  showFormButton.addEventListener('click', () => showForm());

  const closeFormButton = document.getElementById('button-close-task-form');
  closeFormButton.addEventListener('click', () => closeForm());

  const taskForm = document.getElementById('task-form');
  taskForm.addEventListener('submit', (event) => createNewTask(event));
}

function createTask(title, description, date) {
  return {
    id: taskID++,
    title,
    description,
    date,
    important: false,
    completed: false,
  };
}

function createNewTask(event) {
  event.preventDefault();

  const taskTitle = document.getElementById('task-title').value;
  const taskDescription = document.getElementById('task-description').value;
  const taskDate = document.getElementById('task-date').value;

  const newTask = createTask(taskTitle, taskDescription, taskDate);

  const index = findSelectedProject();
  const project = allProjects[index].tasks;
  project.push(newTask);

  saveToLocalStorage();
  closeForm();
  showTasks(project);
}

function showForm() {
  const taskForm = document.querySelector('.task-form-container');
  taskForm.classList.remove('hidden');
}

function closeForm() {
  const taskForm = document.querySelector('.task-form-container');
  taskForm.classList.add('hidden');

  document.getElementById('task-title').value = '';
  document.getElementById('task-description').value = '';
  document.getElementById('task-date').value = '';
}

export function showTasks(project) {
  const taskContainer = document.querySelector('.tasks-container');
  taskContainer.innerHTML = '';

  project.forEach((task) => {
    const taskElement = createTaskElement(task);
    taskContainer.appendChild(taskElement);
  });
}

function createTaskElement(task) {
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');
  taskElement.dataset.id = task.id;

  const taskInfo = document.createElement('div');
  taskInfo.classList.add('task-info');

  const circle = document.createElement('span');
  circle.classList.add('circle');
  if (task.completed) {
    circle.classList.add('circle-completed');
    circle.textContent = '✓';
    taskInfo.classList.add('completed-task');
  }
  circle.addEventListener('click', (event) => updateCompletedTask(event, task));

  taskElement.appendChild(circle);
  taskElement.appendChild(taskInfo);

  const taskTitle = document.createElement('div');
  taskTitle.classList.add('task-title');
  taskTitle.textContent = task.title;
  taskInfo.appendChild(taskTitle);

  const taskDescription = document.createElement('div');
  taskDescription.classList.add('task-description');
  taskDescription.textContent = task.description;
  taskInfo.appendChild(taskDescription);

  const taskDate = document.createElement('div');
  taskDate.classList.add('date');
  taskElement.appendChild(taskDate);

  if (task.date === '') {
    taskDate.textContent = 'No Due Date';
  } else {
    taskDate.textContent = task.date;
  }

  const emptyStarSymbol = '&#9734';
  const filledStarSymbol = '&#9733';

  const importantStar = document.createElement('div');
  importantStar.classList.add('important-star');
  taskElement.appendChild(importantStar);
  importantStar.innerHTML = emptyStarSymbol;

  // If task is important, star is filled with color
  if (task.important) {
    importantStar.innerHTML = filledStarSymbol;
    importantStar.style.color = '#fec811';
  }

  importantStar.addEventListener('click', (event) => updateImportantTask(event, task));

  // Create edit container for dots, and buttons for deleting and editing
  const editContainer = document.createElement('div');
  editContainer.classList.add('edit-options');
  taskElement.appendChild(editContainer);
  editContainer.addEventListener('click', () => showEditOptions(taskElement));

  // Create three dots
  const editIcons = createEditIcons();
  editContainer.appendChild(editIcons);

  const optionsButtons = document.createElement('div');
  optionsButtons.classList.add('options-buttons');
  optionsButtons.classList.add('task-options');
  editContainer.appendChild(optionsButtons);

  const deleteTaskButton = document.createElement('button');
  deleteTaskButton.classList.add('button-options');
  deleteTaskButton.textContent = 'Delete';
  optionsButtons.appendChild(deleteTaskButton);
  deleteTaskButton.addEventListener('click', () => deleteTask(task.id));

  const editTaskButton = document.createElement('button');
  editTaskButton.classList.add('button-options');
  editTaskButton.textContent = 'Edit';
  optionsButtons.appendChild(editTaskButton);
  editTaskButton.addEventListener('click', (event) => showEditForm(event));

  return taskElement;
}

export function findSelectedProject() {
  const selected = document.querySelector('.selected');
  const projectID = Number(selected.dataset.id);
  const index = allProjects.findIndex((project) => project.id === projectID);
  return index;
}

// Create three dots for accesing editing options for task, and project
export function createEditIcons() {
  const editIcons = document.createElement('div');
  editIcons.classList.add('edit-icons');
  for (let j = 0; j < 3; j++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    editIcons.appendChild(dot);
  }
  return editIcons;
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

// Duplicate form for creating task, but this is for editing
function duplicateForm() {
  const form = document.querySelector('.task-form-container');
  const editForm = form.cloneNode(true);
  editForm.classList.remove('hidden');
  editForm.classList.add('active');
  return editForm;
}

// Hide selected form and show edit form
function showEditForm(event) {
  const taskContainer = document.querySelector('.tasks-container');

  const editForm = duplicateForm();

  const hiddenTask = document.querySelector('.task.hidden');
  document.querySelectorAll('.active').forEach((container) => {
    if (container !== editForm) {
      container.remove();
      hiddenTask.classList.remove('hidden');
    }
  });

  const selectedTask = event.target.closest('.task');
  selectedTask.classList.add('hidden');

  const selectedTaskID = Number(selectedTask.getAttribute('data-id'));
  const task = findTaskById(selectedTaskID);

  const saveButton = editForm.querySelector('#button-add-task');
  saveButton.textContent = 'Save';
  saveButton.addEventListener('click', () => saveTask(task, selectedTask));

  const cancelButton = editForm.querySelector('#button-close-task-form');
  cancelButton.addEventListener('click', () => closeEditTaskForm(selectedTask));

  // Replace selected task with edit form
  taskContainer.insertBefore(editForm, selectedTask);
  populateEditForm(task);
}

function findTaskById(selectedTaskID) {
  for (const project of allProjects) {
    const foundTask = project.tasks.find((task) => task.id === selectedTaskID);
    if (foundTask) {
      return foundTask;
    }
  }
}

function populateEditForm(task) {
  document.getElementById('task-title').value = task.title;
  document.getElementById('task-description').value = task.description;
  document.getElementById('task-date').value = task.date;
}

function saveTask(task, selectedTaskElement) {
  task.title = document.getElementById('task-title').value;
  task.description = document.getElementById('task-description').value;
  task.date = document.getElementById('task-date').value;

  saveToLocalStorage();
  closeEditTaskForm(selectedTaskElement);
  showSelectedProjectTasks();
}

function closeEditTaskForm(task) {
  const editForm = document.querySelector('.task-form-container.active');
  editForm.remove();

  task.classList.remove('hidden');
}

function updateImportantTask(event, task) {
  const emptyStarSymbol = '&#9734';
  const filledStarSymbol = '&#9733';

  task.important = !task.important;

  event.target.innerHTML = task.important ? filledStarSymbol : emptyStarSymbol;
  event.target.style.color = task.important ? '#fec811' : 'black';

  saveToLocalStorage();
}

function updateCompletedTask(event, task) {
  // Div for task title and description
  const taskInfoElement = event.target.nextElementSibling;

  task.completed = !task.completed;
  event.target.classList.toggle('circle-completed');
  event.target.textContent = task.completed ? '✓' : '';
  taskInfoElement.classList.toggle('completed-task');

  saveToLocalStorage();
}

function showSelectedProjectTasks() {
  let project;
  let index;

  const selectedTile = document.querySelector('.selected');
  switch (selectedTile.id) {
    case 'all-tasks':
      showAllTasks();
      break;
    case 'today':
      showTodayTasks();
      break;
    case 'this-week':
      showThisWeekTasks();
      break;
    case 'important':
      showImportantTasks();
      break;
    default:
      index = findSelectedProject();
      project = allProjects[index].tasks;
      showTasks(project);
      break;
  }
}

function findProjectByTaskId(taskID) {
  for (const projectIndex in allProjects) {
    const project = allProjects[projectIndex];
    const task = project.tasks.find((task) => task.id === taskID);
    if (task) {
      return project;
    }
  }
}

function deleteTask(taskID) {
  const project = findProjectByTaskId(taskID);
  const selectedTask = project.tasks.findIndex((task) => task.id === taskID);
  project.tasks.splice(selectedTask, 1);

  showSelectedProjectTasks();
  saveToLocalStorage();
}
