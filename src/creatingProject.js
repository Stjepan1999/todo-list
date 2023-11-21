let projectID = 0;
let allProjects = [];


function CreateProject(title) {
    return {
        title,
        id: projectID++,
        tasks: []
    }
}

function createNewProject(title) {
    const newProject = CreateProject(title);
    allProjects.push(newProject)
}

function deleteProject(id) {
    let index = allProjects.findIndex(project => project.id === id);
    allProjects.splice(index, 1)
}


export { createNewProject }