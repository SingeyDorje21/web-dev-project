function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement('li');
    li.textContent = taskInput.value;

    // Add Edit button
    let editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.onclick = function() {
        let newTask = prompt("Edit your task:", li.textContent);
        if (newTask !== null && newTask.trim() !== "") {
            li.firstChild.textContent = newTask;
        }
    };
    li.appendChild(editBtn);

    // Add Complete button
    let completeBtn = document.createElement('button');
    completeBtn.textContent = "Complete";
    completeBtn.onclick = function() {
        li.classList.toggle('completed');
    };
    li.appendChild(completeBtn);

    taskList.appendChild(li);
    taskInput.value = "";
}
