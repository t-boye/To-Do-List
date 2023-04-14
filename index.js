// Select the necessary DOM elements
const form = document.querySelector('form');
const taskInput = document.querySelector('#new-task-input');
const taskList = document.querySelector('#task-list');
const noTasks = document.querySelector('.no-tasks');
const totalCount = document.querySelector('.total-count');
const completedCount = document.querySelector('.completed-count');
const remainingCount = document.querySelector('.remaining-count');

form.addEventListener('submit', (event) => {
 
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const newTask = document.createElement('li');
        newTask.innerHTML = `
      <input type="checkbox" class="task-checkbox">
      <label class="task-label">${taskText}</label>
      <div>
        <button class="delete">Delete</button>
        <button class="edit">Edit</button>
      </div>
    `;

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

        taskList.appendChild(newTask);
        taskInput.value = '';
        updateTaskCount();
    }
});


function addTask(event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (!taskText) {
        return;
    }
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

    taskList.appendChild(taskElement);

    taskElement.querySelector(".task-checkbox").focus();

    tasks.push({
        id: taskElement.getAttribute("data-task-id"),
        text: taskText,
        completed: false,
        priority: "low",
    });

    updateUI();

    taskInput.value = "";

}

window.addEventListener("load", init);



let tasks = [];

function createTask(taskName, priority) {
    // Create a new task object
    const task = {
        id: tasks.length + 1,
        name: taskName,
        priority: priority,
        completed: false
    };

    tasks.push(task);
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

    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(editButton);

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(buttonContainer);

    taskList.appendChild(li);

    updateTaskCount();
}

function updateTaskCount() {
    totalCount.innerText = `Total: ${tasks.length}`;
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

function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    const taskElement = document.querySelector(`#task-${taskId}`);
    taskList.removeChild(taskElement);
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const taskId = button.dataset.taskId;
            deleteTask(taskId);
        });
    });

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

function toggleCompleted(taskId) {
  
    const task = tasks.find((task) => task.id === taskId);

    task.completed = !task.completed;


    updateTaskCount();

    saveTasksToLocalStorage();

    renderTaskList();
}

function editTask(taskId) {
    const task = tasks.find((task) => task.id === taskId);

   
    const taskLabelElement = document.querySelector(`label[for="${taskId}"]`);

    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.value = task.label;

    taskLabelElement.replaceWith(taskInput);

    taskInput.focus();

    taskInput.addEventListener("blur", () => {
      
        task.label = taskInput.value;
        const newTaskLabelElement = document.createElement("label");
        newTaskLabelElement.setAttribute("for", taskId);
        newTaskLabelElement.classList.add("task-label");
        newTaskLabelElement.textContent = task.label;
        taskInput.replaceWith(newTaskLabelElement);

        saveTasksToLocalStorage();
    });

}

const deleteButtons = document.querySelectorAll(".delete-button");
deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const taskId = button.dataset.taskId;
        deleteTask(taskId);
    });
});

const editButtons = document.querySelectorAll(".edit-button");
editButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const taskId = button.dataset.taskId;
        editTask(taskId);
    });
});

function updateTaskCount() {
   
    totalCount.innerText = `Total: ${taskList.children.length}`;

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

    if (taskList.children.length === 0) {
        noTasks.style.display = 'block';
    } else {
        noTasks.style.display = 'none';
    }
}

function renderTaskList() {
    const taskListElement = document.getElementById("task-list");

    taskListElement.innerHTML = "";
    tasks.forEach((task) => {
        const taskCheckboxElement = document.createElement("input");
        taskCheckboxElement.type = "checkbox";
        taskCheckboxElement.id = task.id;
        taskCheckboxElement.checked = task.completed;
        taskCheckboxElement.classList.add("task-checkbox");

        taskCheckboxElement.addEventListener("change", () => {
            toggleCompleted(task.id);
        });

        const taskLabelElement = document.createElement("label");
        taskLabelElement.setAttribute("for", task.id);
        taskLabelElement.classList.add("task-label");
        taskLabelElement.textContent = task.label;

        const taskActionsContainer = document.createElement("div");
        taskActionsContainer.classList.add("task-actions");

        const editTaskButton = document.createElement("button");
        editTaskButton.classList.add("edit-task-button");
        editTaskButton.textContent = "Edit";
        editTaskButton.addEventListener("click", () => {
            editTask(task.id);
        });

        const deleteTaskButton = document.createElement("button");
        deleteTaskButton.classList.add("delete-task-button");
        deleteTaskButton.textContent = "Delete";
        deleteTaskButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        taskActionsContainer.appendChild(editTaskButton);
        taskActionsContainer.appendChild(deleteTaskButton);
        const taskListItem = document.createElement("li");
        taskListItem.classList.add("task-list-item");
        taskListItem.appendChild(taskCheckboxElement);
        taskListItem.appendChild(taskLabelElement);
        taskListItem.appendChild(taskActionsContainer);
        taskListElement.appendChild(taskListItem);
    });
    updateTaskCount();

    if (tasks.length === 0) {
        taskListElement.classList.add("no-tasks");
    } else {
        taskListElement.classList.remove("no-tasks");
    }
}
