import { format, addDays } from 'date-fns';
import { showTasks } from './creatingTask';
import { allProjects, selectProject } from './creatingProject';

function showHomeSectionTile() {
  const allTasks = document.getElementById('all-tasks');
  allTasks.addEventListener('click', showAllTasks);

  const todayTasks = document.getElementById('today');
  todayTasks.addEventListener('click', showTodayTasks);

  const thisWeekTasks = document.getElementById('this-week');
  thisWeekTasks.addEventListener('click', showThisWeekTasks);

  const importantTasks = document.getElementById('important');
  importantTasks.addEventListener('click', showImportantTasks);

  showAllTasks();
}

function showAllTasks() {
  showTitle('All Tasks');
  const allTasks = [];

  if (allProjects.length > 0) {
    allProjects.forEach((project) => {
      project.tasks.forEach((task) => {
        allTasks.push(task);
      });
    });
  }
  showTasks(allTasks);
}

function showTodayTasks() {
  showTitle('Today');
  const todayTasks = [];
  const rawDate = new Date();
  const todayDate = format(rawDate, 'yyyy-MM-dd');

  if (allProjects.length > 0) {
    allProjects.forEach((project) => {
      project.tasks.forEach((task) => {
        if (task.date === todayDate) {
          todayTasks.push(task);
        }
      });
    });
  }
  showTasks(todayTasks);
}

function showThisWeekTasks() {
  showTitle('Next 7 Days');

  const thisWeekTasks = [];

  // Array for storing this week dates
  const thisWeekDates = [];
  const todayDate = new Date();
  for (let i = 0; i < 7; i++) {
    const nextDate = addDays(todayDate, i);
    thisWeekDates.push(format(nextDate, 'yyyy-MM-dd'));
  }

  if (allProjects.length > 0) {
    allProjects.forEach((project) => {
      project.tasks.forEach((task) => {
        if (thisWeekDates.includes(task.date)) {
          thisWeekTasks.push(task);
        }
      });
    });
  }
  showTasks(thisWeekTasks);
}

function showImportantTasks() {
  showTitle('Important');

  const importantTasks = [];
  if (allProjects.length > 0) {
    allProjects.forEach((project) => {
      project.tasks.forEach((task) => {
        if (task.important) {
          importantTasks.push(task);
        }
      });
    });
  }
  showTasks(importantTasks);
}

function showTitle(titleName) {
  const showFormButton = document.querySelector('.create-task-button');
  showFormButton.classList.add('hidden')

  const title = document.querySelector('.title');
  title.textContent = titleName;
}

export { showHomeSectionTile, showAllTasks, showTitle };
