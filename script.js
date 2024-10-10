document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    let taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    // Create a new task object
    let newTask = {
        text: taskInput.value,
        completed: false
    };

    // Get existing tasks from localStorage or initialize an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask); // Add the new task to the array
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save back to localStorage

    createTaskElement(newTask); // Add task to the display
    taskInput.value = ""; // Clear the input field
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task)); // Render all tasks
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

    // Add Complete button
    let completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? "Completed" : "Complete";
    completeBtn.className = task.completed ? "completed-btn" : "complete-btn";
    completeBtn.onclick = function() {
        if (!li.classList.contains('completed')) {
            li.classList.add('completed');
            completeBtn.textContent = "Completed";
            completeBtn.className = "completed-btn";
            task.completed = true; // Update completed status
            createDeleteButton(li); // Add delete button
        }
        updateTaskInLocalStorage(task); // Update task in localStorage
    };
    li.appendChild(completeBtn);

    taskList.appendChild(li);  // Append the task to the task list
}

function createDeleteButton(taskItem) {
    // Create Delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function() {
        deleteTask(taskItem);
    };
    taskItem.appendChild(deleteBtn); // Add delete button to the task item
}

function deleteTask(taskItem) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Remove the task item from the list and localStorage
    taskItem.remove();
    tasks = tasks.filter(task => task.text !== taskItem.querySelector('span').textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Update localStorage
}

function updateTaskInLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Update the task's completion status
    tasks = tasks.map(t => t.text === task.text ? task : t);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save back to localStorage
}
