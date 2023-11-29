import { showTasks } from "./creatingTask";
import { allProjects } from "./creatingProject";
import { format, addDays } from 'date-fns';

function showHomeSectionTile() {
    const allTasks = document.getElementById("all-tasks");
    allTasks.addEventListener("click", showAllTasks);

    const todayTasks = document.getElementById("today");
    todayTasks.addEventListener("click", showTodayTasks)
}

function showAllTasks() {
    const showFormButton = document.querySelector(".create-task-button");
    showFormButton.style.display = "none"

    const title = document.querySelector(".title");
    title.textContent = "All Tasks"

    let allTasks = []

    if (allProjects.length > 0) {
        allProjects.forEach((project) => {
            project.tasks.forEach((task) => {
                allTasks.push(task)
            })
        })
    }
    showTasks(allTasks)
 }


function showTodayTasks() {
    const showFormButton = document.querySelector(".create-task-button");
    showFormButton.style.display = "none"

    const title = document.querySelector(".title");
    title.textContent = "Today";

    let todayTasks = [];
    const rawDate = new Date();
    const todayDate = format(rawDate, 'yyyy-MM-dd')
    

    if (allProjects.length > 0) {
        allProjects.forEach((project) => {
            project.tasks.forEach((task) => {
                if (task.date === todayDate) {
                    todayTasks.push(task)
                }
            })
        })
    }
    showTasks(todayTasks)
}

export { showHomeSectionTile }