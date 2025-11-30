// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 1: Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again to Local Storage
    }

    // Step 2: Add a task to the list
    // `save` parameter determines whether to update Local Storage
    function addTask(taskTextParam, save = true) {
        // Determine task text (either from input or parameter)
        const taskText = taskTextParam !== undefined ? taskTextParam : taskInput.value.trim();

        // Prevent adding empty tasks
        if (taskText === "") {
            if (taskTextParam === undefined) alert("Please enter a task!");
            return;
        }

        // Create new task element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task from DOM and Local Storage when clicked
        removeBtn.onclick = function () {
            taskList.removeChild(li);

            // Update Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(t => t !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        // Append remove button to task item and task item to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field if task was added from input
        if (taskTextParam === undefined) taskInput.value = '';

        // Save to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Step 3: Attach event listeners

    // Click event for Add Task button
    addButton.addEventListener('click', () => addTask());

    // Enter key press in input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') addTask();
    });

    // Step 4: Load tasks on page load
    loadTasks();

});
