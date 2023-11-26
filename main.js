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
/* harmony export */   addEventListeners: () => (/* binding */ addEventListeners)
/* harmony export */ });
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
        document.getElementById("project-title").value = "";
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
        projectDiv.addEventListener("click", () => selectProject(projectDiv, allProjects[i].title))

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

function selectProject(project, projectTitle) {
    document.querySelectorAll(".selected").forEach(container => {
        if(container !== project) {
            container.classList.remove("selected")
        }
    })
    project.classList.add("selected")

    const title = document.querySelector(".title");
    title.textContent = projectTitle
}



/***/ }),

/***/ "./src/creatingTask.js":
/*!*****************************!*\
  !*** ./src/creatingTask.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTaskEvents: () => (/* binding */ createTaskEvents)
/* harmony export */ });
let taskID = 0;
let allTasks = [];


function createTaskEvents () {
    const showFormButton = document.querySelector(".create-task-button")
    showFormButton.addEventListener("click", () => showForm())

    const closeFormButton = document.querySelector(".button.close-task-form");
    closeFormButton.addEventListener("click", () => closeForm())

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
    const taskTitle = document.getElementById("task-title");
    const taskDescription = document.getElementById("task-description");
    const taskDate = document.getElementById("task-date");

    const newTask = CreateTask(taskTitle.value, taskDescription.value, taskDate.value);
    allTasks.push(newTask);
    taskTitle.value = "";
    taskDescription.value = "";
    taskDate.value = "";    
}

function showForm() {
    const taskForm = document.querySelector(".add-task-form");
    taskForm.style.display = "flex"
}

