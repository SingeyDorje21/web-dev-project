let db;

document.addEventListener('DOMContentLoaded', () => {
    openDatabase();
    loadTasks();
});

function openDatabase() {
    let request = indexedDB.open('taskDB', 1);

    request.onupgradeneeded = function(e) {
        db = e.target.result;
        let objectStore = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('text', 'text', { unique: false });
        objectStore.createIndex('completed', 'completed', { unique: false });
    };

    request.onsuccess = function(e) {
        db = e.target.result;
        console.log('Database opened successfully');
    };

    request.onerror = function(e) {
        console.log('Error opening database:', e.target.errorCode);
    };
}

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

    let transaction = db.transaction(['tasks'], 'readwrite');
    let objectStore = transaction.objectStore('tasks');
    let request = objectStore.add(newTask);

    request.onsuccess = function() {
        createTaskElement(newTask);
        taskInput.value = "";
    };

    transaction.oncomplete = function() {
        console.log('Task added successfully');
    };

    transaction.onerror = function() {
        console.log('Error adding task');
    };
}

function loadTasks() {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';  // Clear the current list

    let transaction = db.transaction(['tasks'], 'readonly');
    let objectStore = transaction.objectStore('tasks');
    let request = objectStore.openCursor();

    request.onsuccess = function(e) {
        let cursor = e.target.result;
        if (cursor) {
            createTaskElement(cursor.value);
            cursor.continue();
        }
    };

    request.onerror = function(e) {
        console.log('Error loading tasks:', e.target.errorCode);
    };
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

            // Update task in database
            task.text = inputField.value;
            updateTask(task);
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

        // Update task completion status in database
        updateTask(task);
    };
    li.appendChild(completeBtn);

    taskList.appendChild(li);
}

function updateTask(task) {
    let transaction = db.transaction(['tasks'], 'readwrite');
    let objectStore = transaction.objectStore('tasks');
    let request = objectStore.put(task);

    request.onsuccess = function() {
        console.log('Task updated successfully');
    };

    transaction.onerror = function() {
        console.log('Error updating task');
    };
}

