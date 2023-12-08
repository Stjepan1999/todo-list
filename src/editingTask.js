import { saveToLocalStorage, allProjects } from "./creatingProject";
import { showTasks, findSelectedProject, taskID } from "./creatingTask";

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


// Duplicate form for creating task, but this is for editing
function duplicateForm() {
  const form = document.querySelector('.add-task-form');
  const editForm = form.cloneNode(true);
  editForm.classList.remove('hidden');
  editForm.classList.add('active')
  return editForm
}

// Hide selected form and show edit form
function showEditForm(event) {
  const taskContainer = document.querySelector('.tasks-container')

  const selectedTask = event.target.closest('.task');
  selectedTask.classList.add('hidden');

  const selectedTaskID = Number(selectedTask.getAttribute('data-id'));
  const task = findTaskById(selectedTaskID);

  const editForm = duplicateForm()

  const saveButton = editForm.querySelector('.button.add-task');
  saveButton.textContent = 'Save';
  saveButton.addEventListener('click', () => saveTask(task, selectedTask))
  
  const cancelButton = editForm.querySelector('.button.close-task-form')
  cancelButton.addEventListener('click', () => closeEditTaskForm(selectedTask))

  // Replace selected task with edit form
  taskContainer.insertBefore(editForm, selectedTask);
  populateEditForm(task)
}

// Find selected task in allProjects array
function findTaskById(selectedTaskID) {
  for (const project of allProjects) {
    const foundTask = project.tasks.find(task => task.id === selectedTaskID);
    return foundTask
  }
}

function populateEditForm(task) {
  document.getElementById('task-title').value = task.title;
  document.getElementById('task-description').value = task.description;
  document.getElementById('task-date').value = task.date;
}

// Save task after editing
function saveTask(task, selectedTaskDiv) {
  task.title = document.getElementById('task-title').value;
  task.description = document.getElementById('task-description').value;
  task.date = document.getElementById('task-date').value;

  // Find project where task is stored
  const index = findSelectedProject();
  const project = allProjects[index].tasks;

  saveToLocalStorage();
  closeEditTaskForm(selectedTaskDiv);
  showTasks(project);
}

function closeEditTaskForm(task) {  
  const editForm = document.querySelector('.add-task-form.active');
  editForm.remove()

  task.classList.remove('hidden')
}

function updateImportantTask(event, task) {
  task.important = !task.important;
  
  event.target.innerHTML = task.important ? '&#9733;' : '&#9734;';
  event.target.style.color = task.important ? '#fec811' : 'black';

  saveToLocalStorage();
}

// Update completed status of task
function updateCompletedTask(event, task) {
  // Div for task title and description
  const taskInfoDiv = event.target.nextElementSibling

  task.completed = !task.completed;
  event.target.classList.toggle('circle-completed')
  event.target.textContent = task.completed ? '✓' : ''
  taskInfoDiv.classList.toggle('completed-task')

  saveToLocalStorage()
}

function deleteTask(taskID) {
  // Find selected project index
  const index = findSelectedProject();
  const project = allProjects[index].tasks;

  // Find index of task in selected project object
  const selectedTask = project.findIndex(task => task.id === taskID)

  // Delete selected task from object and refresh task list
  project.splice(selectedTask, 1)
  showTasks(project)
  saveToLocalStorage()
}

export { showEditOptions, deleteTask, showEditForm, updateImportantTask, updateCompletedTask }