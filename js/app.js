import { renderTask } from './render.js';
import { updateTasks } from './utils.js';
import { initializeTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
    const tI = document.getElementById('taskInput');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    document.getElementById('addTaskBtn').onclick = () => {
        const taskText = tI.value.trim();
        if (!taskText) return alert("لطفا یک یادداشت وارد کنید!");
        renderTask(taskText);
        updateTasks(taskText, false);
        tI.value = '';
    };

    tasks.forEach(task => {
        const taskText = typeof task === 'string' ? task : task.text;
        const completed = typeof task === 'string' ? false : task.completed;
        renderTask(taskText, completed);
    });

    initializeTheme();
});
