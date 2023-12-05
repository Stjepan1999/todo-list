import { allProjects, saveToLocalStorage, selectProject } from './creatingProject';
import { showEditOptions, deleteTask, showEditForm } from './editingTask';

let taskID = 0;

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

  const projectIndex = findSelectedProject();
  const project = allProjects[projectIndex].tasks;

  const newTask = CreateTask(taskTitle, taskDescription, taskDate);
  project.push(newTask);

  saveToLocalStorage();
  closeForm();
  showTasks(project);
}

function showForm() {
  const taskForm = document.querySelector('.add-task-form');
  taskForm.style.display = 'flex';
}

function closeForm() {
  const taskForm = document.querySelector('.add-task-form');
  taskForm.style.display = 'none';

  document.getElementById('task-title').value = '';
  document.getElementById('task-description').value = '';
  document.getElementById('task-date').value = '';
}

function showTasks(projectTasks) {
  const tasksContainer = document.querySelector('.tasks-container');
  tasksContainer.innerHTML = '';

  for (let i = 0; i < projectTasks.length; i++) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.dataset.id = i;
    taskDiv.addEventListener('click', () => selectTask(taskDiv))

    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');

    const circle = document.createElement('span');
    circle.classList.add('circle');
    if (projectTasks[i].completed) {
      circle.classList.add('circle-completed');
      circle.textContent = '✓';
      taskInfo.classList.add('completed-task');
    } 
    circle.addEventListener('click', () => completeTask(projectTasks[i], circle, taskInfo))

    const taskTitle = document.createElement('div');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = projectTasks[i].title;

    const taskDescription = document.createElement('div');
    taskDescription.classList.add('task-description');
    taskDescription.textContent = projectTasks[i].description;

    const taskDate = document.createElement('div');
    taskDate.classList.add('date');
    if (projectTasks[i].date === '') {
      taskDate.textContent = 'No Due Date';
    } else {
      taskDate.textContent = projectTasks[i].date;
    }

    const importantStar = document.createElement('div');
    importantStar.classList.add('important-star');
    if (projectTasks[i].important) {
      importantStar.innerHTML = '&#9733;';
      importantStar.style.color = '#fec811';
    } else {
      importantStar.innerHTML = '&#9734;';
    }
    importantStar.addEventListener('click', () =>
      addToImportant(projectTasks[i], importantStar),
    );

    const editContainer = document.createElement('div');
    editContainer.classList.add('edit-options');
    editContainer.addEventListener('click', () =>
      showEditOptions(taskDiv),
    );

    const editIcons = document.createElement('div');
    editIcons.classList.add('edit-icons');
    for (let j = 0; j < 3; j++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      editIcons.appendChild(dot);
    }

    const optionsButtons = document.createElement('div');
    optionsButtons.classList.add('options-buttons');

    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.classList.add('delete-project-button');
    deleteTaskButton.textContent = 'Delete';
    deleteTaskButton.addEventListener('click', () =>
      deleteTask(projectTasks, i),
    );

    const editTaskButton = document.createElement('button');
    editTaskButton.classList.add('rename-project-button');
    editTaskButton.textContent = 'Edit';
    editTaskButton.addEventListener('click', () => showEditForm(taskDiv, projectTasks[i]))

    optionsButtons.appendChild(deleteTaskButton);
    optionsButtons.appendChild(editTaskButton);
    editContainer.appendChild(editIcons);
    editContainer.appendChild(optionsButtons);

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
  if (!task.important) {
    task.important = true;
    importantStar.innerHTML = '&#9733;';
    importantStar.style.color = '#fec811';
  } else {
    task.important = false;
    importantStar.innerHTML = '&#9734;';
    importantStar.style.color = 'black';
  }
  saveToLocalStorage();
}

function completeTask(task, circle, taskInfo) {
  if (!task.completed) {
    task.completed = true;
    circle.classList.add('circle-completed');
    circle.textContent = '✓'
    taskInfo.classList.add('completed-task')
  } else { 
    task.completed = false;
    circle.classList.remove('circle-completed')
    circle.textContent = ''
    taskInfo.classList.remove('completed-task')
  }
  saveToLocalStorage()
}


function selectTask(taskDiv) {
  document.querySelectorAll('.selected-task').forEach((container) => {
    if (container !== taskDiv) {
      container.classList.remove('selected-task');
    }
  });
  taskDiv.classList.add('selected-task');
}


function findSelectedProject() {
  const selected = document.querySelector('.selected');
  return selected.dataset.project;
}

export { createTaskEvents, showTasks };
