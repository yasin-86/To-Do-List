export const updateTasks = (taskText, completed) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
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
