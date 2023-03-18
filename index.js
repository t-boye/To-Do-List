// Select the necessary DOM elements
const form = document.querySelector('form');
const taskInput = document.querySelector('#new-task-input');
const taskList = document.querySelector('#task-list');
const noTasks = document.querySelector('.no-tasks');
const totalCount = document.querySelector('.total-count');
const completedCount = document.querySelector('.completed-count');
const remainingCount = document.querySelector('.remaining-count');

form.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the value of the task input field
    const taskText = taskInput.value.trim();

    // Only add the task if the input field is not empty
    if (taskText !== '') {
        // Create a new task item
        const newTask = document.createElement('li');
        newTask.innerHTML = `
      <input type="checkbox" class="task-checkbox">
      <label class="task-label">${taskText}</label>
      <div>
        <button class="delete">Delete</button>
        <button class="edit">Edit</button>
      </div>
    `;

        // Add event listeners to the "Edit" and "Delete" buttons
        const deleteButton = newTask.querySelector('.delete');
        deleteButton.addEventListener('click', () => {
            newTask.remove();
            updateTaskCount();
        });

        const editButton = newTask.querySelector('.edit');
        editButton.addEventListener('click', () => {
            const label = newTask.querySelector('.task-label');
            const input = document.createElement('input');
            input.type = 'text';
            input.value = label.innerText;
            newTask.insertBefore(input, label);
            label.remove();
            input.focus();
            editButton.innerText = 'Save';
            editButton.addEventListener('click', () => {
                const newTaskText = input.value.trim();
                if (newTaskText !== '') {
                    label.innerText = newTaskText;
                }
                input.remove();
                editButton.innerText = 'Edit';
                updateTaskCount();
            }, { once: true });
        });

        // Add the new task to the task list
        taskList.appendChild(newTask);

        // Clear the task input field
        taskInput.value = '';

        // Update the total count and remaining count
        updateTaskCount();
    }
});


function addTask(event) {
    event.preventDefault();

    // Get the value of the task input
    const taskText = taskInput.value.trim();

    // Check if the task input is empty
    if (!taskText) {
        return;
    }

    // Create a new task element
    const taskElement = document.createElement("li");
    taskElement.setAttribute("data-task-id", Date.now());
    taskElement.innerHTML = `
    <input type="checkbox" id="task${Date.now()}" class="task-checkbox">
    <label for="task${Date.now()}" class="task-label">${taskText}</label>
    <div>
      <button class="delete">Delete</button>
      <button class="edit">Edit</button>
    </div>
  `;

    // Add the new task element to the task list
    taskList.appendChild(taskElement);

    // Set focus on the checkbox for the newly added task
    taskElement.querySelector(".task-checkbox").focus();

    // Add the new task to the tasks array
    tasks.push({
        id: taskElement.getAttribute("data-task-id"),
        text: taskText,
        completed: false,
        priority: "low",
    });

    // Update the UI
    updateUI();

    // Reset the task input
    taskInput.value = "";

}


// Call the init function when the page is loaded
window.addEventListener("load", init);




// Define an array to store the tasks
let tasks = [];

// Define a function to create a new task
function createTask(taskName, priority) {
    // Create a new task object
    const task = {
        id: tasks.length + 1,
        name: taskName,
        priority: priority,
        completed: false
    };

    // Add the task to the tasks array
    tasks.push(task);

    // Create a new task DOM element
    const li = document.createElement('li');
    li.setAttribute('id', `task-${task.id}`);
    li.setAttribute('data-priority', priority);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `task${task.id}`);
    checkbox.classList.add('task-checkbox');

    const label = document.createElement('label');
    label.setAttribute('for', `task${task.id}`);
    label.classList.add('task-label');
    label.innerText = taskName;

    const buttonContainer = document.createElement('div');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.innerText = 'Delete';

    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.innerText = 'Edit';

    // Append the DOM elements to the new task element
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(editButton);

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(buttonContainer);

    // Append the new task element to the task list
    taskList.appendChild(li);

    // Update the task count
    updateTaskCount();
}

// Define a function to update the task count
function updateTaskCount() {
    // Update the total count
    totalCount.innerText = `Total: ${tasks.length}`;

    // Calculate the completed count and remaining count
    let completedCountValue = 0;
    tasks.forEach((task) => {
        if (task.completed) {
            completedCountValue++;
        }
    });
    completedCount.innerText = `Completed: ${completedCountValue}`;
    remainingCount.innerText = `Remaining: ${tasks.length - completedCountValue}`;

    // Show or hide the "No tasks to show" message
    if (tasks.length === 0) {
        noTasks.style.display = 'block';
    } else {
        noTasks.style.display = 'none';
    }
}

// Define a function to delete a task
function deleteTask(taskId) {
    // Remove the task from the tasks array
    tasks = tasks.filter((task) => task.id !== taskId);

    // Remove the task element from the task list
    const taskElement = document.querySelector(`#task-${taskId}`);
    taskList.removeChild(taskElement);
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const taskId = button.dataset.taskId;
            deleteTask(taskId);
        });
    });
    // Update the task count
    updateTaskCount();
}

