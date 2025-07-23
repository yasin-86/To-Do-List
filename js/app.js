document.addEventListener('DOMContentLoaded', () => {
    const tI = document.getElementById('taskInput');
    const tL = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTask = (task, completed = false) => {
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

    const updateTasks = (taskText, completed) => {
        let updatedTasks = tasks.map(t => {
            if (typeof t === 'string' ? t === taskText : t.text === taskText) {
                return completed === null ? null : { text: taskText, completed: completed };
            }
            return t;
        }).filter(t => t !== null);

        if (completed !== null && !updatedTasks.find(t => typeof t === 'object' && t.text === taskText)) {
            updatedTasks.push({ text: taskText, completed: completed });
        }

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

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

    document.querySelector('.theme-switch__checkbox').onchange = (e) => {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('lightMode', document.body.classList.contains('light-mode') ? 'enabled' : '');
    };

    if (localStorage.getItem('lightMode')) {
        document.body.classList.add('light-mode');
        document.querySelector('.theme-switch__checkbox').checked = true;
    }
});





