const taskinput = document.getElementById('task-input');
const addtaskbutton = document.getElementById('add-task-button');
const tasklist = document.getElementById('task-list');
const deltaskbutton = document.getElementById('del-task-button');

//localstorage function
const task = JSON.parse(localStorage.getItem("task")) || [];

//RenderList function
function renderList() {
    tasklist.innerHTML = "";
    task.forEach((taskitem, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskitem}</span>
            <button class="del" onclick = "deltask(${index})"><i class="fa-solid fa-xmark"></i></button>
            <button class="done" onclick = "donetask(${index})"><i class="fa-solid fa-check"></i></button>
            <button class="edit" onclick = "edittask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
        `;
        tasklist.appendChild(li);

    });
};

//edit task function
function edittask(index){
    const newTask = prompt("Edit your task:", task[index])
    if(newTask.trim() !== ""){  
        if(newTask.length > 50){
            alert("Task cannot exceed 50 characters!");
            edittask(index);
        } else {
            task[index] = newTask.trim();
            savetask();
            renderList();
        }      
    } else {
        alert("Task cannot be empty!");
        edittask(index);
    }
}

//Add task function
function addtask(){
    const taskvalue = taskinput.value.trim();
    if(taskvalue === "" || null) return alert ("please add a task");

    task.push(taskvalue);
    taskinput.value = "";

    savetask();
    renderList();
}

//Delete all tasks function
function delalltasks(){
    const confirmDelete = confirm("Are you sure you want to delete all tasks?");
    if (confirmDelete) {
        task.length = 0; 
        savetask();
        renderList();
    } else return alert ("Deletion cancelled.");    
}

//Done task function
function donetask(index){
    const current = task[index];

    if (typeof current !== 'string') return;

    if (current.endsWith(' ✔')) {
        task[index] = current.slice(0, -2);
    } else { 
        task[index] = current + ' ✔';
    }
    savetask();
    renderList();
}
//Delete task function
function deltask(index){
    task.splice(index, 1);
    savetask();
    renderList();
}

//Save task function
function savetask(){
    localStorage.setItem("task", JSON.stringify(task));
}

//Event listener
addtaskbutton.addEventListener("click", addtask);

deltaskbutton.addEventListener("click", delalltasks);

taskinput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addtask ();
});

renderList();