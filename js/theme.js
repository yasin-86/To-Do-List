export const initializeTheme = () => {
    const themeSwitch = document.querySelector('.theme-switch__checkbox');
    themeSwitch.onchange = (e) => {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('lightMode', document.body.classList.contains('light-mode') ? 'enabled' : '');
    };

    if (localStorage.getItem('lightMode')) {
        document.body.classList.add('light-mode');
        themeSwitch.checked = true;
    }
};
