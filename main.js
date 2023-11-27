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
    console.log("project in selectProject:", project)
    console.log("projectTasks in selectProject: ", project.tasks)

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
/* harmony export */   createButton: () => (/* binding */ createButton),
/* harmony export */   createTaskEvents: () => (/* binding */ createTaskEvents),
/* harmony export */   showTasks: () => (/* binding */ showTasks)
/* harmony export */ });
/* harmony import */ var _creatingProject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./creatingProject */ "./src/creatingProject.js");


let taskID = 0;

function createTaskEvents () {
    const showFormButton = document.querySelector(".create-task-button")
    showFormButton.addEventListener("click", () => showForm())

    const closeFormButton = document.querySelector(".button.close-task-form");
    closeFormButton.addEventListener("click", () => closeForm())
}


function CreateTask(title, description, date) {
    return {
        id: taskID++,
        title,
        description,
        date
    }
}

function createNewTask(projectTasks) {
    const taskTitle = document.getElementById("task-title").value;
    const taskDescription = document.getElementById("task-description").value;
    const taskDate = document.getElementById("task-date").value;

    const newTask = CreateTask(taskTitle, taskDescription, taskDate);
    projectTasks.push(newTask)
    //taskTitle.value = "";
    //taskDescription.value = "";
    //taskDate.value = "";    
    closeForm();
    showTasks(projectTasks)
}

