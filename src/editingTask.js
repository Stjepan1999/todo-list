import { saveToLocalStorage, allProjects } from "./creatingProject";
import { showTasks } from "./creatingTask";

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

function showEditForm() {
  const selectedTask = document.querySelector('.selected-task');
  selectedTask.classList.add('hidden');

  const editForm = document.querySelector('.add-task-form')
  editForm.style.display = "block"

  const saveButton = editForm.querySelector('.button.add-task');
  saveButton.textContent = 'Save';
  
  const cancelButton = editForm.querySelector('.button.close-task-form')
  cancelButton.addEventListener('click', closeEditTaskForm)

  // Replace selected task with edit form
  selectedTask.parentElement.appendChild(editForm);
  populateEditForm()
}

function populateEditForm() {
  document.getElementById('task-title').value = projectDetails.title;
  document.getElementById('task-description').value = projectDetails.description;
  document.getElementById('task-date').value = projectDetails.date
}

function closeEditTaskForm() {
  const selectedTask = document.querySelector('.selected-task');
  selectedTask.classList.remove('hidden');
  
  const editForm = document.querySelector('.add-task-form');
  editForm.style.display = 'none'
}

function styleImportantTask(e) {
    importantStar.innerHTML = '&#9733;';
    importantStar.style.color = '#fec811';
}

function updateImportantTask(event, task) {
  if (!task.important) {
    task.important = true;
    event.target.innerHTML = '&#9733;';
    event.target.style.color = '#fec811';
  } else {
    task.important = false;
    event.target.innerHTML = '&#9734;';
    event.target.style.color = 'black';
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


function deleteTask(project, index) {
  project.splice(index, 1);
  showTasks(project);
  saveToLocalStorage();
}

export { showEditOptions, deleteTask, showEditForm, updateImportantTask, completeTask, styleImportantTask }