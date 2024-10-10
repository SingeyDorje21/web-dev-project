document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const taskText = taskInput.value;
    const task = {
        text: taskText,
        completed: false
    };

    createTaskElement(task);
    saveTaskToLocalStorage(task);

    taskInput.value = "";
}

function createTaskElement(task) {
    let taskList = document.getElementById('taskList');
    let li = document.createElement('li');

    // Task text
    let taskTextElement = document.createElement('span');
    taskTextElement.textContent = task.text;
    if (task.completed) {
        li.classList.add('completed');
    }
    li.appendChild(taskTextElement);

    // Add Edit button
    let editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.onclick = function() {
        let inputField = document.createElement('input');
        inputField.value = taskTextElement.textContent;
        li.replaceChild(inputField, taskTextElement);

        // Change edit button to save button
        editBtn.textContent = "Save";
        editBtn.onclick = function() {
            taskTextElement.textContent = inputField.value;
            li.replaceChild(taskTextElement, inputField);
            editBtn.textContent = "Edit";
            task.text = inputField.value;
            updateLocalStorage();
        };
    };
    li.appendChild(editBtn);

    // Add Complete button
    let completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? "Completed" : "Complete";
    completeBtn.className = task.completed ? "completed-btn" : "complete-btn";
    completeBtn.onclick = function() {
        if (!li.classList.contains('completed')) {
            li.classList.add('completed');
            completeBtn.textContent = "Completed";
            completeBtn.className = "completed-btn";
            task.completed = true;
        } else {
            li.classList.remove('completed');
            completeBtn.textContent = "Complete";
            completeBtn.className = "complete-btn";
            task.completed = false;
        }
        updateLocalStorage();
    };
    li.appendChild(completeBtn);

    taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task);
    });
}

// Update localStorage when tasks are edited or completed
function updateLocalStorage() {
    let taskList = document.querySelectorAll('#taskList li');
    let tasks = [];
    taskList.forEach(li => {
        let taskText = li.querySelector('span').textContent;
        let completed = li.classList.contains('completed');
        tasks.push({ text: taskText, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
