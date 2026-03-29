// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load saved tasks when page loads
window.onload = loadTasks;

// Add task event
addBtn.addEventListener('click', addTask);

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return alert('Please enter a task!');
  
  const li = document.createElement('li');
  li.textContent = taskText;

  // Mark as completed on click
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  // Delete button
 const delBtn = document.createElement('button');
delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

  delBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
  taskInput.value = '';

  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const stored = JSON.parse(localStorage.getItem('tasks')) || [];
  stored.forEach(t => {
    const li = document.createElement('li');
    li.textContent = t.text;
    if (t.completed) li.classList.add('completed');

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
      li.remove();
      saveTasks();
    });

    li.addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasks();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}
