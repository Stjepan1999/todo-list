import { showProjects, allProjects, saveToLocalStorage } from './creatingProject';
import { showAllTasks } from './homeSection';

function deleteProject(id) {
  const index = allProjects.findIndex((project) => project.id === id);
  allProjects.splice(index, 1);
  saveToLocalStorage();
  showAllTasks();
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

export { deleteProject, showEditOptions };
