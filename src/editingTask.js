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

function showEditForm(taskDiv, projectDetails) {
  // Hide selected task
  taskDiv.classList.add('hidden')

  const editForm = document.querySelector('.add-task-form')
  editForm.style.display = "block"

  // Replace selected task with edit form
  taskDiv.replaceWith(editForm)
  populateEditForm(projectDetails)
}

function populateEditForm(projectDetails) {
  

  document.getElementById('task-title').value = projectDetails.title;
  document.getElementById('task-description').value = projectDetails.description;
  document.getElementById('task-date').value = projectDetails.date
}

function deleteTask(project, index) {
  project.splice(index, 1);
  showTasks(project);
  saveToLocalStorage();
}

export { showEditOptions, deleteTask, showEditForm }