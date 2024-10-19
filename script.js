document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    let taskInput = document.getElementById('taskInput');
    let dueDateInput = document.getElementById('dueDateInput');

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let newTask = {
        text: taskInput.value,
        completed: false,
        dueDate: dueDateInput.value
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    createTaskElement(newTask);
    taskInput.value = "";
    dueDateInput.value = ""; 
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task));
}

function createTaskElement(task) {
    let taskList = document.getElementById('taskList');
    let li = document.createElement('li');

    let taskTextElement = document.createElement('span');
    taskTextElement.textContent = task.text;
    if (task.completed) {
        li.classList.add('completed');
    }
    li.appendChild(taskTextElement);

    if (task.dueDate) {
        let dueDateElement = document.createElement('small');
        dueDateElement.textContent = ` (Due: ${task.dueDate})`;
        taskTextElement.appendChild(dueDateElement);

        checkIfOverdue(task, li);
    }

    let completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? "Completed" : "Complete";
    completeBtn.className = task.completed ? "completed-btn" : "complete-btn";

    completeBtn.onclick = function() {
        task.completed = !task.completed;
        if (task.completed) {
            li.classList.add('completed');
            completeBtn.textContent = "Completed";
            completeBtn.className = "completed-btn";
            createDeleteButton(li);
        } else {
            li.classList.remove('completed');
            completeBtn.textContent = "Complete";
            completeBtn.className = "complete-btn";
            let deleteBtn = li.querySelector('.delete-btn');
            if (deleteBtn) {
                deleteBtn.remove();
            }
        }
        updateTaskInLocalStorage(task);
    };
    li.appendChild(completeBtn);

    let editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";

    editBtn.onclick = function() {
        editTask(li, task);
    };
    li.appendChild(editBtn);

    if (task.completed) {
        createDeleteButton(li);
    }

    taskList.appendChild(li);
}

function createDeleteButton(taskItem) {
    if (!taskItem.querySelector('.delete-btn')) {
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() {
            deleteTask(taskItem);
        };
        taskItem.appendChild(deleteBtn);
    }
}

function deleteTask(taskItem) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskItem.remove();
    tasks = tasks.filter(task => task.text !== taskItem.querySelector('span').textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(t => t.text === task.text ? task : t);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(taskItem, task) {
    let taskTextElement = taskItem.querySelector('span');
    let input = document.createElement('input');
    input.type = 'text';
    input.value = task.text;
    taskItem.replaceChild(input, taskTextElement);

    input.onblur = function() {
        task.text = input.value;
        updateTaskInLocalStorage(task);
        taskItem.replaceChild(taskTextElement, input);
        taskTextElement.textContent = task.text;

        if (task.dueDate) {
            let dueDateElement = taskTextElement.querySelector('small');
            if (dueDateElement) {
                dueDateElement.textContent = ` (Due: ${task.dueDate})`;
            }
        }
    };

    input.focus();
}

function checkIfOverdue(task, taskItem) {
    let currentDate = new Date();
    let dueDate = new Date(task.dueDate);
    
    if (dueDate && dueDate < currentDate && !task.completed) {
        taskItem.classList.add('overdue');
    }
}
