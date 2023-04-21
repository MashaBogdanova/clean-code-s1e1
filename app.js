// document is the DOM can be accessed in the console with document.window
// tree is from the top, html, body, p etc.

// problem: user interaction does not provide the correct results
// solution: add interactivity so the user can manage daily tasks
// break things down into smaller steps and take each step at a time

// event handling, user interaction is what starts the code execution

var taskInput = document.querySelector(".task__input_add"); // add a new task
var addButton = document.querySelector(".button_add"); // first button
var incompleteTaskHolder = document.querySelector(".tasks_incomplete"); // tasks_incomplete
var completedTasksHolder = document.querySelector(".tasks_completed"); // tasks_completed

// new task list item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  listItem.classList.add("task");

  // input (checkbox)
  var checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox";

  // label
  var label = document.createElement("label");
  label.innerText = taskString;
  label.className = "task__label";

  // input (text)
  var editInput = document.createElement("input");
  editInput.type = "text";
  editInput.classList.add("task__input", "task__input_edit");

  // edit button
  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.classList.add("button", "button_edit");

  // delete button
  var deleteButton = document.createElement("button");
  deleteButton.classList.add("button", "button_delete");

  // delete button image
  var deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";

  // appending
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

var addTask = function() {
  console.log("Add Task...");

  // create a new list item with the text from the task__input_add
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  // append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";
};

// edit an existing task
var editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector(".task__label");
  var editBtn = listItem.querySelector(".button_edit");
  var containsClass = listItem.classList.contains("task_edit-mode");

  // if class of the parent is task_edit-mode
  if(containsClass) {
    // switch to task_edit-mode
    // label becomes the inputs value
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  // toggle edit mode on the parent
  listItem.classList.toggle("task_edit-mode");
};

// delete task
var deleteTask = function() {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  // remove the parent list item from the ul
  ul.removeChild(listItem);
};

// mark task completed
var taskCompleted = function() {
  console.log("Complete Task...");

  // append the task list item to the tasks_completed
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
  console.log("Incomplete Task...");

  // mark task as incomplete
  // when the checkbox is unchecked
  // append the task list item to the tasks_incomplete
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest=function(){
  console.log("AJAX Request");
}

// the glue to hold it all together
// set the click handler to the addTask function
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  // select ListItems children
  var checkBox = taskListItem.querySelector(".task__checkbox");
  var editButton = taskListItem.querySelector(".button_edit");
  var deleteButton = taskListItem.querySelector(".button_delete");

  // bind editTask to edit button
  editButton.onclick = editTask;
  // bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  // bind taskCompleted to checkBoxEventHandler
  checkBox.onchange = checkBoxEventHandler;
}

// cycle over incompleteTaskHolder ul list items
// for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++){
  // bind events to list items children(tasks_completed)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++){
  // bind events to list items children (tasks_incomplete)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// issues with usability don't get seen until they are in front of a human tester
// prevent creation of empty tasks
// change edit to save when you are in edit mode