const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const taskColumns = document.querySelectorAll(".task-column");


let draggedTask = null;

const tasks = document.querySelectorAll(".task");


tasks.forEach((task) => {
    task.addEventListener("drag", (e) => {
        // console.log("dragging", e)
        draggedTask = task;
    })
})


function addDragOnColumn(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault()
        column.classList.add("hover-over")
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault()
        column.classList.remove("hover-over")
    })


    column.addEventListener("dragover", (e) => {
        e.preventDefault()
    })


    column.addEventListener("drop", (e) => {
        e.preventDefault()
        console.log("dropped",draggedTask,column)
        column.appendChild(draggedTask)
        column.classList.remove("hover-over")
    })



}


addDragOnColumn(todo)
addDragOnColumn(progress)
addDragOnColumn(done)



