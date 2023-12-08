import { saveToLocalStorage, allProjects } from "./creatingProject";
import { showTasks, findSelectedProject } from "./creatingTask";

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


function duplicateForm() {
  const form = document.querySelector('.add-task-form');
  const editForm = form.cloneNode(true);
  editForm.classList.add('active')
  editForm.classList.remove('hidden');
  return editForm
}


function showEditForm(event) {
  const selectedTask = event.target.closest('.task');
  selectedTask.classList.add('hidden');

  const taskContainer = document.querySelector('.tasks-container')

  const editForm = duplicateForm()

  const saveButton = editForm.querySelector('.button.add-task');
  saveButton.textContent = 'Save';
  
  const cancelButton = editForm.querySelector('.button.close-task-form')
  cancelButton.addEventListener('click', () => closeEditTaskForm(selectedTask))

  // Replace selected task with edit form
  taskContainer.insertBefore(editForm, selectedTask);
  populateEditForm()
}

function populateEditForm() {
  document.getElementById('task-title').value = 'title';
  document.getElementById('task-description').value = 'desc'
  document.getElementById('task-date').value = '21-05-2023'
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