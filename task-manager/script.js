const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => renderTask(task.text, task.completed));
};

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;
  renderTask(text, false);
  saveTasks();
  taskInput.value = "";
}

function renderTask(text, completed) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="${completed ? 'completed' : ''}" onclick="toggleComplete(this)">${text}</span>
    <button onclick="deleteTask(this)">X</button>
  `;
  taskList.appendChild(li);
}

function toggleComplete(span) {
  span.classList.toggle("completed");
  saveTasks();
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector("span").textContent;
    const completed = li.querySelector("span").classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}