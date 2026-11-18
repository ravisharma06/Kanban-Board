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


if (localStorage.getItem("tasks")) {

    const data = JSON.parse(localStorage.getItem("tasks"))

    for (let col in data) {
        const column = document.querySelector(`#${col}`);

        data[col].forEach(t => {
            const task = document.createElement("div")
            task.setAttribute("draggable", "true")
            task.classList.add("task")
            task.innerHTML = `
                          <h2>${t.title}</h2>
                          <p>${t.desc}</p>
                          <button>delete</button>`

            column.appendChild(task)


            task.addEventListener("drag", (e) => {
                draggedTask = task;
            })

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


    const task = document.createElement("div")
    task.setAttribute("draggable", "true")
    task.classList.add("task")

    task.innerHTML = `
    <h2>${taskTitle}</h2>
    <p>${taskDescription}</p>
    <button>delete</button>
    `

    task.addEventListener("drag", (e) => {
        draggedTask = task;
    })

    todo.appendChild(task)
    modal.classList.remove("active")

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



})