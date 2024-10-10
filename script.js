function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement('li');

    // Task text
    let taskText = document.createElement('span');
    taskText.textContent = taskInput.value;
    taskText.classList.add('task-text');
    li.appendChild(taskText);

    // Add Edit button
    let editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.onclick = function() {
        let inputField = document.createElement('input');
        inputField.value = taskText.textContent;
        li.replaceChild(inputField, taskText);

        // Change edit button to save button
        editBtn.textContent = "Save";
        editBtn.onclick = function() {
            taskText.textContent = inputField.value;
            li.replaceChild(taskText, inputField);
            editBtn.textContent = "Edit";
            editBtn.onclick = editTask;
        };
    };
    li.appendChild(editBtn);

    // Add Complete button
    let completeBtn = document.createElement('button');
    completeBtn.textContent = "Complete";
    completeBtn.className = "complete-btn";
    completeBtn.onclick = function() {
        if (!li.classList.contains('completed')) {
            li.classList.add('completed');
            completeBtn.textContent = "Completed";
            completeBtn.className = "completed-btn";
        } else {
            li.classList.remove('completed');
            completeBtn.textContent = "Complete";
            completeBtn.className = "complete-btn";
        }
    };
    li.appendChild(completeBtn);

    taskList.appendChild(li);
    taskInput.value = "";
}
