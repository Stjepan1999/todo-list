import { allProjects, saveToLocalStorage } from './creatingProject';
import { showEditOptions, deleteTask, showEditForm, updateImportantTask, updateCompletedTask } from './editingTask';

// Get task ID for tasks, or create default one
let taskID = parseInt(localStorage.getItem('taskID')) || 0;

function createTaskEvents() {
  const showFormButton = document.querySelector('.create-task-button');
  showFormButton.addEventListener('click', () => showForm());

  const closeFormButton = document.querySelector('.button.close-task-form');
  closeFormButton.addEventListener('click', () => closeForm());

  const addTaskButton = document.querySelector('.button.add-task');
  addTaskButton.addEventListener('click', createNewTask);
}

function CreateTask(title, description, date) {
  return {
    id: taskID++,
    title,
    description,
    date,
    important: false,
    completed: false,
  };
}

function createNewTask() {
  const taskTitle = document.getElementById('task-title').value;
  const taskDescription = document.getElementById('task-description').value;
  const taskDate = document.getElementById('task-date').value;

  const newTask = CreateTask(taskTitle, taskDescription, taskDate);

  // Find index of selected project, and add task to that project
  const index = findSelectedProject();
  const project = allProjects[index].tasks;
  project.push(newTask);

  saveToLocalStorage();
  closeForm();
  showTasks(project);
}

// Show form for adding task
function showForm() {
  const taskForm = document.querySelector('.add-task-form');
  taskForm.classList.remove('hidden')
}

// Hide form for adding task
function closeForm() {
  const taskForm = document.querySelector('.add-task-form');
  taskForm.classList.add('hidden')

  document.getElementById('task-title').value = '';
  document.getElementById('task-description').value = '';
  document.getElementById('task-date').value = '';
}

// Show tasks for selected project
function showTasks(project) {
  const taskContainer = document.querySelector('.tasks-container');
  taskContainer.innerHTML = '';

  project.forEach((task) => {
    const taskDiv = createTaskElement(task);
    taskContainer.appendChild(taskDiv)
  })
}

// Create task div for selected project
function createTaskElement(task) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.dataset.id = task.id;

    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');

    const circle = document.createElement('span');
    circle.classList.add('circle');
    if (task.completed) {
      circle.classList.add('circle-completed');
      circle.textContent = '✓';
      taskInfo.classList.add('completed-task');
    }
    circle.addEventListener('click', (event) => updateCompletedTask(event, task))

    taskDiv.appendChild(circle);
    taskDiv.appendChild(taskInfo);

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
    taskDiv.appendChild(taskDate);

    if (task.date === '') {
      taskDate.textContent = 'No Due Date';
    } else {
      taskDate.textContent = task.date;
    }

    const importantStar = document.createElement('div');
    importantStar.classList.add('important-star');
    taskDiv.appendChild(importantStar);
    importantStar.innerHTML = '&#9734';

    // If task is important, star is filled with color
    if (task.important) {
      importantStar.innerHTML = '&#9733;';
      importantStar.style.color = '#fec811';
    }

    importantStar.addEventListener('click', (event) =>
      updateImportantTask(event, task),
    );

    // Create edit container for dots, and buttons for deleting and editing
    const editContainer = document.createElement('div');
    editContainer.classList.add('edit-options');
    taskDiv.appendChild(editContainer);
    editContainer.addEventListener('click', () =>
      showEditOptions(taskDiv),
    );

    // Create three dots
    const editIcons = createEditIcons()
    editContainer.appendChild(editIcons);

    const optionsButtons = document.createElement('div');
    optionsButtons.classList.add('options-buttons');
    editContainer.appendChild(optionsButtons);

    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.classList.add('delete-project-button');
    deleteTaskButton.textContent = 'Delete';
    optionsButtons.appendChild(deleteTaskButton);
    deleteTaskButton.addEventListener('click', () => deleteTask(task.id))
    
    const editTaskButton = document.createElement('button');
    editTaskButton.classList.add('rename-project-button');
    editTaskButton.textContent = 'Edit';
    optionsButtons.appendChild(editTaskButton);
    editTaskButton.addEventListener('click', (event) => showEditForm(event))

    return taskDiv
}

// Find selected project with 'selected' class
function findSelectedProject() {
  const selected = document.querySelector('.selected');
  const projectID = Number(selected.dataset.id);
  const index = allProjects.findIndex(project => project.id === projectID);
  return index
}

// Create three dots for accesing editing options for task, and project
function createEditIcons() {
  const editIcons = document.createElement('div');
  editIcons.classList.add('edit-icons')
  for (let j = 0; j < 3; j++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    editIcons.appendChild(dot);
  }
  return editIcons
}

export { createTaskEvents, showTasks, createEditIcons, taskID, findSelectedProject };
