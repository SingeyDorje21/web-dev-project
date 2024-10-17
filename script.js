document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    let taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let newTask = {
        text: taskInput.value,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    createTaskElement(newTask);
    taskInput.value = "";
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

    let completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? "Completed" : "Complete";
    completeBtn.className = task.completed ? "completed-btn" : "complete-btn";
    
    completeBtn.onclick = function() {
        if (li.classList.contains('completed')) {
            li.classList.remove('completed');
            completeBtn.textContent = "Complete";
            completeBtn.className = "complete-btn";
            task.completed = false;

            let deleteBtn = li.querySelector('.delete-btn');
            if (deleteBtn) {
                deleteBtn.remove();
            }
        } else {
            li.classList.add('completed');
            completeBtn.textContent = "Completed";
            completeBtn.className = "completed-btn";
            task.completed = true;
            createDeleteButton(li);
        }
        updateTaskInLocalStorage(task);
    };
    li.appendChild(completeBtn);

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
