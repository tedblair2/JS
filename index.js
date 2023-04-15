const taskTxt=document.querySelector(".top input")
const addTask=document.querySelector(".top button")
const tasksDiv=document.querySelector(".tasks")

addTask.onclick=()=>{
    let task=taskTxt.value
    if(task.length===0){
        alert("Please enter a task")
    }else{
        tasksDiv.innerHTML += `<div class="task">
                <span>${task}</span>
                <button class="delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            </div>`
        taskTxt.value=""
        let current_tasks=document.querySelectorAll(".tasks .task button")
        for(let i=0;i<current_tasks.length;i++){
            current_tasks[i].onclick=(e)=>{
                e.target.closest('.task').remove()
            }
        }
        let tasks=document.querySelectorAll(".tasks .task")
        tasks.forEach(item=>{
            item.onclick=()=>{
                item.classList.toggle("completed")
            }
        })
    }
}