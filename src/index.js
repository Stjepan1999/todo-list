import { addEventListeners } from './project';
import { createTaskEvents } from './task';
import { showHomeSectionTile } from './homeSection';

addEventListeners();
createTaskEvents();
showHomeSectionTile();

const hideMenu = document.querySelector('.hide-sidebar');
hideMenu.addEventListener('click', () => {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('hidden');
});
