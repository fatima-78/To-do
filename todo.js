const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const update = document.getElementById('update');
const tasks = [];
let selectedTask
let editMode = false

addTaskBtn.addEventListener('click', function () {
  if(editMode) {
    tasks[selectedTask].text = taskInput.value
    editMode =false
  } else {
    if (taskInput.value !== '') {
      tasks.push({
        id: tasks.length +1,
        text: taskInput.value,
        editable: true,
        completed: false
      });
    }
  }
  taskInput.value = '';
  addTask();
});

function addTask() {
  taskList.innerHTML = '';
  tasks.forEach((item, index) => {
    let li = document.createElement('li');
    let div = document.createElement('div');
    let span = document.createElement('span');

    span.innerText = item.text;
    let checked = document.createElement("input");
    checked.type = "checkbox";
    checked.value = item.completed;
    checked.checked = item.completed;
    checked.classList.add("checked");
    checked.addEventListener('click', function (e) {
      item.completed = e.target.checked;
 
     span.style.textDecoration = e.target.checked ? 'line-through' : "none"
    });
    div.appendChild(checked);

    let deleteButton = document.createElement("button");
    deleteButton.classList.add('checkTask', 'fa-solid', 'fa-trash-can');
    deleteButton.addEventListener('click', function () {
      tasks.splice(index, 1);
      addTask();
    });
    div.appendChild(deleteButton);
    li.appendChild(div);
    taskList.appendChild(li);

    let editButton = document.createElement("button");
    editButton.classList.add('editButton', 'fa-solid', 'fa-pencil');
    editButton.addEventListener('click', () => {
      if (!item.completed) {
        editMode = true
        addTask();
        taskInput.value = item.text;
        taskInput.focus();
        selectedTask = index
      } else {
        taskInput.value = ""
      }
    });
    div.appendChild(editButton);
      div.appendChild(span);
    li.appendChild(div);
    taskList.appendChild(li);
    
  });
}
addTask();
