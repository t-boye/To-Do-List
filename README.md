# To Do List ( Task Manager )
This is a simple task manager application built with JavaScript. It allows you to create tasks, mark them as completed, edit or delete them. The tasks are stored in an array and can be viewed and manipulated through the UI.

## Demo
![To-Do (Task Manager) Demo](https://github.com/t-boye/To-Do-List/blob/main/Assets/to_do_screenshot.png)

## Getting started
To get started with this project, you need to have a basic understanding of HTML, CSS, and JavaScript. You can run this project on any modern web browser.

- Clone the repository to your local machine using the command git clone https://github.com/username/task-manager.git.
- Navigate to the project directory using the command 'cd'.
- Open the index.html file in your web browser to run the application.

## Using the application
Once the application is loaded, you can start adding tasks using the input field provided. To add a task, enter the task name in the input field and click the "Add Task" button. The task will be added to the list of tasks.

You can mark a task as completed by checking the checkbox next to it. Completed tasks are shown with a strike-through on their text. You can also edit or delete a task by clicking the "Edit" or "Delete" button next to it.

The total number of tasks, the number of completed tasks, and the number of remaining tasks are displayed at the bottom of the page.

## Code Breakdown
The application's functionality stems from the interplay of HTML, CSS, and JavaScript:

- HTML (Structure):
Constructs the visual framework of the app, defining its layout and elements.
Provides a structured foundation for content and interactions.
- CSS (Style):
Enhances visual appeal and usability by shaping the app's overall appearance.
Controls fonts, colors, spacing, and element positioning for a cohesive design.
- JavaScript (Functionality):
Injects dynamic behavior and responsiveness, enabling user interactions.
Interacts with the HTML and CSS to create a fluid user experience.
Key features are implemented through a central JavaScript file:

### Task Management and DOM Interactions:

The createTask() function is responsible for creating a new task element and adding it to the DOM. It creates a new task object with an ID, name, priority, and completed status, adds it to the tasks array, and appends the corresponding HTML elements to the task list.

The updateTaskCount() function calculates the number of completed and remaining tasks and updates the corresponding counters at the bottom of the page.

The addTask() function is called when the user clicks the "Add Task" button. It gets the value of the task input field, creates a new task element, adds it to the task list, updates the tasks array, and updates the UI.

## Conclusion
This is a simple task manager application built with JavaScript. It demonstrates how to use JavaScript to create and manipulate the DOM, handle user events, and store data in an array.
