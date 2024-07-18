 // Run the script after the DOM has fully loaded
        document.addEventListener('DOMContentLoaded', function () {
            const addButton = document.getElementById('add-task-btn');
            const taskInput = document.getElementById('task-input');
            const taskList = document.getElementById('task-list');

            // Function to add a task
            function addTask() {
                const taskText = taskInput.value.trim();

                // Check if the task input is not empty
                if (taskText === "") {
                    alert('Please enter a task.');
                    return;
                }

                // Create a new list item
                const li = document.createElement('li');
                li.textContent = taskText;

                // Create a remove button for the task
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.className = 'remove-btn';

                // Remove the task when the remove button is clicked
                removeBtn.onclick = function() {
                    taskList.removeChild(li);
                };

                // Append the remove button to the list item and the list item to the task list
                li.appendChild(removeBtn);
                taskList.appendChild(li);

                // Clear the task input field
                taskInput.value = '';
            }

            // Add event listener to the Add Task button
            addButton.addEventListener('click', addTask);

            // Add event listener to the task input field for the Enter key
            taskInput.addEventListener('keypress', function (event) {
                if (event.key === 'Enter') {
                    addTask();
                }
            });

            // Add task function is called on DOMContentLoaded to ensure data fetching logic runs once the HTML document has fully loaded
            addTask();
        });