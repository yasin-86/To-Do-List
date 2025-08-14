import { updateTasks } from './utils.js';

const tL = document.getElementById('taskList');

export const renderTask = (task, completed = false) => {
    const li = document.createElement('li');
    li.innerHTML = `<span style="text-decoration: ${completed ? 'line-through' : 'none'}; opacity: ${completed ? '0.5' : '1'};">${task}</span>
                      <button onclick="toggleComplete(this)">✔️</button>
                      <button onclick="deleteTask(this)">❌</button>`;
    tL.appendChild(li);
};
window.toggleComplete = (btn) => {
    const li = btn.parentNode;
    const span = li.querySelector('span');
    const taskText = span.textContent;
    const completed = span.style.textDecoration === 'line-through';

    span.style.textDecoration = completed ? 'none' : 'line-through';
    span.style.opacity = completed ? '1' : '0.5';

    updateTasks(taskText, !completed);
};

window.deleteTask = (btn) => {
    const li = btn.parentNode;
    const taskText = li.querySelector('span').textContent;
    li.remove();
    updateTasks(taskText, null);
};
