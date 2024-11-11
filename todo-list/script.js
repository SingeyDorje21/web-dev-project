document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    try {
        const taskList = document.getElementById('taskList');
        let tasks = [];
        
        try {
            const storedTasks = localStorage.getItem('tasks');
            tasks = storedTasks ? JSON.parse(storedTasks) : [];
            
            if (!Array.isArray(tasks)) {
                tasks = [];
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        } catch (e) {
            console.error('Error parsing tasks from localStorage:', e);
            tasks = [];
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        
        taskList.innerHTML = ''; // Clear existing list
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.setAttribute('data-index', index);
            li.innerHTML = `
                <span class="task-text ${task.completed ? 'completed' : ''}" 
                      contenteditable="true" 
                      onblur="updateTask(${index}, this.textContent)"
                      ${task.completed ? 'style="text-decoration: line-through;"' : ''}>${task.text}</span>
                <span class="due-date">${task.dueDate}</span>
                <button onclick="toggleComplete(${index})" class="complete-btn">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onclick="deleteTask(${index})" class="delete-btn">Delete</button>
            `;
            taskList.appendChild(li);
        });
    } catch (e) {
        console.error('Error loading tasks:', e);
    }
}

function updateTask(index, newText) {
    try {
        if (newText.trim() !== '') {
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks[index].text = newText.trim();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            loadTasks();
        }
    } catch (e) {
        console.error('Error updating task:', e);
    }
}

function toggleComplete(index) {
    try {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        // Update the DOM directly instead of reloading all tasks
        const taskSpan = document.querySelector(`li[data-index="${index}"] .task-text`);
        if (taskSpan) {
            taskSpan.classList.toggle('completed');
            taskSpan.style.textDecoration = tasks[index].completed ? 'line-through' : 'none';
            const completeBtn = taskSpan.parentElement.querySelector('.complete-btn');
            completeBtn.textContent = tasks[index].completed ? 'Undo' : 'Complete';
        }
    } catch (e) {
        console.error('Error toggling task completion:', e);
    }
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    try {
        // Get existing tasks
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        // Add new task
        tasks.push({
            text: taskInput.value.trim(),
            dueDate: dueDateInput.value,
            completed: false
        });
        
        // Save to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        // Reload tasks
        loadTasks();
        
        // Clear inputs
        taskInput.value = '';
        dueDateInput.value = '';
    } catch (e) {
        console.error('Error adding task:', e);
    }
}

function deleteTask(index) {
    try {
        // Get current tasks from localStorage
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        // Remove the task at the specified index
        tasks.splice(index, 1);
        
        // Save back to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        // Reload the tasks to refresh the display
        loadTasks();
    } catch (e) {
        console.error('Error deleting task:', e);
    }
}

function saveTasks() {
    try {
        const taskList = document.getElementById('taskList');
        const tasks = [];
        
        // Gather all tasks
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task-text').textContent,
                dueDate: li.querySelector('.due-date').textContent
            });
        });
        
        // Save to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
        console.error('Error saving tasks:', e);
    }
}

