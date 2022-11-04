// Selectors
const clear = document.querySelector('.fa-refresh');
const dateElement = document.querySelector('.date');
const list = document.getElementById('todo-list');
const input = document.getElementById('itemInput');
// Class names
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'lineThrough';
// Date
const dateOptions = {weekday: 'long', month: 'short', day: 'numeric'};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('en-us', dateOptions);
// Variables
let taskList = [], id;
// Function to load data from localstorage
const loadList = (arr) => {
    arr.forEach((item) => {
        addTask(item.name, item.id, item.done, item.trash);
    });
};
// Function to add task
const addTask = (todo, id, done, trash) => {
    if(todo == ' ') {
        return;
    }
    if(trash) {return;}
    const finished = done ? check : uncheck;
    const line = done ? lineThrough : '';
    // Creating element using template literals
    const item = `
                    <li class="item">
                        <i class="fa ${finished}" job="complete" id=${id}></i>
                        <p class="text ${line}">${todo}</p>
                        <i class="fa fa-trash" job="delete" id=${id}></i>
                    </li>
                `
    // Inserting item to page
    list.insertAdjacentHTML('beforeend', item);
};
// Function to compelete task
const completeTask = (task) => {
    task.classList.toggle(check);
    task.classList.toggle(uncheck);
    task.parentNode.querySelector('.text').classList.toggle(lineThrough);
    taskList[task.id].done = taskList[task.id].done ? false : true;
};
// Function to remove task
const removeTask = (task) => {
    task.parentNode.parentNode.removeChild(task.parentNode);
    // taskList[task.id].tash = true;
};
// Load data from localstorage
let data = localStorage.getItem('Tasks');
if(data) {
    taskList = JSON.parse(data);
    id = taskList.length;
    loadList(taskList);
} else {
    taskList = [];
    id = 0;
}
// Adding event listener to click on li targeting the buttons
list.addEventListener('click', (e) => {
    const task = e.target;
    const taskJob = task.attributes.job.value;
    if(taskJob == 'complete') {
        completeTask(task);
    } else if(taskJob == 'delete') {
        removeTask(task);
    } else {
        return;
    }
    localStorage.setItem('Tasks', JSON.stringify(taskList));
});
// Adding event listener to keydown on enter press
document.addEventListener('keyup', (e) => {
    // Only run if key pressed was enter
    if(e.keyCode == 13) {
        // Set user input to variable
        const task = input.value;
        // If input wasnt empty run
        if(task) {
            // Run addtask function to create task
            addTask(task, id, false, false);
            // Add task to array
            taskList.push({
                name: task,
                id: id,
                done: false,
                trash: false
            });
            id++
            // Add taks to localstorage
            localStorage.setItem('Tasks', JSON.stringify(taskList));
        }
        // Reset input
        input.value = ' ';
    }
});
clear.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});