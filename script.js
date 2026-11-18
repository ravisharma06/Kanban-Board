let taskData = {}

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const columns = [todo, progress, done]
const taskColumns = document.querySelectorAll(".task-column");
const toggleModal = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskBtn = document.querySelector("#add-task-btn");
let draggedTask = null;



function addTask(title, desc, column = todo) {
    const task = document.createElement("div")
    task.setAttribute("draggable", "true")
    task.classList.add("task")

    task.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}</p>
    <button>delete</button>
    `

    const deleteButton = task.querySelector("button")

    deleteButton.addEventListener("click", () => {
        task.remove()
        updateTask()
    })

    column.appendChild(task)
    task.addEventListener("drag", (e) => {
        draggedTask = task;
    })
}

function updateTask() {
    columns.forEach((col) => {

        const tasks = col.querySelectorAll(".task")
        const count = col.querySelector(".right")

        taskData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            }
        })

        localStorage.setItem("tasks", JSON.stringify(taskData))

        count.innerText = tasks.length


    })
}

if (localStorage.getItem("tasks")) {

    const data = JSON.parse(localStorage.getItem("tasks"))

    for (let col in data) {
        const column = document.querySelector(`#${col}`);

        data[col].forEach(t => {
            addTask(t.title, t.desc, column)

        })


        const tasks = column.querySelectorAll(".task")
        const count = column.querySelector(".right")

        count.innerText = tasks.length




    }
}


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
        column.appendChild(draggedTask)
        column.classList.remove("hover-over")



        updateTask()

    })




}


addDragOnColumn(todo)
addDragOnColumn(progress)
addDragOnColumn(done)


toggleModal.addEventListener("click", () => {
    modal.classList.toggle("active")
})

modalBg.addEventListener("click", () => {
    modal.classList.remove("active")
})



addTaskBtn.addEventListener("click", () => {

    const taskTitle = document.querySelector("#task-name").value
    const taskDescription = document.querySelector("#task-desc").value


    addTask(taskTitle, taskDescription)

    modal.classList.remove("active")

    updateTask()

    document.querySelector("#task-name").value = ""
    document.querySelector("#task-desc").value = ""


})