function setupEventListeners() {
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const taskId = button.dataset.taskId;
            deleteTask(taskId);
        });
    });
}
// Define a function to toggle the completed state of a task
function toggleCompleted(taskId) {
    // Find the task in the tasks array
    const task = tasks.find((task) => task.id === taskId);

    // Toggle the completed state
    task.completed = !task.completed;

    // Update the task count
    updateTaskCount();

    // Save the updated tasks array to local storage
    saveTasksToLocalStorage();

    // Re-render the task list
    renderTaskList();
}

function editTask(taskId) {
    // Find the task in the tasks array
    const task = tasks.find((task) => task.id === taskId);

    // Get the task label element
    const taskLabelElement = document.querySelector(`label[for="${taskId}"]`);

    // Create a new input element with the current task label as its value
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.value = task.label;

    // Replace the task label with the new input element
    taskLabelElement.replaceWith(taskInput);

    // Focus the input element
    taskInput.focus();

    // Add an event listener to save the edited task when the input loses focus
    taskInput.addEventListener("blur", () => {
        // Update the task label in the tasks array
        task.label = taskInput.value;
        // Update the task label in the DOM
        const newTaskLabelElement = document.createElement("label");
        newTaskLabelElement.setAttribute("for", taskId);
        newTaskLabelElement.classList.add("task-label");
        newTaskLabelElement.textContent = task.label;
        taskInput.replaceWith(newTaskLabelElement);

        // Save the updated tasks array to local storage
        saveTasksToLocalStorage();
    });

}

// Get all delete buttons and add event listeners to them
const deleteButtons = document.querySelectorAll(".delete-button");
deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const taskId = button.dataset.taskId;
        deleteTask(taskId);
    });
});

// Get all edit buttons and add event listeners to them
const editButtons = document.querySelectorAll(".edit-button");
editButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const taskId = button.dataset.taskId;
        editTask(taskId);
    });
});

function updateTaskCount() {
    // Update the total count
    totalCount.innerText = `Total: ${taskList.children.length}`;

    // Calculate the completed count and remaining count
    let completedCountValue = 0;
    let remainingCountValue = 0;
    for (let i = 0; i < taskList.children.length; i++) {
        const checkbox = taskList.children[i].querySelector('.task-checkbox');
        if (checkbox.checked) {
            completedCountValue++;
        } else {
            remainingCountValue++;
        }
    }
    completedCount.innerText = `Completed: ${completedCountValue}`;
    remainingCount.innerText = `Remaining: ${remainingCountValue}`;

    // Show or hide the "No tasks to show" message
    if (taskList.children.length === 0) {
        noTasks.style.display = 'block';
    } else {
        noTasks.style.display = 'none';
    }
}

function renderTaskList() {
    // Get the task list element
    const taskListElement = document.getElementById("task-list");

    // Clear the task list
    taskListElement.innerHTML = "";

    // Create a new task list item for each task
    tasks.forEach((task) => {
        // Create the task checkbox element
        const taskCheckboxElement = document.createElement("input");
        taskCheckboxElement.type = "checkbox";
        taskCheckboxElement.id = task.id;
        taskCheckboxElement.checked = task.completed;
        taskCheckboxElement.classList.add("task-checkbox");

        // Add an event listener to toggle the completed state of the task
        taskCheckboxElement.addEventListener("change", () => {
            toggleCompleted(task.id);
        });

        // Create the task label element
        const taskLabelElement = document.createElement("label");
        taskLabelElement.setAttribute("for", task.id);
        taskLabelElement.classList.add("task-label");
        taskLabelElement.textContent = task.label;

        // Create the task actions container
        const taskActionsContainer = document.createElement("div");
        taskActionsContainer.classList.add("task-actions");

        // Create the edit task button
        const editTaskButton = document.createElement("button");
        editTaskButton.classList.add("edit-task-button");
        editTaskButton.textContent = "Edit";
        editTaskButton.addEventListener("click", () => {
            editTask(task.id);
        });

        // Create the delete task button
        const deleteTaskButton = document.createElement("button");
        deleteTaskButton.classList.add("delete-task-button");
        deleteTaskButton.textContent = "Delete";
        deleteTaskButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        // Add the task checkbox, task label, and task actions to the task list item
        taskActionsContainer.appendChild(editTaskButton);
        taskActionsContainer.appendChild(deleteTaskButton);
        const taskListItem = document.createElement("li");
        taskListItem.classList.add("task-list-item");
        taskListItem.appendChild(taskCheckboxElement);
        taskListItem.appendChild(taskLabelElement);
        taskListItem.appendChild(taskActionsContainer);

        // Add the task list item to the task list
        taskListElement.appendChild(taskListItem);
    });

    // Update the task count
    updateTaskCount();

    // Show or hide the "No tasks to show" message depending on whether there are tasks or not
    if (tasks.length === 0) {
        taskListElement.classList.add("no-tasks");
    } else {
        taskListElement.classList.remove("no-tasks");
    }
}