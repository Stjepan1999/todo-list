import { format, addDays } from 'date-fns';
import { showTasks } from './creatingTask';
import { allProjects } from './creatingProject';

function showHomeSectionTile() {
  const allTasks = document.getElementById('all-tasks');
  allTasks.addEventListener('click', (event) => showAllTasks(event));

  const todayTasks = document.getElementById('today');
  todayTasks.addEventListener('click', (event) => showTodayTasks(event));

  const thisWeekTasks = document.getElementById('this-week');
  thisWeekTasks.addEventListener('click', (event) => showThisWeekTasks(event));

  const importantTasks = document.getElementById('important');
  importantTasks.addEventListener('click', (event) =>
    showImportantTasks(event),
  );

  showAllTasks();
  const allTasksTile = document.getElementById('all-tasks');
  allTasksTile.classList.add('selected');
}

function showAllTasks(event) {
  showTitle('All Tasks');

  // If task tile is clicked, because when page loads it gets selected class by default
  if (event) {
    selectHomeSectionTile(event);
  }
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

function showTodayTasks(event) {
  showTitle('Today');
  if (event) {
    selectHomeSectionTile(event);
  }
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

function showThisWeekTasks(event) {
  showTitle('Next 7 Days');
  if (event) {
    selectHomeSectionTile(event);
  }
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

function showImportantTasks(event) {
  showTitle('Important');
  if (event) {
    selectHomeSectionTile(event);
  }
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

// Update task header each time selected project change
function showTitle(titleName) {
  const showFormButton = document.querySelector('.create-task-button');
  showFormButton.classList.add('hidden');

  const title = document.querySelector('.title');
  title.textContent = titleName;
}

// Add selected class to selected tile
function selectHomeSectionTile(event) {
  const tileDiv = event.target.closest('.tile');

  // If other project/tile have selected class, remove it
  document.querySelectorAll('.selected').forEach((tile) => {
    if (tile !== tileDiv) {
      tile.classList.remove('selected');
    }
  });
  // Add selected class to clicked element
  tileDiv.classList.add('selected');
}

export {
  showHomeSectionTile,
  showAllTasks,
  showTitle,
  showTodayTasks,
  showThisWeekTasks,
  showImportantTasks,
};
