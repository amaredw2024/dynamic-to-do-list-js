// Step 1: Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {

    // Step 2: Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 3: Define the addTask function
    function addTask() {
        // Retrieve and trim the input value
        const taskText = taskInput.value.trim();

        // Check if input is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return; // Stop the function if input is empty
        }

        // Step 4: Create a new task item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Assign click event to remove the task
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append the remove button to the task item
        li.appendChild(removeBtn);

        // Append the task item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Step 5: Attach event listeners

    // Click event for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // "Enter" key press event for the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});
