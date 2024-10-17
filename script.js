const taskForm = document.getElementById('todo-form');
const taskList = document.getElementById('task-list');
const taskNameInput = document.getElementById('task-name');
const dueDateInput = document.getElementById('due-date');
const categoryInput = document.getElementById('category');
const priorityInput = document.getElementById('priority');
const tagsInput = document.getElementById('tags');

taskForm.addEventListener('submit', addTask);

document.addEventListener('DOMContentLoaded', loadTasks);

function addTask(e) {
    e.preventDefault();
    const task = {
        id: Date.now(),
        name: taskNameInput.value,
        dueDate: dueDateInput.value,
        category: categoryInput.value,
        priority: priorityInput.value,
        tags: tagsInput.value.split(',').map(tag => tag.trim()),
        complete: false
    };

    saveTask(task);
    displayTask(task);
    taskForm.reset();
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => displayTask(task));
}

function displayTask(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.className = task.complete ? 'complete' : '';

    li.innerHTML = `
        <span>${task.name} - ${task.dueDate} - ${task.category} - ${task.priority}</span>
        <div>
            <button onclick="toggleComplete(${task.id})">Complete</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;
    taskList.appendChild(li);
}

function deleteTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    document.querySelector(`[data-id='${id}']`).remove();
}

function toggleComplete(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        if (task.id === id) {
            task.complete = !task.complete;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.querySelector(`[data-id='${id}']`).classList.toggle('complete');
}

function filterTasks(status) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';

    let filteredTasks = tasks;
    if (status === 'complete') {
        filteredTasks = tasks.filter(task => task.complete);
    } else if (status === 'pending') {
        filteredTasks = tasks.filter(task => !task.complete);
    }

    filteredTasks.forEach(task => displayTask(task));
}
