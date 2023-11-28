import { showTasks } from "./creatingTask";
import { allProjects } from "./creatingProject";

function showHomeSectionTile() {
    const allTasks = document.getElementById("all-tasks");
    allTasks.addEventListener("click", showAllTasks)
}

function showAllTasks() {
    const showFormButton = document.querySelector(".create-task-button");
    showFormButton.style.display = "none"

    const allTasks = []

    if (allProjects.length > 0) {
        allProjects.forEach((project) => {
            project.tasks.forEach((task) => {
                allTasks.push(task)
            })
        })
    }

    console.log("all tasks:", allTasks)
    showTasks(allTasks)
 }

export { showHomeSectionTile }