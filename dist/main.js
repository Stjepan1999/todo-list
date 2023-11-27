/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/creatingProject.js":
/*!********************************!*\
  !*** ./src/creatingProject.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addEventListeners: () => (/* binding */ addEventListeners),
/* harmony export */   allProjects: () => (/* binding */ allProjects)
/* harmony export */ });
/* harmony import */ var _creatingTask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./creatingTask */ "./src/creatingTask.js");


let projectID = 0;
let allProjects = [];


function addEventListeners() {
    const showFormButton = document.querySelector(".create-form-button");
    showFormButton.addEventListener("click", () => createForm());

    const closeFormButton = document.querySelector(".button.close-form");
    closeFormButton.addEventListener("click", () => closeForm());

    const addProjectButton = document.querySelector(".button.add-project");
    addProjectButton.addEventListener("click", () => createNewProject());

    
}

function CreateProject(title) {
    return {
        title,
        id: projectID++,
        tasks: []
    }
}

function createNewProject() {
    if (validateForm()) {
        const projectTitle = document.getElementById("project-title").value;
        const newProject = CreateProject(projectTitle);
        allProjects.push(newProject);
        closeForm()
        showProjects();
    }
}

function deleteProject(id) {
    let index = allProjects.findIndex(project => project.id === id);
    allProjects.splice(index, 1);
    showProjects();
}

function createForm() {
    const addProjectForm = document.querySelector(".add-project-form");
    addProjectForm.style.display = "flex";
}

function closeForm() {
    const addProjectForm = document.querySelector(".add-project-form");
    addProjectForm.style.display = "none";
    document.getElementById("project-title").value = "";
}

function validateForm() {
    const projectTitle = document.getElementById("project-title").value;
    if (projectTitle.length < 1 || projectTitle.length > 20) {
        return false
    }
    return true
}

function showProjects() {
    let projectsListDiv = document.querySelector(".projects-list");
    projectsListDiv.innerHTML = "";

    for (let i = 0; i < allProjects.length; i++) {

        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.dataset.project = i;
        projectDiv.addEventListener("click", () => selectProject(projectDiv, allProjects[i]))

        const projectIcon = document.createElement("img");
        projectIcon.classList.add("project-icon");
        projectIcon.src = "./images/project-icon.png"
        projectDiv.appendChild(projectIcon);

        const projectTitle = document.createElement("div");
        projectTitle.classList.add("project-list-title");
        projectTitle.textContent = allProjects[i].title
        projectDiv.appendChild(projectTitle)

        const editContainer = document.createElement("div");
        editContainer.classList.add("edit-options");

        const editIcons = document.createElement("div");
        editIcons.classList.add("edit-icons")
        for (let j = 0; j < 3; j++) {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            editIcons.appendChild(dot)
        }

        const optionsButtons = document.createElement("div");
        optionsButtons.classList.add("options-buttons")

        const deleteProjectButton = document.createElement("button");
        deleteProjectButton.classList.add("delete-project-button");
        deleteProjectButton.textContent = "Delete";
        deleteProjectButton.addEventListener("click", () => deleteProject(allProjects[i].id))
        
        const renameProjectButton = document.createElement("button");
        renameProjectButton.classList.add("rename-project-button");
        renameProjectButton.textContent = "Rename";
        renameProjectButton.addEventListener("click", () => renameProject())

        optionsButtons.appendChild(deleteProjectButton)
        optionsButtons.appendChild(renameProjectButton)

        editContainer.appendChild(editIcons)
        editContainer.appendChild(optionsButtons)

        projectDiv.appendChild(editContainer)

        projectsListDiv.appendChild(projectDiv)

        editContainer.addEventListener("click", () => showEditOptions(editContainer))
    }
}


function showEditOptions(editContainer) {
    const optionsButtons = editContainer.querySelector(".options-buttons");

    // Close all open options before toggling the current one
    document.querySelectorAll('.visible').forEach(container => {
        if (container !== editContainer) {
            container.classList.remove('visible');
        }
    });
    optionsButtons.classList.toggle("visible");

    // Add a click event listener to the document body
    // If clicked, options become invisible
    document.body.addEventListener("click", () => {
        optionsButtons.classList.remove("visible");
        });

    editContainer.addEventListener("click", (event) => {
        event.stopPropagation();
    })
}

