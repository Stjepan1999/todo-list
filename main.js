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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0Isd0JBQXdCOztBQUU1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOzs7QUFHQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6SkE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztVQ3BCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05zRDtBQUNMOztBQUVqRCxtRUFBaUI7QUFDakIsZ0VBQWdCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY3JlYXRpbmdQcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jcmVhdGluZ1Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBwcm9qZWN0SUQgPSAwO1xubGV0IGFsbFByb2plY3RzID0gW107XG5cblxuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3Qgc2hvd0Zvcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNyZWF0ZS1mb3JtLWJ1dHRvblwiKTtcbiAgICBzaG93Rm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY3JlYXRlRm9ybSgpKTtcblxuICAgIGNvbnN0IGNsb3NlRm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLmNsb3NlLWZvcm1cIik7XG4gICAgY2xvc2VGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjbG9zZUZvcm0oKSk7XG5cbiAgICBjb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24uYWRkLXByb2plY3RcIik7XG4gICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY3JlYXRlTmV3UHJvamVjdCgpKTtcblxuICAgIFxufVxuXG5mdW5jdGlvbiBDcmVhdGVQcm9qZWN0KHRpdGxlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGlkOiBwcm9qZWN0SUQrKyxcbiAgICAgICAgdGFza3M6IFtdXG4gICAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVOZXdQcm9qZWN0KCkge1xuICAgIGlmICh2YWxpZGF0ZUZvcm0oKSkge1xuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtdGl0bGVcIikudmFsdWU7XG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBDcmVhdGVQcm9qZWN0KHByb2plY3RUaXRsZSk7XG4gICAgICAgIGFsbFByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC10aXRsZVwiKS52YWx1ZSA9IFwiXCI7XG4gICAgICAgIGNsb3NlRm9ybSgpXG4gICAgICAgIHNob3dQcm9qZWN0cygpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChpZCkge1xuICAgIGxldCBpbmRleCA9IGFsbFByb2plY3RzLmZpbmRJbmRleChwcm9qZWN0ID0+IHByb2plY3QuaWQgPT09IGlkKTtcbiAgICBhbGxQcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHNob3dQcm9qZWN0cygpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGb3JtKCkge1xuICAgIGNvbnN0IGFkZFByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1mb3JtXCIpO1xuICAgIGFkZFByb2plY3RGb3JtLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbn1cblxuZnVuY3Rpb24gY2xvc2VGb3JtKCkge1xuICAgIGNvbnN0IGFkZFByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1mb3JtXCIpO1xuICAgIGFkZFByb2plY3RGb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVGb3JtKCkge1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC10aXRsZVwiKS52YWx1ZTtcbiAgICBpZiAocHJvamVjdFRpdGxlLmxlbmd0aCA8IDEgfHwgcHJvamVjdFRpdGxlLmxlbmd0aCA+IDIwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBzaG93UHJvamVjdHMoKSB7XG4gICAgbGV0IHByb2plY3RzTGlzdERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHMtbGlzdFwiKTtcbiAgICBwcm9qZWN0c0xpc3REaXYuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsUHJvamVjdHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcbiAgICAgICAgcHJvamVjdERpdi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gc2VsZWN0UHJvamVjdChwcm9qZWN0RGl2LCBhbGxQcm9qZWN0c1tpXS50aXRsZSkpXG5cbiAgICAgICAgY29uc3QgcHJvamVjdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICBwcm9qZWN0SWNvbi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1pY29uXCIpO1xuICAgICAgICBwcm9qZWN0SWNvbi5zcmMgPSBcIi4vaW1hZ2VzL3Byb2plY3QtaWNvbi5wbmdcIlxuICAgICAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByb2plY3RJY29uKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwcm9qZWN0VGl0bGUuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbGlzdC10aXRsZVwiKTtcbiAgICAgICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gYWxsUHJvamVjdHNbaV0udGl0bGVcbiAgICAgICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGUpXG5cbiAgICAgICAgY29uc3QgZWRpdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGVkaXRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImVkaXQtb3B0aW9uc1wiKTtcblxuICAgICAgICBjb25zdCBlZGl0SWNvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBlZGl0SWNvbnMuY2xhc3NMaXN0LmFkZChcImVkaXQtaWNvbnNcIilcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICAgICAgZG90LmNsYXNzTGlzdC5hZGQoXCJkb3RcIik7XG4gICAgICAgICAgICBlZGl0SWNvbnMuYXBwZW5kQ2hpbGQoZG90KVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uc0J1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBvcHRpb25zQnV0dG9ucy5jbGFzc0xpc3QuYWRkKFwib3B0aW9ucy1idXR0b25zXCIpXG5cbiAgICAgICAgY29uc3QgZGVsZXRlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGRlbGV0ZVByb2plY3RCdXR0b24uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1wcm9qZWN0LWJ1dHRvblwiKTtcbiAgICAgICAgZGVsZXRlUHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRlXCI7XG4gICAgICAgIGRlbGV0ZVByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGRlbGV0ZVByb2plY3QoYWxsUHJvamVjdHNbaV0uaWQpKVxuICAgICAgICBcbiAgICAgICAgY29uc3QgcmVuYW1lUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIHJlbmFtZVByb2plY3RCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlbmFtZS1wcm9qZWN0LWJ1dHRvblwiKTtcbiAgICAgICAgcmVuYW1lUHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUmVuYW1lXCI7XG4gICAgICAgIHJlbmFtZVByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHJlbmFtZVByb2plY3QoKSlcblxuICAgICAgICBvcHRpb25zQnV0dG9ucy5hcHBlbmRDaGlsZChkZWxldGVQcm9qZWN0QnV0dG9uKVxuICAgICAgICBvcHRpb25zQnV0dG9ucy5hcHBlbmRDaGlsZChyZW5hbWVQcm9qZWN0QnV0dG9uKVxuXG4gICAgICAgIGVkaXRDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdEljb25zKVxuICAgICAgICBlZGl0Q29udGFpbmVyLmFwcGVuZENoaWxkKG9wdGlvbnNCdXR0b25zKVxuXG4gICAgICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQoZWRpdENvbnRhaW5lcilcblxuICAgICAgICBwcm9qZWN0c0xpc3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdERpdilcblxuICAgICAgICBlZGl0Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBzaG93RWRpdE9wdGlvbnMoZWRpdENvbnRhaW5lcikpXG5cblxuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBzaG93RWRpdE9wdGlvbnMoZWRpdENvbnRhaW5lcikge1xuICAgIGNvbnN0IG9wdGlvbnNCdXR0b25zID0gZWRpdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLm9wdGlvbnMtYnV0dG9uc1wiKTtcblxuICAgIC8vIENsb3NlIGFsbCBvcGVuIG9wdGlvbnMgYmVmb3JlIHRvZ2dsaW5nIHRoZSBjdXJyZW50IG9uZVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52aXNpYmxlJykuZm9yRWFjaChjb250YWluZXIgPT4ge1xuICAgICAgICBpZiAoY29udGFpbmVyICE9PSBlZGl0Q29udGFpbmVyKSB7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgb3B0aW9uc0J1dHRvbnMuY2xhc3NMaXN0LnRvZ2dsZShcInZpc2libGVcIik7XG5cbiAgICAvLyBBZGQgYSBjbGljayBldmVudCBsaXN0ZW5lciB0byB0aGUgZG9jdW1lbnQgYm9keVxuICAgIC8vIElmIGNsaWNrZWQsIG9wdGlvbnMgYmVjb21lIGludmlzaWJsZVxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgb3B0aW9uc0J1dHRvbnMuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XG4gICAgICAgIH0pO1xuXG4gICAgZWRpdENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHNlbGVjdFByb2plY3QocHJvamVjdCwgcHJvamVjdFRpdGxlKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3RlZFwiKS5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XG4gICAgICAgIGlmKGNvbnRhaW5lciAhPT0gcHJvamVjdCkge1xuICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKVxuICAgICAgICB9XG4gICAgfSlcbiAgICBwcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKVxuXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlXCIpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdFRpdGxlXG59XG5cbmV4cG9ydCB7IGFkZEV2ZW50TGlzdGVuZXJzIH0iLCJsZXQgdGFza0lEID0gMDtcbmxldCBhbGxUYXNrcyA9IFtdO1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZVRhc2tFdmVudHMgKCkge1xuICAgIGNvbnN0IHNob3dGb3JtQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jcmVhdGUtdGFzay1idXR0b25cIilcbiAgICBzaG93Rm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gc2hvd0Zvcm0oKSlcblxuICAgIGNvbnN0IGNsb3NlRm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLmNsb3NlLXRhc2stZm9ybVwiKTtcbiAgICBjbG9zZUZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNsb3NlRm9ybSgpKVxufVxuXG5mdW5jdGlvbiBzaG93Rm9ybSgpIHtcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stZm9ybVwiKTtcbiAgICB0YXNrRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCJcbn1cblxuZnVuY3Rpb24gY2xvc2VGb3JtKCkge1xuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1mb3JtXCIpO1xuICAgIHRhc2tGb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxufVxuXG5cblxuZXhwb3J0IHsgY3JlYXRlVGFza0V2ZW50cyB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBhZGRFdmVudExpc3RlbmVycyB9IGZyb20gXCIuL2NyZWF0aW5nUHJvamVjdFwiO1xuaW1wb3J0IHsgY3JlYXRlVGFza0V2ZW50cyB9IGZyb20gXCIuL2NyZWF0aW5nVGFza1wiXG5cbmFkZEV2ZW50TGlzdGVuZXJzKClcbmNyZWF0ZVRhc2tFdmVudHMoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==