function createButton(project) {
    const formButtons = document.querySelector(".task-buttons");
    formButtons.innerHTML = "";

    const addTaskButton = document.createElement("button");
    addTaskButton.classList.add("button")
    addTaskButton.classList.add("add-task")
    addTaskButton.addEventListener("click", () => createNewTask(project))

    formButtons.appendChild(addTaskButton)
    
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
    
    createButton(projectTasks)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXdEOztBQUV4RDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLHdCQUF3Qjs7QUFFNUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSx5REFBUztBQUNiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0pnRDs7QUFFaEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHlCQUF5Qjs7QUFFN0M7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztVQzVIQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05zRDtBQUNMOztBQUVqRCxtRUFBaUI7QUFDakIsZ0VBQWdCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY3JlYXRpbmdQcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jcmVhdGluZ1Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUJ1dHRvbiwgc2hvd1Rhc2tzIH0gZnJvbSAnLi9jcmVhdGluZ1Rhc2snXG5cbmxldCBwcm9qZWN0SUQgPSAwO1xubGV0IGFsbFByb2plY3RzID0gW107XG5cblxuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3Qgc2hvd0Zvcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNyZWF0ZS1mb3JtLWJ1dHRvblwiKTtcbiAgICBzaG93Rm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY3JlYXRlRm9ybSgpKTtcblxuICAgIGNvbnN0IGNsb3NlRm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLmNsb3NlLWZvcm1cIik7XG4gICAgY2xvc2VGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjbG9zZUZvcm0oKSk7XG5cbiAgICBjb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24uYWRkLXByb2plY3RcIik7XG4gICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY3JlYXRlTmV3UHJvamVjdCgpKTtcblxuICAgIFxufVxuXG5mdW5jdGlvbiBDcmVhdGVQcm9qZWN0KHRpdGxlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGlkOiBwcm9qZWN0SUQrKyxcbiAgICAgICAgdGFza3M6IFtdXG4gICAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVOZXdQcm9qZWN0KCkge1xuICAgIGlmICh2YWxpZGF0ZUZvcm0oKSkge1xuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtdGl0bGVcIikudmFsdWU7XG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBDcmVhdGVQcm9qZWN0KHByb2plY3RUaXRsZSk7XG4gICAgICAgIGFsbFByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG4gICAgICAgIGNsb3NlRm9ybSgpXG4gICAgICAgIHNob3dQcm9qZWN0cygpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChpZCkge1xuICAgIGxldCBpbmRleCA9IGFsbFByb2plY3RzLmZpbmRJbmRleChwcm9qZWN0ID0+IHByb2plY3QuaWQgPT09IGlkKTtcbiAgICBhbGxQcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHNob3dQcm9qZWN0cygpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGb3JtKCkge1xuICAgIGNvbnN0IGFkZFByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1mb3JtXCIpO1xuICAgIGFkZFByb2plY3RGb3JtLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbn1cblxuZnVuY3Rpb24gY2xvc2VGb3JtKCkge1xuICAgIGNvbnN0IGFkZFByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1mb3JtXCIpO1xuICAgIGFkZFByb2plY3RGb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtdGl0bGVcIikudmFsdWUgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUZvcm0oKSB7XG4gICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXRpdGxlXCIpLnZhbHVlO1xuICAgIGlmIChwcm9qZWN0VGl0bGUubGVuZ3RoIDwgMSB8fCBwcm9qZWN0VGl0bGUubGVuZ3RoID4gMjApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIHNob3dQcm9qZWN0cygpIHtcbiAgICBsZXQgcHJvamVjdHNMaXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy1saXN0XCIpO1xuICAgIHByb2plY3RzTGlzdERpdi5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxQcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xuICAgICAgICBwcm9qZWN0RGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBzZWxlY3RQcm9qZWN0KHByb2plY3REaXYsIGFsbFByb2plY3RzW2ldKSlcblxuICAgICAgICBjb25zdCBwcm9qZWN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIHByb2plY3RJY29uLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWljb25cIik7XG4gICAgICAgIHByb2plY3RJY29uLnNyYyA9IFwiLi9pbWFnZXMvcHJvamVjdC1pY29uLnBuZ1wiXG4gICAgICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdEljb24pO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHByb2plY3RUaXRsZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1saXN0LXRpdGxlXCIpO1xuICAgICAgICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBhbGxQcm9qZWN0c1tpXS50aXRsZVxuICAgICAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByb2plY3RUaXRsZSlcblxuICAgICAgICBjb25zdCBlZGl0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZWRpdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZWRpdC1vcHRpb25zXCIpO1xuXG4gICAgICAgIGNvbnN0IGVkaXRJY29ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGVkaXRJY29ucy5jbGFzc0xpc3QuYWRkKFwiZWRpdC1pY29uc1wiKVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKykge1xuICAgICAgICAgICAgY29uc3QgZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBkb3QuY2xhc3NMaXN0LmFkZChcImRvdFwiKTtcbiAgICAgICAgICAgIGVkaXRJY29ucy5hcHBlbmRDaGlsZChkb3QpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcHRpb25zQnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG9wdGlvbnNCdXR0b25zLmNsYXNzTGlzdC5hZGQoXCJvcHRpb25zLWJ1dHRvbnNcIilcblxuICAgICAgICBjb25zdCBkZWxldGVQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3QtYnV0dG9uXCIpO1xuICAgICAgICBkZWxldGVQcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gXCJEZWxldGVcIjtcbiAgICAgICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZGVsZXRlUHJvamVjdChhbGxQcm9qZWN0c1tpXS5pZCkpXG4gICAgICAgIFxuICAgICAgICBjb25zdCByZW5hbWVQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgcmVuYW1lUHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmVuYW1lLXByb2plY3QtYnV0dG9uXCIpO1xuICAgICAgICByZW5hbWVQcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gXCJSZW5hbWVcIjtcbiAgICAgICAgcmVuYW1lUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gcmVuYW1lUHJvamVjdCgpKVxuXG4gICAgICAgIG9wdGlvbnNCdXR0b25zLmFwcGVuZENoaWxkKGRlbGV0ZVByb2plY3RCdXR0b24pXG4gICAgICAgIG9wdGlvbnNCdXR0b25zLmFwcGVuZENoaWxkKHJlbmFtZVByb2plY3RCdXR0b24pXG5cbiAgICAgICAgZWRpdENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0SWNvbnMpXG4gICAgICAgIGVkaXRDb250YWluZXIuYXBwZW5kQ2hpbGQob3B0aW9uc0J1dHRvbnMpXG5cbiAgICAgICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChlZGl0Q29udGFpbmVyKVxuXG4gICAgICAgIHByb2plY3RzTGlzdERpdi5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KVxuXG4gICAgICAgIGVkaXRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHNob3dFZGl0T3B0aW9ucyhlZGl0Q29udGFpbmVyKSlcblxuXG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIHNob3dFZGl0T3B0aW9ucyhlZGl0Q29udGFpbmVyKSB7XG4gICAgY29uc3Qgb3B0aW9uc0J1dHRvbnMgPSBlZGl0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIub3B0aW9ucy1idXR0b25zXCIpO1xuXG4gICAgLy8gQ2xvc2UgYWxsIG9wZW4gb3B0aW9ucyBiZWZvcmUgdG9nZ2xpbmcgdGhlIGN1cnJlbnQgb25lXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZpc2libGUnKS5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XG4gICAgICAgIGlmIChjb250YWluZXIgIT09IGVkaXRDb250YWluZXIpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBvcHRpb25zQnV0dG9ucy5jbGFzc0xpc3QudG9nZ2xlKFwidmlzaWJsZVwiKTtcblxuICAgIC8vIEFkZCBhIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBkb2N1bWVudCBib2R5XG4gICAgLy8gSWYgY2xpY2tlZCwgb3B0aW9ucyBiZWNvbWUgaW52aXNpYmxlXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBvcHRpb25zQnV0dG9ucy5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcbiAgICAgICAgfSk7XG5cbiAgICBlZGl0Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc2VsZWN0UHJvamVjdChwcm9qZWN0RGl2LCBwcm9qZWN0KSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3RlZFwiKS5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XG4gICAgICAgIGlmKGNvbnRhaW5lciAhPT0gcHJvamVjdERpdikge1xuICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKVxuICAgICAgICB9XG4gICAgfSlcbiAgICBwcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKVxuXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlXCIpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZVxuICAgIGNvbnNvbGUubG9nKFwicHJvamVjdCBpbiBzZWxlY3RQcm9qZWN0OlwiLCBwcm9qZWN0KVxuICAgIGNvbnNvbGUubG9nKFwicHJvamVjdFRhc2tzIGluIHNlbGVjdFByb2plY3Q6IFwiLCBwcm9qZWN0LnRhc2tzKVxuXG4gICAgc2hvd1Rhc2tzKHByb2plY3QudGFza3MpXG59XG5cbmV4cG9ydCB7IGFkZEV2ZW50TGlzdGVuZXJzLCBhbGxQcm9qZWN0cyB9IiwiaW1wb3J0IHsgYWxsUHJvamVjdHMgfSBmcm9tIFwiLi9jcmVhdGluZ1Byb2plY3RcIjtcblxubGV0IHRhc2tJRCA9IDA7XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhc2tFdmVudHMgKCkge1xuICAgIGNvbnN0IHNob3dGb3JtQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jcmVhdGUtdGFzay1idXR0b25cIilcbiAgICBzaG93Rm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gc2hvd0Zvcm0oKSlcblxuICAgIGNvbnN0IGNsb3NlRm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLmNsb3NlLXRhc2stZm9ybVwiKTtcbiAgICBjbG9zZUZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNsb3NlRm9ybSgpKVxufVxuXG5cbmZ1bmN0aW9uIENyZWF0ZVRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHRhc2tJRCsrLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGRhdGVcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5ld1Rhc2socHJvamVjdFRhc2tzKSB7XG4gICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXRpdGxlXCIpLnZhbHVlO1xuICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1kZXNjcmlwdGlvblwiKS52YWx1ZTtcbiAgICBjb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1kYXRlXCIpLnZhbHVlO1xuXG4gICAgY29uc3QgbmV3VGFzayA9IENyZWF0ZVRhc2sodGFza1RpdGxlLCB0YXNrRGVzY3JpcHRpb24sIHRhc2tEYXRlKTtcbiAgICBwcm9qZWN0VGFza3MucHVzaChuZXdUYXNrKVxuICAgIC8vdGFza1RpdGxlLnZhbHVlID0gXCJcIjtcbiAgICAvL3Rhc2tEZXNjcmlwdGlvbi52YWx1ZSA9IFwiXCI7XG4gICAgLy90YXNrRGF0ZS52YWx1ZSA9IFwiXCI7ICAgIFxuICAgIGNsb3NlRm9ybSgpO1xuICAgIHNob3dUYXNrcyhwcm9qZWN0VGFza3MpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbihwcm9qZWN0KSB7XG4gICAgY29uc3QgZm9ybUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stYnV0dG9uc1wiKTtcbiAgICBmb3JtQnV0dG9ucy5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYWRkVGFza0J1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpXG4gICAgYWRkVGFza0J1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWRkLXRhc2tcIilcbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjcmVhdGVOZXdUYXNrKHByb2plY3QpKVxuXG4gICAgZm9ybUJ1dHRvbnMuYXBwZW5kQ2hpbGQoYWRkVGFza0J1dHRvbilcbiAgICBcbn1cblxuZnVuY3Rpb24gc2hvd0Zvcm0oKSB7XG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLWZvcm1cIik7XG4gICAgdGFza0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiXG59XG5cbmZ1bmN0aW9uIGNsb3NlRm9ybSgpIHtcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stZm9ybVwiKTtcbiAgICB0YXNrRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblxuICAgIC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXRpdGxlXCIpLnZhbHVlID0gXCJcIjtcbiAgICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1kZXNjcmlwdGlvblwiKS52YWx1ZSA9IFwiXCI7XG4gICAgLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZGF0ZVwiKS52YWx1ZSA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIHNob3dUYXNrcyhwcm9qZWN0VGFza3MpIHtcbiAgICBjb25zdCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFza3MtY29udGFpbmVyXCIpO1xuICAgIHRhc2tzQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCJcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RUYXNrcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xuXG4gICAgICAgIGNvbnN0IGNpcmNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBjaXJjbGUuY2xhc3NMaXN0LmFkZChcImNpcmNsZVwiKTtcblxuICAgICAgICBjb25zdCB0YXNrSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRhc2tJbmZvLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWluZm9cIik7XG5cbiAgICAgICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGFza1RpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXRpdGxlXCIpO1xuICAgICAgICB0YXNrVGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0VGFza3NbaV0udGl0bGU7XG5cbiAgICAgICAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGFza0Rlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWRlc2NyaXB0aW9uXCIpO1xuICAgICAgICB0YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0VGFza3NbaV0uZGVzY3JpcHRpb247XG5cbiAgICAgICAgY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0YXNrRGF0ZS5jbGFzc0xpc3QuYWRkKFwiZGF0ZVwiKTtcbiAgICAgICAgdGFza0RhdGUudGV4dENvbnRlbnQgPSBwcm9qZWN0VGFza3NbaV0uZGF0ZTtcblxuICAgICAgICBjb25zdCBpbXBvcnRhbnRTdGFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW1wb3J0YW50U3Rhci5jbGFzc0xpc3QuYWRkKFwiaW1wb3J0YW50LXN0YXJcIik7XG4gICAgICAgIGltcG9ydGFudFN0YXIudGV4dENvbnRlbnQgPSBcIlN0YXJcIlxuXG4gICAgICAgIGNvbnN0IGVkaXRJY29ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGVkaXRJY29ucy5jbGFzc0xpc3QuYWRkKFwiZWRpdC1pY29uc1wiKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICAgICAgZG90LmNsYXNzTGlzdC5hZGQoXCJkb3RcIik7XG4gICAgICAgICAgICBlZGl0SWNvbnMuYXBwZW5kQ2hpbGQoZG90KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9wdGlvbnNCdXR0b25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgb3B0aW9uc0J1dHRvbnMuY2xhc3NMaXN0LmFkZChcIm9wdGlvbnMtYnV0dG9uc1wiKTtcblxuICAgICAgICBjb25zdCBkZWxldGVUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZGVsZXRlVGFza0J1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3QtYnV0dG9uXCIpO1xuICAgICAgICBkZWxldGVUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gXCJEZWxldGVcIjtcblxuICAgICAgICBjb25zdCBlZGl0VGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGVkaXRUYXNrQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZW5hbWUtcHJvamVjdC1idXR0b25cIik7XG4gICAgICAgIGVkaXRUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gXCJFZGl0XCI7XG5cbiAgICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZChjaXJjbGUpO1xuICAgICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrVGl0bGUpO1xuICAgICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xuICAgICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tJbmZvKTtcbiAgICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrRGF0ZSk7XG4gICAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQoaW1wb3J0YW50U3Rhcik7XG4gICAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQoZWRpdEljb25zKTtcbiAgICAgICAgdGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0Rpdik7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUJ1dHRvbihwcm9qZWN0VGFza3MpXG59XG5cblxuXG5cbmV4cG9ydCB7IGNyZWF0ZVRhc2tFdmVudHMsIHNob3dUYXNrcywgY3JlYXRlQnV0dG9uIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGFkZEV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vY3JlYXRpbmdQcm9qZWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVUYXNrRXZlbnRzIH0gZnJvbSBcIi4vY3JlYXRpbmdUYXNrXCJcblxuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuY3JlYXRlVGFza0V2ZW50cygpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9