function selectProject(projectDiv, project) {
    document.querySelectorAll(".selected").forEach(container => {
        if(container !== projectDiv) {
            container.classList.remove("selected")
        }
    })
    projectDiv.classList.add("selected")

    const title = document.querySelector(".title");
    title.textContent = project.title
    ;(0,_creatingTask__WEBPACK_IMPORTED_MODULE_0__.showTasks)(project.tasks)

}




/***/ }),

/***/ "./src/creatingTask.js":
/*!*****************************!*\
  !*** ./src/creatingTask.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTaskEvents: () => (/* binding */ createTaskEvents),
/* harmony export */   showTasks: () => (/* binding */ showTasks)
/* harmony export */ });
/* harmony import */ var _creatingProject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./creatingProject */ "./src/creatingProject.js");


let taskID = 0;

function createTaskEvents () {
    const showFormButton = document.querySelector(".create-task-button")
    showFormButton.addEventListener("click", () => showForm())

    const closeFormButton = document.querySelector(".button.close-task-form");
    closeFormButton.addEventListener("click", () => closeForm());

    const addTaskButton = document.querySelector(".button.add-task");
    addTaskButton.addEventListener("click", () => createNewTask())
}


function CreateTask(title, description, date) {
    return {
        id: taskID++,
        title,
        description,
        date
    }
}

function createNewTask() {
    const taskTitle = document.getElementById("task-title").value;
    const taskDescription = document.getElementById("task-description").value;
    const taskDate = document.getElementById("task-date").value;

    const projectIndex = findSelectedProject()
    const project = _creatingProject__WEBPACK_IMPORTED_MODULE_0__.allProjects[projectIndex].tasks
    console.log("project index:", projectIndex)
    console.log("project:", project)
    const newTask = CreateTask(taskTitle, taskDescription, taskDate);
    project.push(newTask)
    //taskTitle.value = "";
    //taskDescription.value = "";
    //taskDate.value = "";    
    closeForm();
    showTasks(project)
}

function showForm() {
    const taskForm = document.querySelector(".add-task-form");
    taskForm.style.display = "flex"
}

function closeForm() {
    const taskForm = document.querySelector(".add-task-form");
    taskForm.style.display = "none"

    //document.getElementById("task-title").value = "";
    //document.getElementById("task-description").value = "";
    //document.getElementById("task-date").value = "";
}

function showTasks(projectTasks) {
    const tasksContainer = document.querySelector(".tasks-container");
    tasksContainer.innerHTML = ""
    
    for (let i = 0; i < projectTasks.length; i++) {

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        const circle = document.createElement("span");
        circle.classList.add("circle");

        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");

        const taskTitle = document.createElement("div");
        taskTitle.classList.add("task-title");
        taskTitle.textContent = projectTasks[i].title;

        const taskDescription = document.createElement("div");
        taskDescription.classList.add("task-description");
        taskDescription.textContent = projectTasks[i].description;

        const taskDate = document.createElement("div");
        taskDate.classList.add("date");
        taskDate.textContent = projectTasks[i].date;

        const importantStar = document.createElement("div");
        importantStar.classList.add("important-star");
        importantStar.textContent = "Star"

        const editIcons = document.createElement("div");
        editIcons.classList.add("edit-icons");
        for (let j = 0; j < 3; j++) {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            editIcons.appendChild(dot);
        }

        const optionsButtons = document.createElement("div");
        optionsButtons.classList.add("options-buttons");

        const deleteTaskButton = document.createElement("button");
        deleteTaskButton.classList.add("delete-project-button");
        deleteTaskButton.textContent = "Delete";

        const editTaskButton = document.createElement("button");
        editTaskButton.classList.add("rename-project-button");
        editTaskButton.textContent = "Edit";

        taskDiv.appendChild(circle);
        taskInfo.appendChild(taskTitle);
        taskInfo.appendChild(taskDescription);
        taskDiv.appendChild(taskInfo);
        taskDiv.appendChild(taskDate);
        taskDiv.appendChild(importantStar);
        taskDiv.appendChild(editIcons);
        tasksContainer.appendChild(taskDiv);
    }
}