function closeForm() {
    const taskForm = document.querySelector(".add-task-form");
    taskForm.style.display = "none"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0Isd0JBQXdCOztBQUU1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOzs7QUFHQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6SkE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O1VDNUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnNEO0FBQ0w7O0FBRWpELG1FQUFpQjtBQUNqQixnRUFBZ0IsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jcmVhdGluZ1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NyZWF0aW5nVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHByb2plY3RJRCA9IDA7XG5sZXQgYWxsUHJvamVjdHMgPSBbXTtcblxuXG5mdW5jdGlvbiBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICBjb25zdCBzaG93Rm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3JlYXRlLWZvcm0tYnV0dG9uXCIpO1xuICAgIHNob3dGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjcmVhdGVGb3JtKCkpO1xuXG4gICAgY29uc3QgY2xvc2VGb3JtQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24uY2xvc2UtZm9ybVwiKTtcbiAgICBjbG9zZUZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNsb3NlRm9ybSgpKTtcblxuICAgIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbi5hZGQtcHJvamVjdFwiKTtcbiAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjcmVhdGVOZXdQcm9qZWN0KCkpO1xuXG4gICAgXG59XG5cbmZ1bmN0aW9uIENyZWF0ZVByb2plY3QodGl0bGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgaWQ6IHByb2plY3RJRCsrLFxuICAgICAgICB0YXNrczogW11cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5ld1Byb2plY3QoKSB7XG4gICAgaWYgKHZhbGlkYXRlRm9ybSgpKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC10aXRsZVwiKS52YWx1ZTtcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IENyZWF0ZVByb2plY3QocHJvamVjdFRpdGxlKTtcbiAgICAgICAgYWxsUHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXRpdGxlXCIpLnZhbHVlID0gXCJcIjtcbiAgICAgICAgY2xvc2VGb3JtKClcbiAgICAgICAgc2hvd1Byb2plY3RzKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0KGlkKSB7XG4gICAgbGV0IGluZGV4ID0gYWxsUHJvamVjdHMuZmluZEluZGV4KHByb2plY3QgPT4gcHJvamVjdC5pZCA9PT0gaWQpO1xuICAgIGFsbFByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgc2hvd1Byb2plY3RzKCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvcm0oKSB7XG4gICAgY29uc3QgYWRkUHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LWZvcm1cIik7XG4gICAgYWRkUHJvamVjdEZvcm0uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xufVxuXG5mdW5jdGlvbiBjbG9zZUZvcm0oKSB7XG4gICAgY29uc3QgYWRkUHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LWZvcm1cIik7XG4gICAgYWRkUHJvamVjdEZvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUZvcm0oKSB7XG4gICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXRpdGxlXCIpLnZhbHVlO1xuICAgIGlmIChwcm9qZWN0VGl0bGUubGVuZ3RoIDwgMSB8fCBwcm9qZWN0VGl0bGUubGVuZ3RoID4gMjApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIHNob3dQcm9qZWN0cygpIHtcbiAgICBsZXQgcHJvamVjdHNMaXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy1saXN0XCIpO1xuICAgIHByb2plY3RzTGlzdERpdi5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxQcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xuICAgICAgICBwcm9qZWN0RGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBzZWxlY3RQcm9qZWN0KHByb2plY3REaXYsIGFsbFByb2plY3RzW2ldLnRpdGxlKSlcblxuICAgICAgICBjb25zdCBwcm9qZWN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIHByb2plY3RJY29uLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWljb25cIik7XG4gICAgICAgIHByb2plY3RJY29uLnNyYyA9IFwiLi9pbWFnZXMvcHJvamVjdC1pY29uLnBuZ1wiXG4gICAgICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdEljb24pO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHByb2plY3RUaXRsZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1saXN0LXRpdGxlXCIpO1xuICAgICAgICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBhbGxQcm9qZWN0c1tpXS50aXRsZVxuICAgICAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByb2plY3RUaXRsZSlcblxuICAgICAgICBjb25zdCBlZGl0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZWRpdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZWRpdC1vcHRpb25zXCIpO1xuXG4gICAgICAgIGNvbnN0IGVkaXRJY29ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGVkaXRJY29ucy5jbGFzc0xpc3QuYWRkKFwiZWRpdC1pY29uc1wiKVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKykge1xuICAgICAgICAgICAgY29uc3QgZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBkb3QuY2xhc3NMaXN0LmFkZChcImRvdFwiKTtcbiAgICAgICAgICAgIGVkaXRJY29ucy5hcHBlbmRDaGlsZChkb3QpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcHRpb25zQnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG9wdGlvbnNCdXR0b25zLmNsYXNzTGlzdC5hZGQoXCJvcHRpb25zLWJ1dHRvbnNcIilcblxuICAgICAgICBjb25zdCBkZWxldGVQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3QtYnV0dG9uXCIpO1xuICAgICAgICBkZWxldGVQcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gXCJEZWxldGVcIjtcbiAgICAgICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZGVsZXRlUHJvamVjdChhbGxQcm9qZWN0c1tpXS5pZCkpXG4gICAgICAgIFxuICAgICAgICBjb25zdCByZW5hbWVQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgcmVuYW1lUHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmVuYW1lLXByb2plY3QtYnV0dG9uXCIpO1xuICAgICAgICByZW5hbWVQcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gXCJSZW5hbWVcIjtcbiAgICAgICAgcmVuYW1lUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gcmVuYW1lUHJvamVjdCgpKVxuXG4gICAgICAgIG9wdGlvbnNCdXR0b25zLmFwcGVuZENoaWxkKGRlbGV0ZVByb2plY3RCdXR0b24pXG4gICAgICAgIG9wdGlvbnNCdXR0b25zLmFwcGVuZENoaWxkKHJlbmFtZVByb2plY3RCdXR0b24pXG5cbiAgICAgICAgZWRpdENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0SWNvbnMpXG4gICAgICAgIGVkaXRDb250YWluZXIuYXBwZW5kQ2hpbGQob3B0aW9uc0J1dHRvbnMpXG5cbiAgICAgICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChlZGl0Q29udGFpbmVyKVxuXG4gICAgICAgIHByb2plY3RzTGlzdERpdi5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KVxuXG4gICAgICAgIGVkaXRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHNob3dFZGl0T3B0aW9ucyhlZGl0Q29udGFpbmVyKSlcblxuXG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIHNob3dFZGl0T3B0aW9ucyhlZGl0Q29udGFpbmVyKSB7XG4gICAgY29uc3Qgb3B0aW9uc0J1dHRvbnMgPSBlZGl0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIub3B0aW9ucy1idXR0b25zXCIpO1xuXG4gICAgLy8gQ2xvc2UgYWxsIG9wZW4gb3B0aW9ucyBiZWZvcmUgdG9nZ2xpbmcgdGhlIGN1cnJlbnQgb25lXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZpc2libGUnKS5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XG4gICAgICAgIGlmIChjb250YWluZXIgIT09IGVkaXRDb250YWluZXIpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBvcHRpb25zQnV0dG9ucy5jbGFzc0xpc3QudG9nZ2xlKFwidmlzaWJsZVwiKTtcblxuICAgIC8vIEFkZCBhIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBkb2N1bWVudCBib2R5XG4gICAgLy8gSWYgY2xpY2tlZCwgb3B0aW9ucyBiZWNvbWUgaW52aXNpYmxlXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBvcHRpb25zQnV0dG9ucy5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcbiAgICAgICAgfSk7XG5cbiAgICBlZGl0Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc2VsZWN0UHJvamVjdChwcm9qZWN0LCBwcm9qZWN0VGl0bGUpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdGVkXCIpLmZvckVhY2goY29udGFpbmVyID0+IHtcbiAgICAgICAgaWYoY29udGFpbmVyICE9PSBwcm9qZWN0KSB7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHByb2plY3QuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpXG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGVcIik7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0VGl0bGVcbn1cblxuZXhwb3J0IHsgYWRkRXZlbnRMaXN0ZW5lcnMgfSIsImxldCB0YXNrSUQgPSAwO1xubGV0IGFsbFRhc2tzID0gW107XG5cblxuZnVuY3Rpb24gY3JlYXRlVGFza0V2ZW50cyAoKSB7XG4gICAgY29uc3Qgc2hvd0Zvcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNyZWF0ZS10YXNrLWJ1dHRvblwiKVxuICAgIHNob3dGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBzaG93Rm9ybSgpKVxuXG4gICAgY29uc3QgY2xvc2VGb3JtQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24uY2xvc2UtdGFzay1mb3JtXCIpO1xuICAgIGNsb3NlRm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY2xvc2VGb3JtKCkpXG5cbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24uYWRkLXRhc2tcIik7XG4gICAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY3JlYXRlTmV3VGFzaygpKVxufVxuXG5mdW5jdGlvbiBDcmVhdGVUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGlkOiB0YXNrSUQrKyxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBkYXRlXG4gICAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVOZXdUYXNrKCkge1xuICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay10aXRsZVwiKTtcbiAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZGVzY3JpcHRpb25cIik7XG4gICAgY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZGF0ZVwiKTtcblxuICAgIGNvbnN0IG5ld1Rhc2sgPSBDcmVhdGVUYXNrKHRhc2tUaXRsZS52YWx1ZSwgdGFza0Rlc2NyaXB0aW9uLnZhbHVlLCB0YXNrRGF0ZS52YWx1ZSk7XG4gICAgYWxsVGFza3MucHVzaChuZXdUYXNrKTtcbiAgICB0YXNrVGl0bGUudmFsdWUgPSBcIlwiO1xuICAgIHRhc2tEZXNjcmlwdGlvbi52YWx1ZSA9IFwiXCI7XG4gICAgdGFza0RhdGUudmFsdWUgPSBcIlwiOyAgICBcbn1cblxuZnVuY3Rpb24gc2hvd0Zvcm0oKSB7XG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLWZvcm1cIik7XG4gICAgdGFza0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiXG59XG5cbmZ1bmN0aW9uIGNsb3NlRm9ybSgpIHtcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stZm9ybVwiKTtcbiAgICB0YXNrRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbn1cblxuXG5cbmV4cG9ydCB7IGNyZWF0ZVRhc2tFdmVudHMgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgYWRkRXZlbnRMaXN0ZW5lcnMgfSBmcm9tIFwiLi9jcmVhdGluZ1Byb2plY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVRhc2tFdmVudHMgfSBmcm9tIFwiLi9jcmVhdGluZ1Rhc2tcIlxuXG5hZGRFdmVudExpc3RlbmVycygpXG5jcmVhdGVUYXNrRXZlbnRzKCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=