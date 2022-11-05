// Selectors
const clear = document.querySelector('.fa-refresh');
const dateElement = document.querySelector('.date');
const list = document.getElementById('todo-list');
const input = document.getElementById('itemInput');
const taskBtn = document.querySelector('.fa-plus-circle');
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
    if(trash) {return;}
    if(todo == ' ') {
        return;
    }
    const finished = done ? check : uncheck;
    const line = done ? lineThrough : '';
    // Creating element using template literals
    const item = `
                    <li class="item">
                        <i class="fa ${finished} taskId" job="complete" id=${id}></i>
                        <p class="text ${line}">${todo}</p>
                        <i class="fa fa-trash" job="delete" id=${id}></i>
                    </li>
                `
    // Inserting item to page
    list.insertAdjacentHTML('beforeend', item);
};
// Load data from localstorage
let data = localStorage.getItem('Tasks');
// Only load data if their is data
if(data) {
    // Parse the data
    taskList = JSON.parse(data);
    // Set id = to length of data
    id = taskList.length;
    // Run load function
    loadList(taskList);
    // If no data set run
} else {
    taskList = [];
    id = 0;
}

// Function to remove task
const removeTask = (task) => {
    // Get text content of task
    const taskName = task.parentNode.querySelector('.text').textContent;
    const el = task.parentNode.querySelector('.taskId');
    const taskId = el.getAttribute('id');
    // Set task object trash field to true
    // taskList[taskId].tash = true;
    // Remove task
    const newList = taskList.filter(task => {
        return task.id !== taskId && task.name !== taskName;
    });
    // Update localstorage with updated tasks
    localStorage.setItem('Tasks', JSON.stringify(newList));
    task.parentNode.parentNode.removeChild(task.parentNode);
};
// Function to compelete task
const completeTask = (task) => {
    const taskName = task.parentNode.querySelector('.text').textContent;
    const taskIndex = taskList.findIndex(el => {
        return el.name === taskName;
    });
    console.log(taskIndex);
    // Toggle classes
    task.classList.toggle(check);
    task.classList.toggle(uncheck);
    task.parentNode.querySelector('.text').classList.toggle(lineThrough);
    // Change task object done field to true or false
    taskList[taskIndex].done = taskList[taskIndex].done ? false : true;
    localStorage.setItem('Tasks', JSON.stringify(taskList));
};


// Adding event listener to click on li targeting the buttons
list.addEventListener('click', (e) => {
    e.preventDefault();
    // Set task to clicked element
    const task = e.target;
    // Get task tag attribute
    const taskJob = task.attributes.job.value;
    // If clicked element has complete attriute run
    if(taskJob == 'complete') {
        // Run complete task function
        completeTask(task);
        // If clicked element has delete attribute run
    } else if(taskJob == 'delete') {
        // Run removetask function
        removeTask(task);
        // Else return
    } else {
        return;
    }
});
// Adding event listener to keydown on enter press
document.addEventListener('keyup', (e) => {
    // Only run if key pressed was enter
    if(e.keyCode == 13) {
        // Set user input to variable
        const task = input.value;
        // If input wasnt empty run
        if(task != ' ') {
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
    input.value = ' ';

});
taskBtn.addEventListener('click', () => {
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
})