function findSelectedProject() {
    const selected = document.querySelector(".selected");
    return selected.dataset.project
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _creatingProject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./creatingProject */ "./src/creatingProject.js");
/* harmony import */ var _creatingTask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./creatingTask */ "./src/creatingTask.js");



(0,_creatingProject__WEBPACK_IMPORTED_MODULE_0__.addEventListeners)()
;(0,_creatingTask__WEBPACK_IMPORTED_MODULE_1__.createTaskEvents)()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTBDOztBQUUxQztBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLHdCQUF3Qjs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLElBQUkseURBQVM7O0FBRWI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1SmdEOztBQUVoRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IseURBQVc7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHlCQUF5Qjs7QUFFN0M7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztVQ3pIQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05zRDtBQUNMOztBQUVqRCxtRUFBaUI7QUFDakIsZ0VBQWdCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY3JlYXRpbmdQcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jcmVhdGluZ1Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNob3dUYXNrcyB9IGZyb20gJy4vY3JlYXRpbmdUYXNrJ1xuXG5sZXQgcHJvamVjdElEID0gMDtcbmxldCBhbGxQcm9qZWN0cyA9IFtdO1xuXG5cbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IHNob3dGb3JtQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jcmVhdGUtZm9ybS1idXR0b25cIik7XG4gICAgc2hvd0Zvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNyZWF0ZUZvcm0oKSk7XG5cbiAgICBjb25zdCBjbG9zZUZvcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbi5jbG9zZS1mb3JtXCIpO1xuICAgIGNsb3NlRm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY2xvc2VGb3JtKCkpO1xuXG4gICAgY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLmFkZC1wcm9qZWN0XCIpO1xuICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNyZWF0ZU5ld1Byb2plY3QoKSk7XG5cbiAgICBcbn1cblxuZnVuY3Rpb24gQ3JlYXRlUHJvamVjdCh0aXRsZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlLFxuICAgICAgICBpZDogcHJvamVjdElEKyssXG4gICAgICAgIHRhc2tzOiBbXVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlTmV3UHJvamVjdCgpIHtcbiAgICBpZiAodmFsaWRhdGVGb3JtKCkpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXRpdGxlXCIpLnZhbHVlO1xuICAgICAgICBjb25zdCBuZXdQcm9qZWN0ID0gQ3JlYXRlUHJvamVjdChwcm9qZWN0VGl0bGUpO1xuICAgICAgICBhbGxQcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuICAgICAgICBjbG9zZUZvcm0oKVxuICAgICAgICBzaG93UHJvamVjdHMoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoaWQpIHtcbiAgICBsZXQgaW5kZXggPSBhbGxQcm9qZWN0cy5maW5kSW5kZXgocHJvamVjdCA9PiBwcm9qZWN0LmlkID09PSBpZCk7XG4gICAgYWxsUHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBzaG93UHJvamVjdHMoKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9ybSgpIHtcbiAgICBjb25zdCBhZGRQcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtZm9ybVwiKTtcbiAgICBhZGRQcm9qZWN0Rm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG59XG5cbmZ1bmN0aW9uIGNsb3NlRm9ybSgpIHtcbiAgICBjb25zdCBhZGRQcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtZm9ybVwiKTtcbiAgICBhZGRQcm9qZWN0Rm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXRpdGxlXCIpLnZhbHVlID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVGb3JtKCkge1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC10aXRsZVwiKS52YWx1ZTtcbiAgICBpZiAocHJvamVjdFRpdGxlLmxlbmd0aCA8IDEgfHwgcHJvamVjdFRpdGxlLmxlbmd0aCA+IDIwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBzaG93UHJvamVjdHMoKSB7XG4gICAgbGV0IHByb2plY3RzTGlzdERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHMtbGlzdFwiKTtcbiAgICBwcm9qZWN0c0xpc3REaXYuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsUHJvamVjdHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcbiAgICAgICAgcHJvamVjdERpdi5kYXRhc2V0LnByb2plY3QgPSBpO1xuICAgICAgICBwcm9qZWN0RGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBzZWxlY3RQcm9qZWN0KHByb2plY3REaXYsIGFsbFByb2plY3RzW2ldKSlcblxuICAgICAgICBjb25zdCBwcm9qZWN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIHByb2plY3RJY29uLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWljb25cIik7XG4gICAgICAgIHByb2plY3RJY29uLnNyYyA9IFwiLi9pbWFnZXMvcHJvamVjdC1pY29uLnBuZ1wiXG4gICAgICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdEljb24pO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHByb2plY3RUaXRsZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1saXN0LXRpdGxlXCIpO1xuICAgICAgICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBhbGxQcm9qZWN0c1tpXS50aXRsZVxuICAgICAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByb2plY3RUaXRsZSlcblxuICAgICAgICBjb25zdCBlZGl0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZWRpdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZWRpdC1vcHRpb25zXCIpO1xuXG4gICAgICAgIGNvbnN0IGVkaXRJY29ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGVkaXRJY29ucy5jbGFzc0xpc3QuYWRkKFwiZWRpdC1pY29uc1wiKVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKykge1xuICAgICAgICAgICAgY29uc3QgZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBkb3QuY2xhc3NMaXN0LmFkZChcImRvdFwiKTtcbiAgICAgICAgICAgIGVkaXRJY29ucy5hcHBlbmRDaGlsZChkb3QpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcHRpb25zQnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG9wdGlvbnNCdXR0b25zLmNsYXNzTGlzdC5hZGQoXCJvcHRpb25zLWJ1dHRvbnNcIilcblxuICAgICAgICBjb25zdCBkZWxldGVQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3QtYnV0dG9uXCIpO1xuICAgICAgICBkZWxldGVQcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gXCJEZWxldGVcIjtcbiAgICAgICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZGVsZXRlUHJvamVjdChhbGxQcm9qZWN0c1tpXS5pZCkpXG4gICAgICAgIFxuICAgICAgICBjb25zdCByZW5hbWVQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgcmVuYW1lUHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmVuYW1lLXByb2plY3QtYnV0dG9uXCIpO1xuICAgICAgICByZW5hbWVQcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gXCJSZW5hbWVcIjtcbiAgICAgICAgcmVuYW1lUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gcmVuYW1lUHJvamVjdCgpKVxuXG4gICAgICAgIG9wdGlvbnNCdXR0b25zLmFwcGVuZENoaWxkKGRlbGV0ZVByb2plY3RCdXR0b24pXG4gICAgICAgIG9wdGlvbnNCdXR0b25zLmFwcGVuZENoaWxkKHJlbmFtZVByb2plY3RCdXR0b24pXG5cbiAgICAgICAgZWRpdENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0SWNvbnMpXG4gICAgICAgIGVkaXRDb250YWluZXIuYXBwZW5kQ2hpbGQob3B0aW9uc0J1dHRvbnMpXG5cbiAgICAgICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChlZGl0Q29udGFpbmVyKVxuXG4gICAgICAgIHByb2plY3RzTGlzdERpdi5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KVxuXG4gICAgICAgIGVkaXRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHNob3dFZGl0T3B0aW9ucyhlZGl0Q29udGFpbmVyKSlcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gc2hvd0VkaXRPcHRpb25zKGVkaXRDb250YWluZXIpIHtcbiAgICBjb25zdCBvcHRpb25zQnV0dG9ucyA9IGVkaXRDb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5vcHRpb25zLWJ1dHRvbnNcIik7XG5cbiAgICAvLyBDbG9zZSBhbGwgb3BlbiBvcHRpb25zIGJlZm9yZSB0b2dnbGluZyB0aGUgY3VycmVudCBvbmVcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudmlzaWJsZScpLmZvckVhY2goY29udGFpbmVyID0+IHtcbiAgICAgICAgaWYgKGNvbnRhaW5lciAhPT0gZWRpdENvbnRhaW5lcikge1xuICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIG9wdGlvbnNCdXR0b25zLmNsYXNzTGlzdC50b2dnbGUoXCJ2aXNpYmxlXCIpO1xuXG4gICAgLy8gQWRkIGEgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGRvY3VtZW50IGJvZHlcbiAgICAvLyBJZiBjbGlja2VkLCBvcHRpb25zIGJlY29tZSBpbnZpc2libGVcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIG9wdGlvbnNCdXR0b25zLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xuICAgICAgICB9KTtcblxuICAgIGVkaXRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzZWxlY3RQcm9qZWN0KHByb2plY3REaXYsIHByb2plY3QpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdGVkXCIpLmZvckVhY2goY29udGFpbmVyID0+IHtcbiAgICAgICAgaWYoY29udGFpbmVyICE9PSBwcm9qZWN0RGl2KSB7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHByb2plY3REaXYuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpXG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGVcIik7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0LnRpdGxlXG4gICAgc2hvd1Rhc2tzKHByb2plY3QudGFza3MpXG5cbn1cblxuXG5leHBvcnQgeyBhZGRFdmVudExpc3RlbmVycywgYWxsUHJvamVjdHN9IiwiaW1wb3J0IHsgYWxsUHJvamVjdHMgfSBmcm9tIFwiLi9jcmVhdGluZ1Byb2plY3RcIjtcblxubGV0IHRhc2tJRCA9IDA7XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhc2tFdmVudHMgKCkge1xuICAgIGNvbnN0IHNob3dGb3JtQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jcmVhdGUtdGFzay1idXR0b25cIilcbiAgICBzaG93Rm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gc2hvd0Zvcm0oKSlcblxuICAgIGNvbnN0IGNsb3NlRm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLmNsb3NlLXRhc2stZm9ybVwiKTtcbiAgICBjbG9zZUZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNsb3NlRm9ybSgpKTtcblxuICAgIGNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbi5hZGQtdGFza1wiKTtcbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjcmVhdGVOZXdUYXNrKCkpXG59XG5cblxuZnVuY3Rpb24gQ3JlYXRlVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBpZDogdGFza0lEKyssXG4gICAgICAgIHRpdGxlLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgZGF0ZVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlTmV3VGFzaygpIHtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stdGl0bGVcIikudmFsdWU7XG4gICAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWRlc2NyaXB0aW9uXCIpLnZhbHVlO1xuICAgIGNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWRhdGVcIikudmFsdWU7XG5cbiAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBmaW5kU2VsZWN0ZWRQcm9qZWN0KClcbiAgICBjb25zdCBwcm9qZWN0ID0gYWxsUHJvamVjdHNbcHJvamVjdEluZGV4XS50YXNrc1xuICAgIGNvbnNvbGUubG9nKFwicHJvamVjdCBpbmRleDpcIiwgcHJvamVjdEluZGV4KVxuICAgIGNvbnNvbGUubG9nKFwicHJvamVjdDpcIiwgcHJvamVjdClcbiAgICBjb25zdCBuZXdUYXNrID0gQ3JlYXRlVGFzayh0YXNrVGl0bGUsIHRhc2tEZXNjcmlwdGlvbiwgdGFza0RhdGUpO1xuICAgIHByb2plY3QucHVzaChuZXdUYXNrKVxuICAgIC8vdGFza1RpdGxlLnZhbHVlID0gXCJcIjtcbiAgICAvL3Rhc2tEZXNjcmlwdGlvbi52YWx1ZSA9IFwiXCI7XG4gICAgLy90YXNrRGF0ZS52YWx1ZSA9IFwiXCI7ICAgIFxuICAgIGNsb3NlRm9ybSgpO1xuICAgIHNob3dUYXNrcyhwcm9qZWN0KVxufVxuXG5mdW5jdGlvbiBzaG93Rm9ybSgpIHtcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stZm9ybVwiKTtcbiAgICB0YXNrRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCJcbn1cblxuZnVuY3Rpb24gY2xvc2VGb3JtKCkge1xuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1mb3JtXCIpO1xuICAgIHRhc2tGb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXG4gICAgLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stdGl0bGVcIikudmFsdWUgPSBcIlwiO1xuICAgIC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWRlc2NyaXB0aW9uXCIpLnZhbHVlID0gXCJcIjtcbiAgICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1kYXRlXCIpLnZhbHVlID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gc2hvd1Rhc2tzKHByb2plY3RUYXNrcykge1xuICAgIGNvbnN0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrcy1jb250YWluZXJcIik7XG4gICAgdGFza3NDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIlxuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdFRhc2tzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XG5cbiAgICAgICAgY29uc3QgY2lyY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGNpcmNsZS5jbGFzc0xpc3QuYWRkKFwiY2lyY2xlXCIpO1xuXG4gICAgICAgIGNvbnN0IHRhc2tJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGFza0luZm8uY2xhc3NMaXN0LmFkZChcInRhc2staW5mb1wiKTtcblxuICAgICAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0YXNrVGl0bGUuY2xhc3NMaXN0LmFkZChcInRhc2stdGl0bGVcIik7XG4gICAgICAgIHRhc2tUaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RUYXNrc1tpXS50aXRsZTtcblxuICAgICAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0YXNrRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcInRhc2stZGVzY3JpcHRpb25cIik7XG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3RUYXNrc1tpXS5kZXNjcmlwdGlvbjtcblxuICAgICAgICBjb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRhc2tEYXRlLmNsYXNzTGlzdC5hZGQoXCJkYXRlXCIpO1xuICAgICAgICB0YXNrRGF0ZS50ZXh0Q29udGVudCA9IHByb2plY3RUYXNrc1tpXS5kYXRlO1xuXG4gICAgICAgIGNvbnN0IGltcG9ydGFudFN0YXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBpbXBvcnRhbnRTdGFyLmNsYXNzTGlzdC5hZGQoXCJpbXBvcnRhbnQtc3RhclwiKTtcbiAgICAgICAgaW1wb3J0YW50U3Rhci50ZXh0Q29udGVudCA9IFwiU3RhclwiXG5cbiAgICAgICAgY29uc3QgZWRpdEljb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZWRpdEljb25zLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWljb25zXCIpO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKykge1xuICAgICAgICAgICAgY29uc3QgZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBkb3QuY2xhc3NMaXN0LmFkZChcImRvdFwiKTtcbiAgICAgICAgICAgIGVkaXRJY29ucy5hcHBlbmRDaGlsZChkb3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uc0J1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBvcHRpb25zQnV0dG9ucy5jbGFzc0xpc3QuYWRkKFwib3B0aW9ucy1idXR0b25zXCIpO1xuXG4gICAgICAgIGNvbnN0IGRlbGV0ZVRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBkZWxldGVUYXNrQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtcHJvamVjdC1idXR0b25cIik7XG4gICAgICAgIGRlbGV0ZVRhc2tCdXR0b24udGV4dENvbnRlbnQgPSBcIkRlbGV0ZVwiO1xuXG4gICAgICAgIGNvbnN0IGVkaXRUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZWRpdFRhc2tCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlbmFtZS1wcm9qZWN0LWJ1dHRvblwiKTtcbiAgICAgICAgZWRpdFRhc2tCdXR0b24udGV4dENvbnRlbnQgPSBcIkVkaXRcIjtcblxuICAgICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGNpcmNsZSk7XG4gICAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tUaXRsZSk7XG4gICAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XG4gICAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0luZm8pO1xuICAgICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcbiAgICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZChpbXBvcnRhbnRTdGFyKTtcbiAgICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZChlZGl0SWNvbnMpO1xuICAgICAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRGl2KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRTZWxlY3RlZFByb2plY3QoKSB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGVkXCIpO1xuICAgIHJldHVybiBzZWxlY3RlZC5kYXRhc2V0LnByb2plY3Rcbn1cblxuXG5leHBvcnQgeyBjcmVhdGVUYXNrRXZlbnRzLCBzaG93VGFza3MgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgYWRkRXZlbnRMaXN0ZW5lcnMgfSBmcm9tIFwiLi9jcmVhdGluZ1Byb2plY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVRhc2tFdmVudHMgfSBmcm9tIFwiLi9jcmVhdGluZ1Rhc2tcIlxuXG5hZGRFdmVudExpc3RlbmVycygpXG5jcmVhdGVUYXNrRXZlbnRzKCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=