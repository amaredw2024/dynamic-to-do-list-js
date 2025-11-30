document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Add task function with optional param (for loading from localStorage)
    function addTask(taskTextParam, save = true) {
        const taskText = taskTextParam !== undefined ? taskTextParam : taskInput.value.trim();

        if (taskText === '') {
            if (taskTextParam === undefined) alert('Please enter a task!');
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        removeBtn.onclick = () => {
            taskList.removeChild(li);
            // Update localStorage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(t => t !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (taskTextParam === undefined) taskInput.value = '';

        // Save to localStorage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });

    // Load existing tasks on page load
    loadTasks();

    // Focus input on page load
    taskInput.focus();
});
