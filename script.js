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

    // Add Complete/Uncomplete button
    let completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? "Completed" : "Complete";
    completeBtn.className = task.completed ? "completed-btn" : "complete-btn";
    
    // Toggle between completed and uncompleted states
    completeBtn.onclick = function() {
        if (li.classList.contains('completed')) {
            // Uncomplete the task
            li.classList.remove('completed');
            completeBtn.textContent = "Complete";
            completeBtn.className = "complete-btn";
            task.completed = false; // Update completed status
            
            // Remove the delete button if it exists
            let deleteBtn = li.querySelector('.delete-btn');
            if (deleteBtn) {
                deleteBtn.remove();
            }
        } else {
            // Complete the task
            li.classList.add('completed');
            completeBtn.textContent = "Completed";
            completeBtn.className = "completed-btn";
            task.completed = true; // Update completed status
            createDeleteButton(li); // Create delete button when task is completed
        }
        updateTaskInLocalStorage(task); // Update task in localStorage
    };
    li.appendChild(completeBtn);

    // Add delete button if task is already completed
    if (task.completed) {
        createDeleteButton(li);
    }

    taskList.appendChild(li);  // Append the task to the task list
}

function createDeleteButton(taskItem) {
    // Only create a delete button if it doesn't already exist
    if (!taskItem.querySelector('.delete-btn')) {
        // Create Delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() {
            deleteTask(taskItem);
        };
        taskItem.appendChild(deleteBtn); // Add delete button to the task item
    }
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
