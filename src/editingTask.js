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

function deleteTask(project, index) {
  project.splice(index, 1);
  showTasks(project);
  saveToLocalStorage();
}

export { showEditOptions, deleteTask, showEditForm }